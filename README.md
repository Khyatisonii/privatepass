# PrivatePass

PrivatePass is a minimal ticket-verification prototype designed to explore a ticket lifecycle in a compact, privacy-aware blockchain integration. The app keeps the Vite React frontend separate from the Midnight blockchain workflow so that the user-facing prototype remains intact while the contract and wallet logic are developed as a dedicated integration layer.

## What is implemented

This repository currently contains:

- a React + TypeScript frontend under `src/`
- a Midnight integration layer under `midnight/`
- a Compact contract at `contracts/private-pass.compact`
- generated contract artifacts under `contracts/managed/private-pass/`
- local devnet setup, wallet management, deployment, and CLI tooling

The primary blockchain milestone implemented here is a minimal ticket registration circuit that stores a ticket identifier in the public ledger state.

## Midnight integration

The Midnight integration code is intentionally isolated from the frontend under `midnight/` and includes:

- network resolution and local devnet configuration
- wallet creation and sync
- proof-server and indexer wiring
- contract compilation and deployment flow
- a small CLI for contract interaction

These files are kept separate from the React app to make the blockchain integration explicit and easier to reason about.

## Compact contract

The contract source is:

```compact
export ledger ticketId: Opaque<"string">;

export circuit registerTicket(customTicketId: Opaque<"string">): [] {
  ticketId = disclose(customTicketId);
}
```

This contract uses a single public ledger value, `ticketId`, and exposes a single circuit, `registerTicket`, which writes the supplied ticket identifier to the contract state.

The generated contract artifact is produced by:

```bash
npm run compile
```

## Local Midnight devnet

The project is configured to work against a local Midnight devnet with a local indexer and proof server.

Start the local services:

```bash
npm run proof-server:start
```

This is intended to bring up the local proof server and dependencies used by the Midnight stack.

## Compile the contract

```bash
npm run compile
```

This runs:

```bash
compact compile contracts/private-pass.compact contracts/managed/private-pass
```

and produces the generated contract artifacts in `contracts/managed/private-pass`.

## Deploy the contract

```bash
npm run deploy
```

This script loads the generated contract, connects to the active Midnight network, creates a wallet context, syncs it, waits for the proof server, and deploys the contract to the configured local devnet.

## Run the CLI

```bash
npm run cli
```

The CLI connects to the most recently recorded deployment in `.midnight-state.json` and allows interaction with the deployed contract.

## Supported functionality

The following have been verified in this repository:

- Midnight project structure and wallet/network setup
- local devnet startup support
- wallet sync against the configured local network
- contract compilation
- contract deployment to the local devnet
- generated contract loading and deployment wiring

The current implementation does not claim full end-to-end success for a complete ticket lifecycle. The contract is intentionally minimal and the known limitation is below.

## Known limitation: registerTicket runtime mismatch

The local devnet deployment succeeds, and the contract deployment succeeds. However, when the CLI executes `registerTicket`, the transaction currently hits a Midnight SDK/runtime state mismatch during transaction assembly:

> `Error: expected instance of StateValue`

This is a known limitation of the current implementation and is not being described as full end-to-end functionality. The issue is in the Midnight SDK state assembly path, not in the Compact contract itself, and the current implementation does not yet complete a successful live `registerTicket` transaction.

The project therefore distinguishes clearly between:

- successful infrastructure setup
- successful contract compilation
- successful local devnet startup
- successful wallet sync
- successful contract deployment
- unresolved runtime issue during live registerTicket execution

## Commands

```bash
npm run compile
npm run deploy
npm run cli
```

## Local state and secrets

Local Midnight wallet state, deployment state, and runtime database files are generated during development and are intentionally not committed. The repository ignores local wallet and devnet state such as:

- `.midnight-state.json`
- `.midnight-wallet-state/`
- `midnight-level-db/`
- `.midnight/`
- generated contract output under `contracts/managed/`

This preserves a clean, reproducible repository while the SDK/runtime issue is isolated and documented honestly.
