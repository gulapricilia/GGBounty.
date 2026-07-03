/* This file contains the base contract implementation that overrides the basic 'transfer' functionality */

import Long from 'long';
import { createHash } from 'node:crypto';

import { types } from '../proto/types.js';

import {
    IPluginError,
    ErrInsufficientFunds,
    ErrInvalidAddress,
    ErrInvalidAmount,
    ErrInvalidMessageCast,
    ErrTxFeeBelowStateLimit,
    ErrInvalidUsername,
    ErrBioTooLong,
    ErrAvatarUrlTooLong,
    ErrInvalidTitle,
    ErrInvalidDescription,
    ErrInvalidReward,
    ErrInvalidDeadline,
    ErrBountyNotFound,
    ErrInvalidBountyId,
    ErrBountyNotOpen,
    ErrBountyExpired,
    ErrAlreadyJoined,
    ErrNotJoined,
    ErrInvalidRepoUrl,
    ErrNotBountyCreator,
    ErrNoSubmission,
    ErrEscrowMismatch
} from './error.js';

import type { Plugin, Config } from './plugin.js';
import { JoinLenPrefix, FromAny, Unmarshal } from './plugin.js';
import { fileDescriptorProtos } from '../proto/descriptors.js';

// GG Bounty custom state prefixes (see "avoid prefix collisions" in TUTORIAL.md - Canopy
// reserves single-byte prefixes 1-15 for core state; GG Bounty uses 100+ for its own records).
const profilePrefix = Buffer.from([100]); // store key prefix for Profile records
const bountyPrefix = Buffer.from([101]); // store key prefix for Bounty records
const participantPrefix = Buffer.from([102]); // store key prefix for Participant records
const submissionPrefix = Buffer.from([103]); // store key prefix for Submission records

// REPUTATION_PER_WIN is a simple, fixed reputation award for winning a bounty. A real reputation
// system would likely weight this by reward size, dispute history, etc - out of scope here;
// flagged as a placeholder heuristic, not hidden.
const REPUTATION_PER_WIN = Long.fromNumber(10);

// ESCROW_DOMAIN_TAG namespaces the escrow pseudo-address derivation so it can never collide
// with a real wallet address (which is sha256(publicKey)[:20] with no such tag) or with any
// other GG Bounty-derived address.
const ESCROW_DOMAIN_TAG = Buffer.from('gg-bounty-escrow-v1');

// deriveBountyId() computes a deterministic 20-byte bounty id from data every validator sees
// identically: the creator's address, the title, and the creating transaction's own time/height
// (both part of the SIGNED transaction, not local wall-clock - see the determinism note on
// DeliverMessageCreateProfile above). Never uses Math.random() or Date.now().
function deriveBountyId(creator: Uint8Array, title: string, txTime: Long, createdHeight: Long): Uint8Array {
    const timeBuf = Buffer.alloc(8);
    timeBuf.writeBigUInt64BE(BigInt(txTime.toString()));
    const heightBuf = Buffer.alloc(8);
    heightBuf.writeBigUInt64BE(BigInt(createdHeight.toString()));
    const preimage = Buffer.concat([Buffer.from(creator), Buffer.from(title, 'utf8'), timeBuf, heightBuf]);
    return createHash('sha256').update(preimage).digest().subarray(0, 20);
}

// deriveEscrowAddress() computes the deterministic pseudo-account address that holds a given
// bounty's escrowed reward. No private key exists for this address - only DeliverMessageCreateBounty
// and (later) DeliverMessageSelectWinner ever write to it, both server-side, so nothing but a
// valid signed CreateBounty/SelectWinner transaction can move funds in or out of it.
function deriveEscrowAddress(bountyId: Uint8Array): Uint8Array {
    const preimage = Buffer.concat([ESCROW_DOMAIN_TAG, Buffer.from(bountyId)]);
    return createHash('sha256').update(preimage).digest().subarray(0, 20);
}

// ContractConfig: the configuration of the contract
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ContractConfig: any = {
    name: 'go_plugin_contract',
    id: 1,
    version: 1,
    supportedTransactions: ['send', 'createProfile', 'createBounty', 'joinBounty', 'submitWork', 'selectWinner'],
    transactionTypeUrls: [
        'type.googleapis.com/types.MessageSend',
        'type.googleapis.com/types.MessageCreateProfile',
        'type.googleapis.com/types.MessageCreateBounty',
        'type.googleapis.com/types.MessageJoinBounty',
        'type.googleapis.com/types.MessageSubmitWork',
        'type.googleapis.com/types.MessageSelectWinner'
    ],
    eventTypeUrls: [],
    // custom record prefixes this plugin owns - see "avoid prefix collisions" in TUTORIAL.md.
    // Canopy reserves 1-15 for core state; GG Bounty allocates 100+ for its own records.
    // 100 = Profile, 101 = Bounty, 102 = Participant, 103 = Submission.
    customStatePrefixes: [profilePrefix, bountyPrefix, participantPrefix, submissionPrefix],
    fileDescriptorProtos
};

// Contract() defines the smart contract that implements the extended logic of the nested chain
export class Contract {
    Config: Config;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    FSMConfig: any;
    plugin: Plugin;
    fsmId: Long;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(config: Config, fsmConfig: any, plugin: Plugin, fsmId: Long) {
        this.Config = config;
        this.FSMConfig = fsmConfig;
        this.plugin = plugin;
        this.fsmId = fsmId;
    }

    // Genesis() implements logic to import a json file to create the state at height 0 and export the state at any height
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    Genesis(_request: any): any {
        return {}; // TODO map out original token holders
    }

    // BeginBlock() is code that is executed at the start of `applying` the block
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    BeginBlock(_request: any): any {
        return {};
    }

    // EndBlock() is code that is executed at the end of 'applying' a block
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    EndBlock(_request: any): any {
        return {};
    }

