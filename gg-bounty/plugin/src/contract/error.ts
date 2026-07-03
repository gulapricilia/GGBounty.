/* This file contains contract level PluginErrors */

import { types } from '../proto/types.js';

const DefaultModule = 'plugin';

// PluginError interface matching the protobuf definition
export interface IPluginError {
    code: number;
    module: string;
    msg: string;
}

// NewError() creates a plugin error
export function NewError(code: number, module: string, message: string): IPluginError {
    return types.PluginError.create({ code, module, msg: message });
}

export function ErrPluginTimeout(): IPluginError {
    return NewError(1, DefaultModule, 'a plugin timeout occurred');
}

export function ErrMarshal(err: Error): IPluginError {
    return NewError(2, DefaultModule, `marshal() failed with err: ${err.message}`);
}

export function ErrUnmarshal(err: Error): IPluginError {
    return NewError(3, DefaultModule, `unmarshal() failed with err: ${err.message}`);
}

export function ErrFailedPluginRead(err: Error): IPluginError {
    return NewError(4, DefaultModule, `a plugin read failed with err: ${err.message}`);
}

export function ErrFailedPluginWrite(err: Error): IPluginError {
    return NewError(5, DefaultModule, `a plugin write failed with err: ${err.message}`);
}

export function ErrInvalidPluginRespId(): IPluginError {
    return NewError(6, DefaultModule, 'plugin response id is invalid');
}

export function ErrUnexpectedFSMToPlugin(t: string): IPluginError {
    return NewError(7, DefaultModule, `unexpected FSM to plugin: ${t}`);
}

export function ErrInvalidFSMToPluginMMessage(t: string): IPluginError {
    return NewError(8, DefaultModule, `invalid FSM to plugin: ${t}`);
}

export function ErrInsufficientFunds(): IPluginError {
    return NewError(9, DefaultModule, 'insufficient funds');
}

export function ErrFromAny(err: Error): IPluginError {
    return NewError(10, DefaultModule, `fromAny() failed with err: ${err.message}`);
}

export function ErrInvalidMessageCast(): IPluginError {
    return NewError(11, DefaultModule, 'the message cast failed');
}

export function ErrInvalidAddress(): IPluginError {
    return NewError(12, DefaultModule, 'address is invalid');
}

export function ErrInvalidAmount(): IPluginError {
    return NewError(13, DefaultModule, 'amount is invalid');
}

export function ErrTxFeeBelowStateLimit(): IPluginError {
    return NewError(14, DefaultModule, 'tx.fee is below state limit');
}

export function ErrInvalidUsername(): IPluginError {
    return NewError(15, DefaultModule, 'username is required and must be 1-32 characters');
}

export function ErrBioTooLong(): IPluginError {
    return NewError(16, DefaultModule, 'bio must be 280 characters or fewer');
}

export function ErrAvatarUrlTooLong(): IPluginError {
    return NewError(17, DefaultModule, 'avatarUrl must be 512 characters or fewer');
}

export function ErrInvalidTitle(): IPluginError {
    return NewError(18, DefaultModule, 'title is required and must be 1-100 characters');
}

export function ErrInvalidDescription(): IPluginError {
    return NewError(19, DefaultModule, 'description is required and must be 1-2000 characters');
}

export function ErrInvalidReward(): IPluginError {
    return NewError(20, DefaultModule, 'reward must be greater than 0');
}

export function ErrInvalidDeadline(): IPluginError {
    return NewError(21, DefaultModule, 'deadline must be strictly after the transaction time');
}

export function ErrBountyNotFound(): IPluginError {
    return NewError(22, DefaultModule, 'bounty not found');
}

export function ErrInvalidBountyId(): IPluginError {
    return NewError(23, DefaultModule, 'bountyId must be 20 bytes');
}

export function ErrBountyNotOpen(): IPluginError {
    return NewError(24, DefaultModule, 'bounty is not open (already completed)');
}

export function ErrBountyExpired(): IPluginError {
    return NewError(25, DefaultModule, 'bounty deadline has passed');
}

export function ErrAlreadyJoined(): IPluginError {
    return NewError(26, DefaultModule, 'address has already joined this bounty');
}

export function ErrNotJoined(): IPluginError {
    return NewError(27, DefaultModule, 'address must join this bounty before submitting work');
}

export function ErrInvalidRepoUrl(): IPluginError {
    return NewError(28, DefaultModule, 'repoUrl is required and must be 1-512 characters');
}

export function ErrNotBountyCreator(): IPluginError {
    return NewError(29, DefaultModule, 'only the bounty creator can select a winner');
}

export function ErrNoSubmission(): IPluginError {
    return NewError(30, DefaultModule, 'winnerAddress has no submission for this bounty');
}

export function ErrEscrowMismatch(): IPluginError {
    return NewError(31, DefaultModule, 'escrow balance does not match bounty reward - refusing to pay out');
}
