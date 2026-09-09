"use client";

import { useState } from "react";
import { Campaign } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("25");
  const [supported, setSupported] = useState(false);

  const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);
  const isFunded = campaign.status === "funded";

  function handleSupport(e: React.FormEvent) {
    e.preventDefault();
    // Mock success for now — real onchain tx comes next
    setSupported(true);
  }

  return (
    <>
      <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4 hover:border-primary/40 transition-colors">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="font-semibold text-base leading-snug">{campaign.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {campaign.description}
            </p>
          </div>
          {campaign.category && (
            <Badge className="shrink-0 text-xs">{campaign.category}</Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">
              ${campaign.raised.toLocaleString()} raised
            </span>
            <span className="text-muted-foreground">
              of ${campaign.goal.toLocaleString()}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                isFunded ? "bg-green-500" : "bg-primary"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{campaign.backers} backers</span>
            <span className="capitalize">{campaign.status}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-muted-foreground truncate max-w-[140px]">
            by {campaign.creator}
          </span>
          <Button
            variant="secondary"
            className="h-8 text-xs px-3"
            onClick={() => setOpen(true)}
          >
            {isFunded ? "View" : "Support"}
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{campaign.title}</DialogTitle>
            <DialogDescription>
              Support this builder with USDC on Base.
            </DialogDescription>
          </DialogHeader>

          {supported ? (
            <div className="py-8 text-center space-y-3">
              <div className="text-4xl">✅</div>
              <p className="font-medium">Support recorded</p>
              <p className="text-sm text-muted-foreground">
                In the full version this will send USDC onchain.
              </p>
              <Button className="mt-2" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSupport} className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount (USDC)</label>
                <div className="flex gap-2">
                  {["10", "25", "50", "100"].map((preset) => (
                    <Button
                      key={preset}
                      type="button"
                      variant={amount === preset ? "default" : "secondary"}
                      className="flex-1 h-9"
                      onClick={() => setAmount(preset)}
                    >
                      ${preset}
                    </Button>
                  ))}
                </div>
                <Input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-2"
                />
              </div>

              <Button type="submit" className="w-full h-11">
                Support with ${amount} USDC
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Currently mock • Real Base transactions coming soon
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CampaignCard;
