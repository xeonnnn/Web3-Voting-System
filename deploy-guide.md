# 🚀 CivicLedger Deployment Guide

## Current Status
- ✅ Smart contracts compiled successfully
- ✅ 4 modules ready to deploy
- ⚠️  Needs blockchain deployment

## Quick Deploy (Automated)

### Step 1: Initialize Aptos
```bash
cd civicledger
aptos init --network testnet
```

When prompted:
- Choose a profile name: `testnet`
- It will generate a new account and private key
- Or paste your existing private key from Petra wallet

### Step 2: Fund Your Account
Get testnet tokens:
```bash
aptos account fund-with-faucet --account default
```

Or visit: https://aptos.dev/tools/aptos-faucet/

### Step 3: Deploy Contracts
```bash
aptos move publish --profile testnet
```

### Step 4: Update Frontend
After deployment, note your deployed address and update:
- `civicledger-react/src/pages/ProposerDashboard.jsx`
- `civicledger-react/src/pages/VoterDashboard.jsx`
- `civicledger-react/src/pages/BadgePage.jsx`
- `civicledger-react/src/App.jsx`

Replace MODULE_ADDRESS with your new address.

## Verify Deployment
```bash
aptos account list --account YOUR_ADDRESS
```

