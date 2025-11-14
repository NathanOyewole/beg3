"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "destructive"
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variants: Record<string, string> = {
    default: "bg-primary text-primary-foreground hover:opacity-95",
    secondary: "bg-accent text-accent-foreground hover:opacity-95",
    destructive: "bg-destructive text-destructive-foreground hover:opacity-95",
  }

  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  )
}

export default Button
