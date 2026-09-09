"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg tracking-tight">
          <span className="text-xl">👾</span>
          <span>beg3</span>
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          >
            Explore
          </Link>
          <Link href="/create">
            <Button className="h-9 px-4 text-sm">Create Request</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
