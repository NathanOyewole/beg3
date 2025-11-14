import * as React from "react"

export function Card({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-card border border-border rounded-lg p-6 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
