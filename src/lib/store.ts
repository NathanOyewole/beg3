import { Campaign } from "./types";

export const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Ship a Base-native portfolio tracker",
    description:
      "Building a clean, fast portfolio tracker that works natively with Base wallets and shows real-time positions across DEXes and lending protocols.",
    creator: "jesse.base.eth",
    creatorAddress: "0x1234...abcd",
    goal: 2500,
    raised: 1870,
    backers: 34,
    status: "active",
    createdAt: "2026-09-01",
    category: "Tools",
  },
  {
    id: "2",
    title: "Open-source Base SDK examples",
    description:
      "A set of high-quality, production-ready example apps and templates for builders shipping on Base. Fully open source.",
    creator: "builder.eth",
    creatorAddress: "0x5678...ef01",
    goal: 1500,
    raised: 1500,
    backers: 28,
    status: "funded",
    createdAt: "2026-08-20",
    category: "Education",
  },
  {
    id: "3",
    title: "Onchain invoice tool for freelancers",
    description:
      "Simple USDC invoices that settle on Base. Create, send, and track payments without the usual Web2 friction.",
    creator: "nathan",
    creatorAddress: "0x9abc...2345",
    goal: 3000,
    raised: 420,
    backers: 9,
    status: "active",
    createdAt: "2026-09-05",
    category: "Payments",
  },
  {
    id: "4",
    title: "Base mini-app starter kit",
    description:
      "Drop-in starter for Farcaster + Base mini apps with Smart Wallet already wired. Save builders days of setup.",
    creator: "dev.base",
    creatorAddress: "0xdef0...6789",
    goal: 2000,
    raised: 890,
    backers: 17,
    status: "active",
    createdAt: "2026-09-03",
    category: "Tools",
  },
];