    // CheckMessageSend() statelessly validates a 'send' message
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CheckMessageSend(msg: any): any {
        // check sender address
        if (!msg.fromAddress || msg.fromAddress.length !== 20) {
            return { error: ErrInvalidAddress() };
        }
        // check recipient address
        if (!msg.toAddress || msg.toAddress.length !== 20) {
            return { error: ErrInvalidAddress() };
        }
        // check amount
        const amount = msg.amount as Long | number | undefined;
        if (!amount || (Long.isLong(amount) ? amount.isZero() : amount === 0)) {
            return { error: ErrInvalidAmount() };
        }
        // return the authorized signers
        return {
            recipient: msg.toAddress,
            authorizedSigners: [msg.fromAddress]
        };
    }

    // CheckMessageCreateProfile() statelessly validates a 'createProfile' message
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CheckMessageCreateProfile(msg: any): any {
        // check signer address
        if (!msg.signerAddress || msg.signerAddress.length !== 20) {
            return { error: ErrInvalidAddress() };
        }
        // check username: required, 1-32 characters (after trimming)
        const username = typeof msg.username === 'string' ? msg.username.trim() : '';
        if (username.length < 1 || username.length > 32) {
            return { error: ErrInvalidUsername() };
        }
        // check bio: optional, up to 280 characters
        const bio = typeof msg.bio === 'string' ? msg.bio : '';
        if (bio.length > 280) {
            return { error: ErrBioTooLong() };
        }
        // check avatarUrl: optional, up to 512 characters
        const avatarUrl = typeof msg.avatarUrl === 'string' ? msg.avatarUrl : '';
        if (avatarUrl.length > 512) {
            return { error: ErrAvatarUrlTooLong() };
        }
        // the profile owner (signer) is the sole authorized signer
        return {
            recipient: msg.signerAddress,
            authorizedSigners: [msg.signerAddress]
        };
    }

    // CheckMessageCreateBounty() statelessly validates a 'createBounty' message.
    // tx is passed so the deadline can be validated against the transaction's own (deterministic,
    // signed) time field rather than local wall-clock, consistent with the determinism
    // requirements documented on deriveBountyId()/DeliverMessageCreateProfile above.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CheckMessageCreateBounty(msg: any, tx: any): any {
        // check signer address
        if (!msg.signerAddress || msg.signerAddress.length !== 20) {
            return { error: ErrInvalidAddress() };
        }
        // check title: required, 1-100 characters
        const title = typeof msg.title === 'string' ? msg.title.trim() : '';
        if (title.length < 1 || title.length > 100) {
            return { error: ErrInvalidTitle() };
        }
        // check description: required, 1-2000 characters
        const description = typeof msg.description === 'string' ? msg.description.trim() : '';
        if (description.length < 1 || description.length > 2000) {
            return { error: ErrInvalidDescription() };
        }
        // check reward: must be > 0
        const reward = Long.isLong(msg.reward) ? msg.reward : Long.fromNumber((msg.reward as number) || 0);
        if (reward.lessThanOrEqual(0)) {
            return { error: ErrInvalidReward() };
        }
        // check deadline: must be strictly after the transaction's own time (converted to seconds)
        const deadline = Long.isLong(msg.deadline)
            ? msg.deadline
            : Long.fromNumber((msg.deadline as number) || 0);
        const txTime = Long.isLong(tx?.time) ? tx.time : Long.fromNumber((tx?.time as number) || 0);
        const txTimeSeconds = txTime.divide(1_000_000);
        if (deadline.lessThanOrEqual(txTimeSeconds)) {
            return { error: ErrInvalidDeadline() };
        }
        // the creator (signer) is the sole authorized signer
        return {
            recipient: msg.signerAddress,
            authorizedSigners: [msg.signerAddress]
        };
    }

    // CheckMessageJoinBounty() statelessly validates a 'joinBounty' message. Whether the bounty
    // actually exists, is Open, and isn't expired requires a state read, so that's checked
    // statefully in DeliverMessageJoinBounty instead (same pattern as CheckMessageCreateBounty's
    // deadline check being the only stateless thing this template's CheckTx can do per-message).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CheckMessageJoinBounty(msg: any): any {
        if (!msg.signerAddress || msg.signerAddress.length !== 20) {
            return { error: ErrInvalidAddress() };
        }
        if (!msg.bountyId || msg.bountyId.length !== 20) {
            return { error: ErrInvalidBountyId() };
        }
        return {
            recipient: msg.signerAddress,
            authorizedSigners: [msg.signerAddress]
        };
    }

    // CheckMessageSubmitWork() statelessly validates a 'submitWork' message. Whether the signer
    // has actually joined the bounty requires a state read - checked in DeliverMessageSubmitWork.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CheckMessageSubmitWork(msg: any): any {
        if (!msg.signerAddress || msg.signerAddress.length !== 20) {
            return { error: ErrInvalidAddress() };
        }
        if (!msg.bountyId || msg.bountyId.length !== 20) {
            return { error: ErrInvalidBountyId() };
        }
        const description = typeof msg.description === 'string' ? msg.description.trim() : '';
        if (description.length < 1 || description.length > 2000) {
            return { error: ErrInvalidDescription() };
        }
        const repoUrl = typeof msg.repoUrl === 'string' ? msg.repoUrl.trim() : '';
        if (repoUrl.length < 1 || repoUrl.length > 512) {
            return { error: ErrInvalidRepoUrl() };
        }
        const demoUrl = typeof msg.demoUrl === 'string' ? msg.demoUrl : '';
        if (demoUrl.length > 512) {
            return { error: ErrInvalidRepoUrl() };
        }
        return {
            recipient: msg.signerAddress,
            authorizedSigners: [msg.signerAddress]
        };
    }

    // CheckMessageSelectWinner() statelessly validates a 'selectWinner' message. Whether the
    // signer is actually the bounty's creator, and whether winnerAddress actually submitted
    // work, both require state reads - checked in DeliverMessageSelectWinner. This is the same
    // "stateless CheckTx, stateful DeliverTx" split used throughout this file.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CheckMessageSelectWinner(msg: any): any {
        if (!msg.signerAddress || msg.signerAddress.length !== 20) {
            return { error: ErrInvalidAddress() };
        }
        if (!msg.bountyId || msg.bountyId.length !== 20) {
            return { error: ErrInvalidBountyId() };
        }
        if (!msg.winnerAddress || msg.winnerAddress.length !== 20) {
            return { error: ErrInvalidAddress() };
        }
        return {
            recipient: msg.signerAddress,
            authorizedSigners: [msg.signerAddress]
        };
    }
}

