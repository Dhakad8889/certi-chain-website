"use client"

import Header from "@/components/site/header"
import { ThemeProvider } from "@/components/site/theme-context"

export default function TermsPage() {
  return (
    <ThemeProvider>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Terms of Use</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          By using this portal, you agree to comply with applicable laws and to provide accurate information for
          verification.
        </p>
        <ul className="mt-6 list-disc pl-6 space-y-2 text-sm">
          <li>Impersonation or misuse of documents is prohibited.</li>
          <li>All actions may be logged for security and audit purposes.</li>
          <li>Service availability may vary during maintenance windows.</li>
        </ul>
      </main>
    </ThemeProvider>
  )
}
