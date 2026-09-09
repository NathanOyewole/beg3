"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // For now just show success — real contract integration comes next
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md space-y-4">
            <div className="text-5xl">✅</div>
            <h1 className="text-2xl font-bold">Request created</h1>
            <p className="text-muted-foreground">
              Your funding request is ready. In the full version this will deploy
              a campaign contract on Base.
            </p>
            <Link href="/">
              <Button className="mt-4">Back to Explore</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 mx-auto max-w-lg w-full px-4 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Create Funding Request</h1>
          <p className="text-muted-foreground text-sm">
            Tell the Base community what you’re building and how much you need.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              placeholder="e.g. Ship a Base portfolio tracker"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="flex min-h-[100px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="What are you building and why does it matter?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Goal (USDC)</label>
            <Input
              type="number"
              placeholder="2500"
              min="50"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full h-11">
            Create Request
          </Button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
