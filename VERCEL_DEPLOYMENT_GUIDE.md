# 🚀 Vercel Deployment Guide for CivicLedger

## ⚙️ CONFIGURATION FOR YOUR VERCEL SCREEN

### 1. **Root Directory** ⚠️ MOST IMPORTANT
```
Click "Edit" button next to Root Directory
Change from: ./
Change to: civicledger-react
```

### 2. **Build and Output Settings**
Click the dropdown arrow to expand, then enter:

```
Framework Preset: Other (already selected ✓)
Build Command: npm run build
Output Directory: build
Install Command: npm install --legacy-peer-deps
```

**Why --legacy-peer-deps?**
Your project has some peer dependency conflicts. This flag tells npm to ignore them.

### 3. **Environment Variables**
You don't need any! Skip this section.

### 4. **Click Deploy Button**
At the bottom of the page, click the big "Deploy" button.

---

## 📋 CHECKLIST BEFORE DEPLOYING

- [ ] Root Directory set to `civicledger-react`
- [ ] Build Command includes `--legacy-peer-deps`
- [ ] Framework Preset is "Other"
- [ ] Ready to click Deploy!

---

## ⏱️ WHAT HAPPENS NEXT

1. **Vercel will clone your repo** (~30 seconds)
2. **Install dependencies** (~2-3 minutes)
3. **Build your React app** (~1-2 minutes)
4. **Deploy to CDN** (~30 seconds)

Total time: **~5 minutes**

---

## 🎉 AFTER DEPLOYMENT

You'll get a URL like:
```
https://web3-voting-system.vercel.app
```

### ✅ What Will Work:
- ✅ Frontend UI (all pages)
- ✅ Wallet connection (Petra)
- ✅ Smart contract interactions
- ✅ All blockchain features

### ⚠️ Important Notes:
- The smart contracts are already deployed on Aptos Testnet
- Users need Petra wallet to use the app
- App works on testnet only (not mainnet)

---

## 🔧 IF BUILD FAILS

### Common Issue: Dependency Conflicts
**Solution:** Make sure Install Command has `--legacy-peer-deps`

### Issue: Wrong Directory
**Solution:** Check Root Directory is `civicledger-react`

### Issue: Build Command Not Found
**Solution:** Build Command should be exactly: `npm run build`

---

## 📱 TESTING YOUR DEPLOYED APP

1. Visit your Vercel URL
2. Install Petra wallet (if not installed)
3. Connect wallet
4. Try creating a proposal
5. Try voting
6. Try claiming badge

---

## 🎯 QUICK SUMMARY

**Root Directory:** `civicledger-react`
**Build Command:** `npm run build`  
**Install Command:** `npm install --legacy-peer-deps`
**Output Directory:** `build`

Then click **Deploy**! 🚀

