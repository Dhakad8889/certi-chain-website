"use client"

import Header from "@/components/site/header"
import { ThemeProvider } from "@/components/site/theme-context"

export default function CookiesPage() {
  return (
    <ThemeProvider>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Cookies</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Essential cookies are used to maintain session security and improve your experience on this portal.
        </p>
        <ul className="mt-6 list-disc pl-6 space-y-2 text-sm">
          <li>Essential: required for authentication and security.</li>
          <li>Analytics: used in aggregate to improve service quality.</li>
          <li>You can control cookies from your browser settings.</li>
        </ul>
      </main>
    </ThemeProvider>
  )
}
