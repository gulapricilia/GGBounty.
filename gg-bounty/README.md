# GG Bounty

A decentralized bounty marketplace on Canopy Network. Users create bounties, join challenges,
submit work, and earn CNPY rewards through real on-chain transactions.

## Project layout

```
gg-bounty/
├── plugin/        # Canopy TypeScript plugin template, extended with GG Bounty's custom
│                  # transactions (CreateProfile, CreateBounty, JoinBounty, SubmitWork,
│                  # SelectWinner) and custom read-only RPC endpoints. Runs as a Node.js
│                  # process alongside the Go `canopy` node, talking to it over a Unix socket.
└── frontend/      # React + Vite + TypeScript dApp. Generates its own wallet client-side,
                   # signs transactions locally, and talks to:
                     - the Canopy node's query/tx RPC (default :50002)
                     - the GG Bounty plugin's custom read RPC (default :50010)
```

These are three independent runtime processes. The frontend never holds a private key on a
server and never depends on the Canopy node's admin/keystore RPC (:50003) - wallets are
generated and held entirely client-side (see `frontend/src/wallet/`).

## Status: Feature 1 (Wallet) + Feature 2 (CreateProfile) + Feature 3 (CreateBounty) implemented

**Feature 1 - Wallet:** unchanged since last update - BLS12-381 keygen, encrypted keystore, sign.

**Feature 2 - CreateProfile:** unchanged in scope, but with one correctness fix made while building
Feature 3 - `DeliverMessageCreateProfile` originally used `Date.now()` for `createdAt`/`updatedAt`.
That's non-deterministic across validators (each node's local clock differs), which risks
diverging state roots. Fixed to use `request.tx.time` instead - the transaction's own signed
timestamp (tx.proto documents this field as "temporal entropy", i.e. it's part of the data every
validator sees identically). Every timestamp GG Bounty writes to state must come from `tx.time`,
never wall-clock - this rule is now followed throughout Feature 3 as well.

**Feature 3 - CreateBounty (reward escrow, real balance movement):**
- `plugin/proto/tx.proto`: `MessageCreateBounty` (the tx) + `Bounty` (the state record)
- `plugin/src/contract/error.ts`: 5 new validation errors
- `plugin/src/contract/contract.ts`:
  - registered in `ContractConfig`, custom state prefix `101` (`KeyForBounty`/`BountyPrefix`)
  - `deriveBountyId()`: a 20-byte id derived from `sha256(creator || title || tx.time || tx.createdHeight)`
    - deterministic across validators (no randomness, no wall-clock)
  - `deriveEscrowAddress()`: a keyless pseudo-account address derived from
    `sha256("gg-bounty-escrow-v1" || bountyId)`, reusing Canopy's existing `Account`/`KeyForAccount`
    machinery rather than inventing a new pooling primitive - nothing can move funds in/out of it
    except this plugin's own `DeliverMessageCreateBounty`/(later)`DeliverMessageSelectWinner` code
  - `CheckMessageCreateBounty`: stateless validation (title/description length, reward > 0,
    deadline strictly after `tx.time`)
  - `DeliverMessageCreateBounty`: re-validates solvency statefully, debits the creator's real
    account balance, credits the escrow pseudo-account, writes the new `Bounty` record, and
    creates-or-updates the creator's `Profile` (`createdBounties += 1`) - this is the promised
    "side effect of other GG Bounty transactions" from Feature 2's docblock, now implemented
- `plugin/src/contract/plugin.ts`: `FromAny` decode case
- `plugin/src/contract/rpc.ts`: `GET /v1/query/bounties` (list, range read) and `?id=<hex>`
  (single read; includes a server-computed `isExpired` flag - safe to use `Date.now()` here since
  it's a read-only display value, not consensus state)
- `frontend/src/tx/buildTx.ts`: `signAndBroadcast()` now returns `{ hash, height, time }` instead
  of just the hash, since some transactions (like this one) need the exact height/time used to
  derive a deterministic on-chain id client-side
- `frontend/src/tx/createBounty.ts`: encodes + validates + derives `bountyId` client-side,
  mirroring the plugin's `deriveBountyId()` exactly (documented as a "must change identically or
  the two will disagree" pairing)
- `frontend/src/components/BountyForm.tsx`: real UI - CNPY-denominated reward input (converted to
  uCNPY), datetime-local deadline picker, submits, polls for the derived bounty id's on-chain
  confirmation

## Status: ALL 6 transactions + full UI implemented (code complete, NOT yet run/verified)

**Wallet, CreateProfile, CreateBounty:** as described above, plus one determinism bugfix
(`Date.now()` -> `tx.time` in `DeliverMessageCreateProfile`).

**JoinBounty, SubmitWork, SelectWinner (+ TransferReward folded in):**
- `plugin/proto/tx.proto`: `MessageJoinBounty`+`Participant` (prefix 102), `MessageSubmitWork`+
  `Submission` (prefix 103), `MessageSelectWinner` (no separate record - it mutates `Bounty`)
- `plugin/src/contract/contract.ts`:
  - `KeyForParticipant`/`ParticipantsByBountyPrefix`, `KeyForSubmission`/`SubmissionsByBountyPrefix`
    (composite keys: `bountyId` then `address`, so all participants/submissions of one bounty
    range-read together)
  - `DeliverMessageJoinBounty`: rejects if bounty missing/not Open/expired/already joined
  - `DeliverMessageSubmitWork`: requires an existing Participant record (`ErrNotJoined`
    otherwise); resubmission overwrites without double-counting `submissionCount`
  - `DeliverMessageSelectWinner`: the ONLY code path that can drain the escrow. Verifies the
    signer is really the bounty's creator (**stateful** check against the stored record - this
    is the actual security boundary, since `CheckTx` in this template is stateless), verifies
    the winner really submitted work, then atomically credits the winner's real balance, updates
    their Profile (`completedBounties`, `totalRewardsEarned`, a flagged placeholder
    `+10 reputation` heuristic), and marks the bounty Completed
