export type CampaignStatus = "active" | "funded" | "expired";

export interface Campaign {
  id: string;
  title: string;
  description: string;
  creator: string;
  creatorAddress: string;
  goal: number; // in USDC
  raised: number;
  backers: number;
  status: CampaignStatus;
  createdAt: string;
  deadline?: string;
  category?: string;
}

export interface CreateCampaignInput {
  title: string;
  description: string;
  goal: number;
  deadline?: string;
  category?: string;
}
