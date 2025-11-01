# 🔧 CivicLedger - Common Errors & Solutions

## Error Codes Guide

### Badge Errors

#### ❌ Error 0x64 (100): "Badge already claimed"
**Problem:** You're trying to claim a badge you already have.

**Solution:**
- Refresh the Badge page - it will now show your badge status
- Each wallet can only claim the badge once
- This is by design to prevent duplicate badges

**Fix:** The Badge page now checks your status automatically!

---

#### ❌ Error 0x65 (101): "Badge doesn't exist"
**Problem:** Trying to read a badge that hasn't been claimed.

**Solution:**
- Claim the badge first
- Make sure you're checking the correct wallet address

---

### Voting Errors

#### ❌ Error 0x2 (2): "Proposal not active"
**Problem:** The proposal voting has been closed.

**Solution:**
- You can only vote on active proposals
- Check the proposal status before voting

---

### Proposal Errors

#### ❌ Error 0x64 (100): "Proposal not approved"
**Problem:** Trying to log expenses on an unapproved proposal.

**Solution:**
- The proposal must be approved first
- Only the proposal owner can approve it

---

#### ❌ Error 0x65 (101): "Not the proposer"
**Problem:** Only the proposal owner can log expenses.

**Solution:**
- Make sure you're logged in with the wallet that created the proposal
- Check the proposer address

---

#### ❌ Error 0x66 (102): "Budget exceeded"
**Problem:** Trying to spend more than the approved budget.

**Solution:**
- Check remaining budget before logging expenses
- Total expenses cannot exceed the original budget

---

#### ❌ Error 0x194 (404): "Proposal not found"
**Problem:** The proposal ID doesn't exist.

**Solution:**
- Check the correct proposal ID (starts from 0)
- Make sure you're looking at the right owner's proposals

---

### Connection Errors

#### ❌ "window.aptos is undefined"
**Problem:** Petra wallet not installed or not detected.

**Solution:**
1. Install Petra wallet extension
2. Refresh the page
3. Make sure you're on a supported browser (Chrome, Brave, Edge)

---

#### ❌ "User rejected the transaction"
**Problem:** You cancelled the transaction in Petra wallet.

**Solution:**
- Click approve in the Petra wallet popup
- Make sure you have enough APT for gas fees

---

#### ❌ "Insufficient balance"
**Problem:** Not enough APT in your wallet for gas fees.

**Solution:**
1. Go to https://aptos.dev/network/faucet
2. Paste your wallet address
3. Get free testnet APT
4. Try the transaction again

---

## 🆘 Need More Help?

### Check These:
1. **Browser Console:** Press F12 to see detailed errors
2. **Petra Wallet:** Make sure it's connected to Testnet
3. **Network:** Confirm you're on Aptos Testnet, not Mainnet
4. **Balance:** Verify you have testnet APT

### Common Fixes:
- ✅ Refresh the page
- ✅ Reconnect your wallet
- ✅ Clear browser cache (Ctrl+Shift+R)
- ✅ Check you're on the right network (Testnet)

---

## 📊 Transaction Status

After submitting a transaction:
1. Copy the transaction hash
2. Visit: https://explorer.aptoslabs.com/txn/YOUR_TX_HASH?network=testnet
3. Check if it succeeded or failed
4. View the detailed error message if it failed