- `plugin/src/contract/rpc.ts`: `GET /v1/query/participants` (list + `?address=` single "have I
  joined" check) and `GET /v1/query/submissions` (list + `?address=` single)
- `frontend/src/tx/{joinBounty,submitWork,selectWinner}.ts`

**Full UI (routed with react-router-dom):**
- `/` Home - search/filter/sort, featured bounty, grid, recently-completed strip (all real data
  via `listBounties()`)
- `/bounty/:id` Bounty Detail - join, submit/update work, and (creator-only) select-winner-and-
  payout, submissions list, participants list - every action is a real signed broadcast + polled
  on-chain confirmation, no local-only state
- `/create` Create Bounty (existing form, now routed)
- `/activity` Activity - real balance (`/v1/query/account`) + real tx history
  (`/v1/query/txs-by-sender`), both endpoints taken directly from the tutorial's own usage
- `/wallet` Wallet + Profile management (existing components, now routed)
- Header nav + wallet status chip, GG Bounty logo throughout

**Flagged gaps/assumptions (not silently mocked):**
- Expired, unclaimed bounty escrow refund: no transaction type for it yet.
- `REPUTATION_PER_WIN` is a fixed +10 heuristic, not a real scoring system.
- `getTxHistory`'s response fields beyond `txHash`/`height` are passed through untyped - I
  haven't run this against a live node to confirm the full shape.
- `DEFAULT_FEE` in `buildTx.ts` is still a placeholder constant, not queried from real `FeeParams`.
- Username uniqueness still unenforced.

## THIS HAS NEVER BEEN COMPILED OR RUN

Every file above was written against the real template's documented patterns and the actual
`@noble/curves` API (verified via its published source), but **nothing in Features 2-6 has been
executed** - no `tsc`, no `npm run build:proto`, no live Canopy node, because this sandbox has no
outbound network access and no Go binary. Given the deadline, the fastest path is:

```bash
# plugin
cd plugin && npm install && npm run build:all

# frontend
cd ../frontend && npm install && npm run build:proto && npm run build
```

Fix whatever `tsc`/`pbjs` errors surface first (send them to me, I'll patch immediately - that's
usually fast, mostly naming mismatches). Then run your local Canopy node + this plugin and
`npm run dev` the frontend, and walk through: create wallet -> create profile -> create bounty
(check your balance actually drops by the reward) -> join from a second wallet -> submit work ->
select winner (check the balance moves to the winner) -> Activity tab shows it all.

## Setup

This sandbox has no outbound network access, so none of the following has been run or verified
here - please run it locally and paste back any errors so I can fix them immediately.

### 1. Plugin (unchanged so far - Feature 1 didn't touch it)

```bash
cd plugin
npm install
npm run build:all   # proto codegen + descriptors + tsc
```

### 2. Frontend

```bash
cd frontend
npm install
npm run build:proto  # generates src/proto/generated.{js,d.ts} from ../plugin/proto/*.proto
npm run dev
```

Open the printed local URL. You should be able to:
1. Create a wallet (name + password) -> see a new address appear
2. Lock it, then unlock it with the same password
3. Get "incorrect password" on a wrong password
4. Import a wallet from a raw 32-byte hex private key
5. Refresh the page -> wallet list persists (IndexedDB), still locked until you unlock

### If `npm run build:proto` or `npm run dev` errors

Most likely causes, given I couldn't execute this myself:
- A TypeScript strict-mode complaint I couldn't catch without the real compiler running.
- The frontend's `build:proto` output shape (`export { types, google }` from the ES6 wrapper)
  not matching exactly what `tx/buildTx.ts` and `tx/createProfile.ts` assume - this is the
  standard `protobufjs-cli -w es6` wrapper shape, but I haven't run it to confirm.

Paste me the exact error and I'll fix it in the next message.

### Verifying Feature 2 (requires a running local Canopy node + this plugin)

1. Start your local Canopy node + the GG Bounty plugin (per the plugin's own `AGENTS.md`/
   `Makefile` - `make build-all` then run the node with the plugin's socket path configured,
   same as any other custom transaction per `TUTORIAL.md`).
2. `cd frontend && npm run dev`, create/unlock a wallet.
3. Fill in the profile form (username required, bio/avatar optional) and submit.
4. Expect: "Signing & broadcasting..." -> a tx hash appears -> "Confirming on-chain..." -> a few
   seconds later, "Profile confirmed on-chain" with the record's stats (all zero on first create).
5. Refresh the page - the profile should reload from `/v1/query/profiles?address=...` and
   pre-fill the form (proves it's reading real chain state, not local memory).
6. `curl http://localhost:50010/v1/query/profiles` should list it.
