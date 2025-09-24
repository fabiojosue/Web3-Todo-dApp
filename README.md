# Web3 Todo dApp - Complete Beginner Starter Kit

A minimal end-to-end decentralized todo application built with Hardhat + React + TypeScript. Perfect for learning blockchain development - just clone and run!

## Tech Stack

- **Smart contracts:** Solidity (Hardhat)
- **Local chain:** Hardhat Network
- **Frontend:** React + Vite + TypeScript
- **Wallet:** MetaMask
- **Web3 lib:** Ethers v6

## Prerequisites

- **Node.js 18+** (LTS recommended) - [Download here](https://nodejs.org/)
- **MetaMask browser extension** - [Install here](https://metamask.io/)
- **VS Code** (recommended) + extensions listed below

## Quick Start Guide

### 1) Clone and Install

```bash
git clone <this-repo-url>
cd web3-todo-starter

# Install contract dependencies
cd contracts
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2) Start Local Blockchain

```bash
# Terminal 1: Start the local blockchain (inside /contracts)
cd contracts  # if not already there
npx hardhat node
```

**Keep this terminal running!** This is your local Ethereum network.

### 3) Deploy Smart Contract

```bash
# Terminal 1: Start the local blockchain (inside /contracts)
npx hardhat node

# Terminal 2: Deploy the contract (open new terminal, also in /contracts)
npx hardhat run scripts/deploy.ts --network localhost
```

This writes the contract **ABI** and **address** into `../frontend/src/contracts/` automatically.

**Important:** Keep Terminal 1 running! This is your local blockchain.

### 4) Start the Frontend

```bash
# Terminal 3: Start the React app (in /frontend directory)
cd ../frontend
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`) in your browser.

### 5) Connect MetaMask

1. **Add Hardhat Local Network** to MetaMask:

   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency: `ETH`

2. **Import a test account** with this private key (has 10,000 test ETH):

   ```
   0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

3. **Switch to Hardhat Local network** in MetaMask

4. **Connect your wallet** to the dApp and start adding todos!

## How it Works

- Each todo operation (add/complete/delete) creates a blockchain transaction
- MetaMask will ask you to confirm and pay gas fees (using test ETH)
- Your todos are stored permanently on the blockchain
- Data persists as long as your local Hardhat node is running

## VS Code extensions (search by name)

- Solidity (Juan Blanco)
- Hardhat Toolbox (Nomic Foundation) — optional but nice
- ESLint
- Prettier – Code formatter
- EditorConfig for VS Code
- GitLens — Git supercharged
- Markdown All in One

## Troubleshooting

### Common Issues:

- **"Cannot connect to localhost:8545"**: Make sure Terminal 1 (Hardhat node) is still running
- **"No test ETH"**: Import the test account private key provided above
- **"Wrong network"**: Switch MetaMask to "Hardhat Local" network
- **"Contract not found"**: Re-run the deploy script in Terminal 2

### Need to Reset?

```bash
# Stop Hardhat node (Ctrl+C in Terminal 1)
# Restart it:
npx hardhat node

# Re-deploy contract:
npx hardhat run scripts/deploy.ts --network localhost
```

## What's Next?

- Try modifying the smart contract in `contracts/contracts/Todo.sol`
- Add new features to the frontend in `frontend/src/App.tsx`
- Deploy to a real testnet (Sepolia) when ready for public testing
