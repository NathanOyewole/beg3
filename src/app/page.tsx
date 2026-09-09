import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CampaignCard } from "@/components/core/CampaignCard";
import { Button } from "@/components/ui/button";
import { mockCampaigns } from "@/lib/store";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-4 pt-16 pb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Fund builders on Base
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            The simplest way for Base builders to get funded.
            Post a request. Get USDC onchain. No middlemen.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/create">
              <Button className="h-11 px-6 text-base">Create Request</Button>
            </Link>
            <a href="#campaigns">
              <Button variant="secondary" className="h-11 px-6 text-base">
                Explore
              </Button>
            </a>
          </div>
        </section>

        {/* Campaigns */}
        <section id="campaigns" className="mx-auto max-w-5xl px-4 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Active Requests</h2>
            <span className="text-sm text-muted-foreground">
              {mockCampaigns.length} campaigns
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {mockCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
