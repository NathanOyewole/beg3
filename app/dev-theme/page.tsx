import React from 'react'
import { Button, Card } from '@/components/ui'

export const metadata = {
  title: 'Design Tokens Preview',
}

export default function Page() {
  return (
    <div className="min-h-screen p-12 bg-base-bg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-base-heading">Design Tokens Preview</h1>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Buttons</h2>
          <div className="flex gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Accent</Button>
            <Button variant="destructive">Danger</Button>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Card</h2>
          <Card>
            <h3 className="text-lg font-bold text-base-heading">Card Title</h3>
            <p className="text-base-text mt-2">This card uses `bg-card` and `border-border` tokens.</p>
            <div className="mt-4">
              <Button className="mr-2">Action</Button>
              <Button variant="secondary">Secondary</Button>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Color Swatches</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-brand-light border border-brand-dark">
              <div className="h-8 w-full bg-brand rounded mb-2" />
              <div className="text-sm text-base-text">Brand</div>
            </div>
            <div className="p-4 rounded-lg bg-accent-light border border-accent">
              <div className="h-8 w-full bg-accent rounded mb-2" />
              <div className="text-sm text-base-text">Accent</div>
            </div>
            <div className="p-4 rounded-lg bg-genesis-light border border-genesis">
              <div className="h-8 w-full bg-genesis rounded mb-2" />
              <div className="text-sm text-base-text">Genesis</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
