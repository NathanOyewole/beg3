export const tokens = {
  colors: {
    brand: { DEFAULT: '#2563EB', light: '#DBEAFE', dark: '#1E3A8A' },
    accent: { DEFAULT: '#9333EA', light: '#F3E8FF' },
    genesis: { DEFAULT: '#F59E0B', light: '#FEF3C7', dark: '#B45309' },
    base: {
      bg: '#F8FAFC',
      card: '#FFFFFF',
      border: '#E2E8F0',
      text: '#475569',
      heading: '#0F172A',
      muted: '#94A3B8',
    },
    success: '#22C55E',
    danger: '#EF4444',
  },
  typography: {
    fontFamily: {
      sans: "var(--font-sans)",
      mono: "var(--font-mono)",
    },
    sizes: {
      display: '64px',
      h1: '48px',
      h2: '36px',
      h3: '24px',
      h4: '20px',
      body: '16px',
      small: '14px',
    },
  },
  spacing: { 1: '4px', 2: '8px', 4: '16px', 6: '24px', 8: '32px', 12: '48px' },
  radius: '0.75rem',
  icons: { inline: 16, feature: 20 },
  // This object is what Tailwind will consume directly
  tailwind: {
    brand: {
      DEFAULT: '#2563EB',
      light: '#DBEAFE',
      dark: '#1E3A8A',
    },
    accent: { DEFAULT: '#9333EA', light: '#F3E8FF' },
    base: {
      bg: '#F8FAFC',
      card: '#FFFFFF',
      border: '#E2E8F0',
      text: '#475569',
      heading: '#0F172A',
      muted: '#94A3B8',
    },
    genesis: { DEFAULT: '#F59E0B', light: '#FEF3C7', dark: '#B45309' },
    success: '#22C55E',
    danger: '#EF4444',
    // Keep mapped hsl variables for shadcn/ui compatibility
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
    secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
    destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
    muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
    accentMapped: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
    popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
    card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
  },
}

export default tokens
