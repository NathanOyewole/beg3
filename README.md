# beg3 👾

**The simplest way for Base builders to get funded.**

Post a request → get USDC onchain → no middlemen.

## Why beg3?

Early Base builders often need small amounts of capital ($500–$5k) to keep shipping.  
Traditional grants are slow. Web2 crowdfunding takes high fees and delays payouts.  

beg3 removes the friction:
- Create a funding request in under a minute
- Supporters send USDC (or ETH) directly on Base
- Instant settlement, full onchain transparency, zero middlemen

## Current Status

- ✅ Clean landing page + active funding requests
- ✅ Create Request flow
- ✅ Campaign cards with progress
- ⏳ Smart contracts (Factory + Campaign)
- ⏳ Onchain contributions + Coinbase Smart Wallet
- ⏳ Real campaign detail pages

## Stack

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS
- **UI:** Custom components + Radix primitives
- **Coming soon:** Wagmi / Viem, Coinbase Smart Wallet, Foundry contracts on Base

## Getting Started

```bash
git clone https://github.com/NathanOyewole/beg3.git
cd beg3
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Homepage (hero + campaigns)
│   └── create/page.tsx   # Create funding request
├── components/
│   ├── core/             # CampaignCard, etc.
│   ├── layout/           # Header, Footer
│   └── ui/               # Button, Input, Badge, Dialog...
└── lib/
    ├── types.ts          # Campaign types
    └── store.ts          # Mock data (temporary)
```

## Roadmap

1. **Now** → Solid frontend MVP (done)
2. **Next** → Deploy `Beg3Factory` + `Beg3Campaign` contracts on Base Sepolia
3. → Wire real onchain create + contribute flows
4. → Coinbase Smart Wallet + passkey onboarding
5. → Mainnet + first real builder campaigns

## Built for Base Batches

Applying to Base Batches 004.  
Focus: simple, useful, Base-native financing tool for builders.

---

Made for builders, by a builder.