// Async versions of contract methods for proper state handling
export class ContractAsync {
    // CheckTx() is code that is executed to statelessly validate a transaction
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async CheckTx(contract: Contract, request: any): Promise<any> {
        // validate fee
        const [resp, err] = await contract.plugin.StateRead(contract, {
            keys: [
                {
                    queryId: Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)),
                    key: KeyForFeeParams()
                }
            ]
        });

        if (err) {
            return { error: err };
        }
        if (resp?.error) {
            return { error: resp.error };
        }

        // convert bytes into fee parameters
        const feeParamsBytes = resp?.results?.[0]?.entries?.[0]?.value;
        if (feeParamsBytes && feeParamsBytes.length > 0) {
            const [minFees, unmarshalErr] = Unmarshal(feeParamsBytes, types.FeeParams);
            if (unmarshalErr) {
                return { error: unmarshalErr };
            }
            // check for the minimum fee
            const txFee = request.tx?.fee as Long | number | undefined;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const sendFee = (minFees as any)?.sendFee as Long | number | undefined;
            if (txFee !== undefined && sendFee !== undefined) {
                const txFeeNum = Long.isLong(txFee) ? txFee.toNumber() : txFee;
                const sendFeeNum = Long.isLong(sendFee) ? sendFee.toNumber() : sendFee;
                if (txFeeNum < sendFeeNum) {
                    return { error: ErrTxFeeBelowStateLimit() };
                }
            }
        }

        // get the message and its type
        const [msg, msgType, msgErr] = FromAny(request.tx?.msg);
        if (msgErr) {
            return { error: msgErr };
        }
        // handle the message based on type
        if (msg) {
            switch (msgType) {
                case 'MessageSend':
                    return contract.CheckMessageSend(msg);
                case 'MessageCreateProfile':
                    return contract.CheckMessageCreateProfile(msg);
                case 'MessageCreateBounty':
                    return contract.CheckMessageCreateBounty(msg, request.tx);
                case 'MessageJoinBounty':
                    return contract.CheckMessageJoinBounty(msg);
                case 'MessageSubmitWork':
                    return contract.CheckMessageSubmitWork(msg);
                case 'MessageSelectWinner':
                    return contract.CheckMessageSelectWinner(msg);
                default:
                    return { error: ErrInvalidMessageCast() };
            }
        }
        return { error: ErrInvalidMessageCast() };
    }

    // DeliverTx() is code that is executed to apply a transaction
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async DeliverTx(contract: Contract, request: any): Promise<any> {
        // get the message and its type
        const [msg, msgType, err] = FromAny(request.tx?.msg);
        if (err) {
            return { error: err };
        }
        // handle the message based on type
        if (msg) {
            switch (msgType) {
                case 'MessageSend':
                    return ContractAsync.DeliverMessageSend(contract, msg, request.tx?.fee as Long);
                case 'MessageCreateProfile':
                    return ContractAsync.DeliverMessageCreateProfile(contract, msg, request.tx?.time as Long);
                case 'MessageCreateBounty':
                    return ContractAsync.DeliverMessageCreateBounty(contract, msg, request.tx);
                case 'MessageJoinBounty':
                    return ContractAsync.DeliverMessageJoinBounty(contract, msg, request.tx);
                case 'MessageSubmitWork':
                    return ContractAsync.DeliverMessageSubmitWork(contract, msg, request.tx);
                case 'MessageSelectWinner':
                    return ContractAsync.DeliverMessageSelectWinner(contract, msg, request.tx);
                default:
                    return { error: ErrInvalidMessageCast() };
            }
        }
        return { error: ErrInvalidMessageCast() };
    }

    // DeliverMessageSend() handles a 'send' message
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async DeliverMessageSend(
        contract: Contract,
        msg: any,
        fee: Long | number | undefined
    ): Promise<any> {
        const fromQueryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
        const toQueryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
        const feeQueryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));

        // calculate the from key and to key
        const fromKey = KeyForAccount(msg.fromAddress!);
        const toKey = KeyForAccount(msg.toAddress!);
        const feePoolKey = KeyForFeePool(Long.fromNumber(contract.Config.ChainId));

        // get the from and to account
        const [response, readErr] = await contract.plugin.StateRead(contract, {
            keys: [
                { queryId: feeQueryId, key: feePoolKey },
                { queryId: fromQueryId, key: fromKey },
                { queryId: toQueryId, key: toKey }
            ]
        });

        // check for internal error
        if (readErr) {
            return { error: readErr };
        }
        // ensure no error fsm error
        if (response?.error) {
            return { error: response.error };
        }

        // get the from bytes and to bytes
        let fromBytes: Uint8Array | null = null;
        let toBytes: Uint8Array | null = null;
        let feePoolBytes: Uint8Array | null = null;

        for (const resp of response?.results || []) {
            const qid = resp.queryId as Long;
            if (qid.equals(fromQueryId)) {
                fromBytes = resp.entries?.[0]?.value || null;
            } else if (qid.equals(toQueryId)) {
                toBytes = resp.entries?.[0]?.value || null;
            } else if (qid.equals(feeQueryId)) {
                feePoolBytes = resp.entries?.[0]?.value || null;
            }
        }

        // convert the bytes to account structures
        const [fromRaw, fromErr] = Unmarshal(fromBytes || new Uint8Array(), types.Account);
        if (fromErr) {
            return { error: fromErr };
        }
        const [toRaw, toErr] = Unmarshal(toBytes || new Uint8Array(), types.Account);
        if (toErr) {
            return { error: toErr };
        }
        const [feePoolRaw, feePoolErr] = Unmarshal(feePoolBytes || new Uint8Array(), types.Pool);
        if (feePoolErr) {
            return { error: feePoolErr };
        }

        // Cast to any for property access
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const from = fromRaw as any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const to = toRaw as any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const feePool = feePoolRaw as any;

        // add fee to 'amount to deduct'
        const msgAmount = Long.isLong(msg.amount)
            ? msg.amount
            : Long.fromNumber((msg.amount as number) || 0);
        const feeAmount = Long.isLong(fee) ? fee : Long.fromNumber((fee as number) || 0);
        const amountToDeduct = msgAmount.add(feeAmount);

        // get from amount
        const fromAmount = Long.isLong(from?.amount)
            ? from.amount
            : Long.fromNumber((from?.amount as number) || 0);

        // if the account amount is less than the amount to subtract; return insufficient funds
        if (fromAmount.lessThan(amountToDeduct)) {
            return { error: ErrInsufficientFunds() };
        }

        // for self-transfer, use same account data
        const isSelfTransfer = Buffer.from(fromKey).equals(Buffer.from(toKey));
        const toAccount = isSelfTransfer ? from : to;

        // get amounts as Long
        const newFromAmount = fromAmount.subtract(amountToDeduct);
        const toAmount = Long.isLong(toAccount?.amount)
            ? toAccount.amount
            : Long.fromNumber((toAccount?.amount as number) || 0);
        const newToAmount = toAmount.add(msgAmount);
        const poolAmount = Long.isLong(feePool?.amount)
            ? feePool.amount
            : Long.fromNumber((feePool?.amount as number) || 0);
        const newPoolAmount = poolAmount.add(feeAmount);

        // Update the accounts
        const updatedFrom = types.Account.create({ address: from?.address, amount: newFromAmount });
        const updatedTo = types.Account.create({
            address: toAccount?.address,
            amount: newToAmount
        });
        const updatedPool = types.Pool.create({ id: feePool?.id, amount: newPoolAmount });

        // convert the accounts to bytes
        const newFromBytes = types.Account.encode(updatedFrom).finish();
        const newToBytes = types.Account.encode(updatedTo).finish();
        const newFeePoolBytes = types.Pool.encode(updatedPool).finish();

        // execute writes to the database
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let writeResp: any;
        let writeErr: IPluginError | null;

        // if the from account is drained - delete the from account
        if (newFromAmount.isZero()) {
            [writeResp, writeErr] = await contract.plugin.StateWrite(contract, {
                sets: [
                    { key: feePoolKey, value: newFeePoolBytes },
                    { key: toKey, value: newToBytes }
                ],
                deletes: [{ key: fromKey }]
            });
        } else {
            [writeResp, writeErr] = await contract.plugin.StateWrite(contract, {
                sets: [
                    { key: feePoolKey, value: newFeePoolBytes },
                    { key: toKey, value: newToBytes },
                    { key: fromKey, value: newFromBytes }
                ]
            });
        }

        if (writeErr) {
            return { error: writeErr };
        }
        if (writeResp?.error) {
            return { error: writeResp.error };
        }

        return {};
    }

    // DeliverMessageCreateProfile() handles a 'createProfile' message: creates the profile if it
    // doesn't exist yet, or updates the editable fields (username/avatarUrl/bio) if it does -
    // preserving system-tracked fields (reputation, totalRewardsEarned, completedBounties,
    // createdBounties, createdAt), which only change as a side effect of other GG Bounty
    // transactions (SelectWinner, CreateBounty, etc. - later features).
    //
    // txTime is `request.tx.time` from DeliverTx (see tx.proto: "used as temporal entropy" - it
    // is part of the SIGNED transaction, so every validator sees the identical value). This is
    // used as the record's timestamp instead of the local machine's Date.now(), which would be
    // non-deterministic across validators and could produce diverging state roots. tx.time is in
    // MICROSECONDS (matches frontend/src/tx/buildTx.ts), so it's divided by 1e6 to store as
    // unix seconds, consistent with tx.proto's documented convention for created_height-adjacent
    // temporal fields.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async DeliverMessageCreateProfile(contract: Contract, msg: any, txTime?: Long | number): Promise<any> {
        const profileQueryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
        const profileKey = KeyForProfile(msg.signerAddress!);

        // read any existing profile for this address
        const [response, readErr] = await contract.plugin.StateRead(contract, {
            keys: [{ queryId: profileQueryId, key: profileKey }]
        });
        if (readErr) {
            return { error: readErr };
        }
        if (response?.error) {
            return { error: response.error };
        }

        let existingBytes: Uint8Array | null = null;
        for (const resp of response?.results || []) {
            const qid = resp.queryId as Long;
            if (qid.equals(profileQueryId)) {
                existingBytes = resp.entries?.[0]?.value || null;
            }
        }

        const [existingRaw, unmarshalErr] = Unmarshal(existingBytes || new Uint8Array(), types.Profile);
        if (unmarshalErr) {
            return { error: unmarshalErr };
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const existing = existingRaw as any;
        const isNewProfile = !existingBytes || existingBytes.length === 0;

        const txTimeMicros = txTime ? Long.fromValue(txTime) : Long.ZERO;
        const nowSeconds = txTimeMicros.divide(1_000_000);

        const updatedProfile = types.Profile.create({
            address: msg.signerAddress,
            username: (msg.username as string).trim(),
            avatarUrl: (msg.avatarUrl as string) || '',
            bio: (msg.bio as string) || '',
            // system-tracked fields: preserved from the existing record, or zeroed for a new one
            reputation: isNewProfile ? Long.ZERO : existing?.reputation,
            totalRewardsEarned: isNewProfile ? Long.ZERO : existing?.totalRewardsEarned,
            completedBounties: isNewProfile ? Long.ZERO : existing?.completedBounties,
            createdBounties: isNewProfile ? Long.ZERO : existing?.createdBounties,
            createdAt: isNewProfile ? nowSeconds : existing?.createdAt,
            updatedAt: nowSeconds
        });

        const updatedProfileBytes = types.Profile.encode(updatedProfile).finish();

        const [writeResp, writeErr] = await contract.plugin.StateWrite(contract, {
            sets: [{ key: profileKey, value: updatedProfileBytes }]
        });
        if (writeErr) {
            return { error: writeErr };
        }
        if (writeResp?.error) {
            return { error: writeResp.error };
        }

        return {};
    }

    // DeliverMessageCreateBounty() handles a 'createBounty' message:
    //   1. debits `reward` uCNPY from the creator's account balance
    //   2. credits it to a deterministic, keyless escrow pseudo-account for this bounty id
    //      (see deriveEscrowAddress - only this plugin's code ever writes to it)
    //   3. writes the new Bounty record (status: Open)
    //   4. creates or updates the creator's Profile, incrementing createdBounties - this is the
    //      "side effect of other GG Bounty transactions" promised in DeliverMessageCreateProfile's
    //      docblock. If the creator has no profile yet, a minimal one is created (empty
    //      username/bio/avatar) so createdBounties has somewhere to live; the creator can fill in
    //      the rest later via CreateProfile, which preserves this count (see its upsert logic).
    //
    // tx is passed (not just msg) because deriveBountyId() needs tx.time and tx.createdHeight,
    // and DeliverMessageCreateProfile-style profile timestamps need tx.time - both must come from
    // the signed transaction, never local Date.now() (see the determinism note above).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async DeliverMessageCreateBounty(contract: Contract, msg: any, tx: any): Promise<any> {
        const txTime = Long.isLong(tx?.time) ? tx.time : Long.fromNumber((tx?.time as number) || 0);
        const createdHeight = Long.isLong(tx?.createdHeight)
            ? tx.createdHeight
            : Long.fromNumber((tx?.createdHeight as number) || 0);
        const nowSeconds = txTime.divide(1_000_000);

        const title = (msg.title as string).trim();
        const reward = Long.isLong(msg.reward) ? msg.reward : Long.fromNumber((msg.reward as number) || 0);

        const bountyId = deriveBountyId(msg.signerAddress!, title, txTime, createdHeight);
        const escrowAddress = deriveEscrowAddress(bountyId);

        const creatorAccountKey = KeyForAccount(msg.signerAddress!);
        const creatorProfileKey = KeyForProfile(msg.signerAddress!);
        const escrowAccountKey = KeyForAccount(escrowAddress);
        const bountyKey = KeyForBounty(bountyId);

        const creatorAccountQueryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
        const creatorProfileQueryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));

        const [readResp, readErr] = await contract.plugin.StateRead(contract, {
            keys: [
                { queryId: creatorAccountQueryId, key: creatorAccountKey },
                { queryId: creatorProfileQueryId, key: creatorProfileKey }
            ]
        });
        if (readErr) {
            return { error: readErr };
        }
        if (readResp?.error) {
            return { error: readResp.error };
        }

        let creatorAccountBytes: Uint8Array | null = null;
        let creatorProfileBytes: Uint8Array | null = null;
        for (const resp of readResp?.results || []) {
            const qid = resp.queryId as Long;
            if (qid.equals(creatorAccountQueryId)) {
                creatorAccountBytes = resp.entries?.[0]?.value || null;
            } else if (qid.equals(creatorProfileQueryId)) {
                creatorProfileBytes = resp.entries?.[0]?.value || null;
            }
        }

        const [creatorAccountRaw, accountErr] = Unmarshal(creatorAccountBytes || new Uint8Array(), types.Account);
        if (accountErr) {
            return { error: accountErr };
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const creatorAccount = creatorAccountRaw as any;
        const creatorBalance = Long.isLong(creatorAccount?.amount)
            ? creatorAccount.amount
            : Long.fromNumber((creatorAccount?.amount as number) || 0);

        // re-validate solvency statefully - CheckMessageCreateBounty only validated reward > 0,
        // it has no access to the account balance (CheckTx in this template is stateless per
        // message, aside from the generic fee-threshold read at the top of CheckTx)
        if (creatorBalance.lessThan(reward)) {
            return { error: ErrInsufficientFunds() };
        }

        const [creatorProfileRaw, profileErr] = Unmarshal(creatorProfileBytes || new Uint8Array(), types.Profile);
        if (profileErr) {
            return { error: profileErr };
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const creatorProfile = creatorProfileRaw as any;
        const hasProfile = !!creatorProfileBytes && creatorProfileBytes.length > 0;

        const newCreatorBalance = creatorBalance.subtract(reward);
        const updatedCreatorAccount = types.Account.create({
            address: msg.signerAddress,
            amount: newCreatorBalance
        });
        const updatedEscrowAccount = types.Account.create({ address: escrowAddress, amount: reward });

        const updatedProfile = types.Profile.create({
            address: msg.signerAddress,
            username: hasProfile ? creatorProfile?.username : '',
            avatarUrl: hasProfile ? creatorProfile?.avatarUrl : '',
            bio: hasProfile ? creatorProfile?.bio : '',
            reputation: hasProfile ? creatorProfile?.reputation : Long.ZERO,
            totalRewardsEarned: hasProfile ? creatorProfile?.totalRewardsEarned : Long.ZERO,
            completedBounties: hasProfile ? creatorProfile?.completedBounties : Long.ZERO,
            createdBounties: (hasProfile ? creatorProfile?.createdBounties ?? Long.ZERO : Long.ZERO).add(1),
            createdAt: hasProfile ? creatorProfile?.createdAt : nowSeconds,
            updatedAt: nowSeconds
        });

        const newBounty = types.Bounty.create({
            id: bountyId,
            creator: msg.signerAddress,
            title,
            description: (msg.description as string).trim(),
            reward,
            deadline: msg.deadline,
            status: 0, // Open
            participantCount: Long.ZERO,
            submissionCount: Long.ZERO,
            winner: new Uint8Array(0),
            createdAt: nowSeconds
        });

        const sets = [
            { key: escrowAccountKey, value: types.Account.encode(updatedEscrowAccount).finish() },
            { key: creatorProfileKey, value: types.Profile.encode(updatedProfile).finish() },
            { key: bountyKey, value: types.Bounty.encode(newBounty).finish() }
        ];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let writeResp: any;
        let writeErr: IPluginError | null;
        if (newCreatorBalance.isZero()) {
            [writeResp, writeErr] = await contract.plugin.StateWrite(contract, {
                sets,
                deletes: [{ key: creatorAccountKey }]
            });
        } else {
            [writeResp, writeErr] = await contract.plugin.StateWrite(contract, {
                sets: [...sets, { key: creatorAccountKey, value: types.Account.encode(updatedCreatorAccount).finish() }]
            });
        }
        if (writeErr) {
            return { error: writeErr };
        }
        if (writeResp?.error) {
            return { error: writeResp.error };
        }

        return {};
    }

    // DeliverMessageJoinBounty() registers the signer as a participant on an Open, non-expired
    // bounty. Rejects a second join from the same address (ErrAlreadyJoined).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async DeliverMessageJoinBounty(contract: Contract, msg: any, tx: any): Promise<any> {
        const txTime = Long.isLong(tx?.time) ? tx.time : Long.fromNumber((tx?.time as number) || 0);
        const nowSeconds = txTime.divide(1_000_000);

        const bountyKey = KeyForBounty(msg.bountyId!);
        const participantKey = KeyForParticipant(msg.bountyId!, msg.signerAddress!);
        const bountyQueryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
        const participantQueryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));

        const [readResp, readErr] = await contract.plugin.StateRead(contract, {
            keys: [
                { queryId: bountyQueryId, key: bountyKey },
                { queryId: participantQueryId, key: participantKey }
            ]
        });
        if (readErr) return { error: readErr };
        if (readResp?.error) return { error: readResp.error };

        let bountyBytes: Uint8Array | null = null;
        let participantBytes: Uint8Array | null = null;
        for (const resp of readResp?.results || []) {
            const qid = resp.queryId as Long;
            if (qid.equals(bountyQueryId)) bountyBytes = resp.entries?.[0]?.value || null;
            else if (qid.equals(participantQueryId)) participantBytes = resp.entries?.[0]?.value || null;
        }

        const [bountyRaw, bountyErr] = Unmarshal(bountyBytes || new Uint8Array(), types.Bounty);
        if (bountyErr) return { error: bountyErr };
        if (!bountyRaw) return { error: ErrBountyNotFound() };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bounty = bountyRaw as any;

        if ((bounty.status as number) !== 0) {
            return { error: ErrBountyNotOpen() };
        }
        const deadline = Long.isLong(bounty.deadline) ? bounty.deadline : Long.fromNumber(bounty.deadline || 0);
        if (deadline.lessThanOrEqual(nowSeconds)) {
            return { error: ErrBountyExpired() };
        }
        if (participantBytes && participantBytes.length > 0) {
            return { error: ErrAlreadyJoined() };
        }

        const newParticipant = types.Participant.create({
            bountyId: msg.bountyId,
            address: msg.signerAddress,
            joinedAt: nowSeconds
        });
        const participantCount = Long.isLong(bounty.participantCount)
            ? bounty.participantCount
            : Long.fromNumber(bounty.participantCount || 0);
        const updatedBounty = types.Bounty.create({ ...bounty, participantCount: participantCount.add(1) });

        const [writeResp, writeErr] = await contract.plugin.StateWrite(contract, {
            sets: [
                { key: participantKey, value: types.Participant.encode(newParticipant).finish() },
                { key: bountyKey, value: types.Bounty.encode(updatedBounty).finish() }
            ]
        });
        if (writeErr) return { error: writeErr };
        if (writeResp?.error) return { error: writeResp.error };

        return {};
    }

    // DeliverMessageSubmitWork() records (or overwrites) the signer's submission for a bounty
    // they've already joined. Requires an existing Participant record (ErrNotJoined otherwise).
    // Resubmitting overwrites the previous submission and does NOT increment submissionCount again.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async DeliverMessageSubmitWork(contract: Contract, msg: any, tx: any): Promise<any> {
        const txTime = Long.isLong(tx?.time) ? tx.time : Long.fromNumber((tx?.time as number) || 0);
        const nowSeconds = txTime.divide(1_000_000);

        const bountyKey = KeyForBounty(msg.bountyId!);
        const participantKey = KeyForParticipant(msg.bountyId!, msg.signerAddress!);
        const submissionKey = KeyForSubmission(msg.bountyId!, msg.signerAddress!);
        const bountyQueryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
        const participantQueryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
        const submissionQueryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));

        const [readResp, readErr] = await contract.plugin.StateRead(contract, {
            keys: [
                { queryId: bountyQueryId, key: bountyKey },
                { queryId: participantQueryId, key: participantKey },
                { queryId: submissionQueryId, key: submissionKey }
            ]
        });
        if (readErr) return { error: readErr };
        if (readResp?.error) return { error: readResp.error };

        let bountyBytes: Uint8Array | null = null;
        let participantBytes: Uint8Array | null = null;
        let submissionBytes: Uint8Array | null = null;
        for (const resp of readResp?.results || []) {
            const qid = resp.queryId as Long;
            if (qid.equals(bountyQueryId)) bountyBytes = resp.entries?.[0]?.value || null;
            else if (qid.equals(participantQueryId)) participantBytes = resp.entries?.[0]?.value || null;
            else if (qid.equals(submissionQueryId)) submissionBytes = resp.entries?.[0]?.value || null;
        }

        const [bountyRaw, bountyErr] = Unmarshal(bountyBytes || new Uint8Array(), types.Bounty);
        if (bountyErr) return { error: bountyErr };
        if (!bountyRaw) return { error: ErrBountyNotFound() };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bounty = bountyRaw as any;

        if ((bounty.status as number) !== 0) {
            return { error: ErrBountyNotOpen() };
        }
        const deadline = Long.isLong(bounty.deadline) ? bounty.deadline : Long.fromNumber(bounty.deadline || 0);
        if (deadline.lessThanOrEqual(nowSeconds)) {
            return { error: ErrBountyExpired() };
        }
        if (!participantBytes || participantBytes.length === 0) {
            return { error: ErrNotJoined() };
        }

        const [existingSubmissionRaw, submissionErr] = Unmarshal(submissionBytes || new Uint8Array(), types.Submission);
        if (submissionErr) return { error: submissionErr };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const existingSubmission = existingSubmissionRaw as any;
        const isNewSubmission = !submissionBytes || submissionBytes.length === 0;

        const newSubmission = types.Submission.create({
            bountyId: msg.bountyId,
            submitter: msg.signerAddress,
            description: (msg.description as string).trim(),
            repoUrl: (msg.repoUrl as string).trim(),
            demoUrl: (msg.demoUrl as string) || '',
            submittedAt: isNewSubmission ? nowSeconds : existingSubmission?.submittedAt,
            updatedAt: nowSeconds
        });

        const sets = [{ key: submissionKey, value: types.Submission.encode(newSubmission).finish() }];
        if (isNewSubmission) {
            const submissionCount = Long.isLong(bounty.submissionCount)
                ? bounty.submissionCount
                : Long.fromNumber(bounty.submissionCount || 0);
            const updatedBounty = types.Bounty.create({ ...bounty, submissionCount: submissionCount.add(1) });
            sets.push({ key: bountyKey, value: types.Bounty.encode(updatedBounty).finish() });
        }

        const [writeResp, writeErr] = await contract.plugin.StateWrite(contract, { sets });
        if (writeErr) return { error: writeErr };
        if (writeResp?.error) return { error: writeResp.error };

        return {};
    }

    // DeliverMessageSelectWinner() is the ONLY code path that can release a bounty's escrowed
    // reward (see MessageSelectWinner's docblock for why there's no separate TransferReward tx).
    // Atomically: verifies the signer is really the bounty's creator (stateful - CheckTx can't do
    // this), verifies winnerAddress really submitted work, drains the escrow pseudo-account into
    // the winner's real balance, updates the winner's Profile, and marks the bounty Completed.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async DeliverMessageSelectWinner(contract: Contract, msg: any, tx: any): Promise<any> {
        const txTime = Long.isLong(tx?.time) ? tx.time : Long.fromNumber((tx?.time as number) || 0);
        const nowSeconds = txTime.divide(1_000_000);

        const bountyKey = KeyForBounty(msg.bountyId!);
        const submissionKey = KeyForSubmission(msg.bountyId!, msg.winnerAddress!);
        const escrowAddress = deriveEscrowAddress(msg.bountyId!);
        const escrowAccountKey = KeyForAccount(escrowAddress);
        const winnerAccountKey = KeyForAccount(msg.winnerAddress!);
        const winnerProfileKey = KeyForProfile(msg.winnerAddress!);

        const bountyQueryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
        const submissionQueryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
        const escrowQueryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
        const winnerAccountQueryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
        const winnerProfileQueryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));

        const [readResp, readErr] = await contract.plugin.StateRead(contract, {
            keys: [
                { queryId: bountyQueryId, key: bountyKey },
                { queryId: submissionQueryId, key: submissionKey },
                { queryId: escrowQueryId, key: escrowAccountKey },
                { queryId: winnerAccountQueryId, key: winnerAccountKey },
                { queryId: winnerProfileQueryId, key: winnerProfileKey }
            ]
        });
        if (readErr) return { error: readErr };
        if (readResp?.error) return { error: readResp.error };

        let bountyBytes: Uint8Array | null = null;
        let submissionBytes: Uint8Array | null = null;
        let escrowBytes: Uint8Array | null = null;
        let winnerAccountBytes: Uint8Array | null = null;
        let winnerProfileBytes: Uint8Array | null = null;
        for (const resp of readResp?.results || []) {
            const qid = resp.queryId as Long;
            if (qid.equals(bountyQueryId)) bountyBytes = resp.entries?.[0]?.value || null;
            else if (qid.equals(submissionQueryId)) submissionBytes = resp.entries?.[0]?.value || null;
            else if (qid.equals(escrowQueryId)) escrowBytes = resp.entries?.[0]?.value || null;
            else if (qid.equals(winnerAccountQueryId)) winnerAccountBytes = resp.entries?.[0]?.value || null;
            else if (qid.equals(winnerProfileQueryId)) winnerProfileBytes = resp.entries?.[0]?.value || null;
        }

        const [bountyRaw, bountyErr] = Unmarshal(bountyBytes || new Uint8Array(), types.Bounty);
        if (bountyErr) return { error: bountyErr };
        if (!bountyRaw) return { error: ErrBountyNotFound() };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bounty = bountyRaw as any;

        if ((bounty.status as number) !== 0) {
            return { error: ErrBountyNotOpen() };
        }
        // STATEFUL authorization check - only the real creator, verified against the stored
        // Bounty record, may select a winner. CheckMessageSelectWinner cannot enforce this
        // (it's stateless), so this check is the actual security boundary.
        if (!Buffer.from(msg.signerAddress as Uint8Array).equals(Buffer.from(bounty.creator as Uint8Array))) {
            return { error: ErrNotBountyCreator() };
        }

        const [submissionRaw, submissionErr] = Unmarshal(submissionBytes || new Uint8Array(), types.Submission);
        if (submissionErr) return { error: submissionErr };
        if (!submissionRaw) {
            return { error: ErrNoSubmission() };
        }

        const [escrowRaw, escrowErr] = Unmarshal(escrowBytes || new Uint8Array(), types.Account);
        if (escrowErr) return { error: escrowErr };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const escrowAccount = escrowRaw as any;
        const escrowBalance = Long.isLong(escrowAccount?.amount)
            ? escrowAccount.amount
            : Long.fromNumber((escrowAccount?.amount as number) || 0);
        const reward = Long.isLong(bounty.reward) ? bounty.reward : Long.fromNumber(bounty.reward || 0);
        // defensive invariant check: this plugin's own code is the only writer of the escrow
        // account, so escrowBalance should always exactly equal bounty.reward. If it doesn't,
        // something is wrong elsewhere and paying out anyway would be unsafe - refuse instead.
        if (!escrowBalance.equals(reward)) {
            return { error: ErrEscrowMismatch() };
        }

        const [winnerAccountRaw, winnerAccountErr] = Unmarshal(winnerAccountBytes || new Uint8Array(), types.Account);
        if (winnerAccountErr) return { error: winnerAccountErr };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const winnerAccount = winnerAccountRaw as any;
        const winnerBalance = Long.isLong(winnerAccount?.amount)
            ? winnerAccount.amount
            : Long.fromNumber((winnerAccount?.amount as number) || 0);
        const updatedWinnerAccount = types.Account.create({
            address: msg.winnerAddress,
            amount: winnerBalance.add(reward)
        });

        const [winnerProfileRaw, winnerProfileErr] = Unmarshal(winnerProfileBytes || new Uint8Array(), types.Profile);
        if (winnerProfileErr) return { error: winnerProfileErr };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const winnerProfile = winnerProfileRaw as any;
        const hasWinnerProfile = !!winnerProfileBytes && winnerProfileBytes.length > 0;
        const updatedWinnerProfile = types.Profile.create({
            address: msg.winnerAddress,
            username: hasWinnerProfile ? winnerProfile?.username : '',
            avatarUrl: hasWinnerProfile ? winnerProfile?.avatarUrl : '',
            bio: hasWinnerProfile ? winnerProfile?.bio : '',
            reputation: (hasWinnerProfile ? winnerProfile?.reputation ?? Long.ZERO : Long.ZERO).add(
                REPUTATION_PER_WIN
            ),
            totalRewardsEarned: (hasWinnerProfile
                ? winnerProfile?.totalRewardsEarned ?? Long.ZERO
                : Long.ZERO
            ).add(reward),
            completedBounties: (hasWinnerProfile ? winnerProfile?.completedBounties ?? Long.ZERO : Long.ZERO).add(1),
            createdBounties: hasWinnerProfile ? winnerProfile?.createdBounties : Long.ZERO,
            createdAt: hasWinnerProfile ? winnerProfile?.createdAt : nowSeconds,
            updatedAt: nowSeconds
        });

        const updatedBounty = types.Bounty.create({ ...bounty, status: 1, winner: msg.winnerAddress });

        const [writeResp, writeErr] = await contract.plugin.StateWrite(contract, {
            sets: [
                { key: winnerAccountKey, value: types.Account.encode(updatedWinnerAccount).finish() },
                { key: winnerProfileKey, value: types.Profile.encode(updatedWinnerProfile).finish() },
                { key: bountyKey, value: types.Bounty.encode(updatedBounty).finish() }
            ],
            deletes: [{ key: escrowAccountKey }]
        });
        if (writeErr) return { error: writeErr };
        if (writeResp?.error) return { error: writeResp.error };

        return {};
    }
}

