"use client"

import Header from "@/components/site/header"
import { ThemeProvider } from "@/components/site/theme-context"

export default function PrivacyPage() {
  return (
    <ThemeProvider>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This portal respects user privacy and processes only the information necessary for credential issuance and
          verification.
        </p>
        <ul className="mt-6 list-disc pl-6 space-y-2 text-sm">
          <li>Data is used strictly for identity confirmation and document verification.</li>
          <li>We do not sell personal information.</li>
          <li>Users may request correction of inaccurate data.</li>
        </ul>
      </main>
    </ThemeProvider>
  )
}
