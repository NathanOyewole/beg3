# beg3 Contracts

Factory + Campaign pattern for onchain builder funding on Base.

## Architecture

```
Beg3Factory
  └── clones Beg3Campaign (ERC-1167 minimal proxy)
        ├── contributeETH() / contributeERC20()
        ├── claim()          ← creator, after success
        └── refund()         ← backers, after failure
```

### States
- `Active` → accepting contributions
- `Succeeded` → goal reached (or deadline passed with goal met)
- `Failed` → deadline passed, goal not met → refunds open

## Setup

```bash
cd contracts
forge install OpenZeppelin/openzeppelin-contracts --no-commit
forge install foundry-rs/forge-std --no-commit
```

## Test

```bash
forge test -vv
```

## Deploy (Base Sepolia)

```bash
export PRIVATE_KEY=0x...
export BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
forge script script/Deploy.s.sol --rpc-url $BASE_SEPOLIA_RPC_URL --broadcast --verify
```

## Notes

- `token = address(0)` → native ETH campaign
- `token = USDC address` → USDC campaign (Base USDC: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`)
- Goal and contributions use the token’s smallest unit (wei for ETH, 6 decimals for USDC)