const accountPrefix = Buffer.from([1]); // store key prefix for accounts
const poolPrefix = Buffer.from([2]); // store key prefix for pools
const paramsPrefix = Buffer.from([7]); // store key prefix for governance parameters

// KeyForAccount() returns the state database key for an account
export function KeyForAccount(addr: Uint8Array): Uint8Array {
    return JoinLenPrefix(accountPrefix, Buffer.from(addr));
}

// KeyForFeeParams() returns the state database key for governance controlled 'fee parameters'
export function KeyForFeeParams(): Uint8Array {
    return JoinLenPrefix(paramsPrefix, Buffer.from('/f/'));
}

// KeyForFeePool() returns the state database key for governance controlled 'fee parameters'
export function KeyForFeePool(chainId: Long): Uint8Array {
    return JoinLenPrefix(poolPrefix, formatUint64(chainId));
}

// KeyForProfile() returns the state database key for a GG Bounty Profile record
export function KeyForProfile(addr: Uint8Array): Uint8Array {
    return JoinLenPrefix(profilePrefix, Buffer.from(addr));
}

// ProfilePrefix() returns the bare prefix for range-reading all Profile records
export function ProfilePrefix(): Uint8Array {
    return JoinLenPrefix(profilePrefix);
}

// KeyForBounty() returns the state database key for a GG Bounty Bounty record
export function KeyForBounty(bountyId: Uint8Array): Uint8Array {
    return JoinLenPrefix(bountyPrefix, Buffer.from(bountyId));
}

// BountyPrefix() returns the bare prefix for range-reading all Bounty records
export function BountyPrefix(): Uint8Array {
    return JoinLenPrefix(bountyPrefix);
}

// KeyForParticipant() returns the state database key for a (bountyId, address) Participant
// record. Composite key: bountyId groups all participants of a bounty together for range reads.
export function KeyForParticipant(bountyId: Uint8Array, addr: Uint8Array): Uint8Array {
    return JoinLenPrefix(participantPrefix, Buffer.from(bountyId), Buffer.from(addr));
}

// ParticipantsByBountyPrefix() returns the sub-prefix for range-reading every Participant of one bounty
export function ParticipantsByBountyPrefix(bountyId: Uint8Array): Uint8Array {
    return JoinLenPrefix(participantPrefix, Buffer.from(bountyId));
}

// KeyForSubmission() returns the state database key for a (bountyId, submitter) Submission record
export function KeyForSubmission(bountyId: Uint8Array, addr: Uint8Array): Uint8Array {
    return JoinLenPrefix(submissionPrefix, Buffer.from(bountyId), Buffer.from(addr));
}

// SubmissionsByBountyPrefix() returns the sub-prefix for range-reading every Submission to one bounty
export function SubmissionsByBountyPrefix(bountyId: Uint8Array): Uint8Array {
    return JoinLenPrefix(submissionPrefix, Buffer.from(bountyId));
}

function formatUint64(u: Long): Buffer {
    const b = Buffer.alloc(8);
    b.writeBigUInt64BE(BigInt(u.toString()));
    return b;
}
