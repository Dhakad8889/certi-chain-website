"use client"

import Header from "@/components/site/header"
import PortalCard from "@/components/site/portal-card"
import { ThemeProvider } from "@/components/site/theme-context"

export default function HomePage() {
  return (
    <ThemeProvider>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <section className="rounded-2xl bg-accent text-accent-foreground px-6 py-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-balance">National Academic Credential Portal</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Secure, tamper-evident issuance and verification of academic documents for institutes, employers, and
            citizens across India.
          </p>
          <div className="inline-flex mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground font-semibold">
            Trusted Digital Credentials
          </div>
        </section>

        {/* Portals */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <PortalCard
            variant="university"
            title="Institute Portal (Issuer)"
            subtitle="Issue certificates and digitize legacy records"
            href="/login"
            primaryCta="Proceed to Login"
            secondaryCta="Digitize Records"
          />
          <PortalCard
            variant="verification"
            title="Verification Portal (Employer & Public)"
            subtitle="Verify credentials with Aadhaar and document upload"
            href="/verification"
            primaryCta="Open Verification"
          />
        </section>

        {/* Optional guidance in a concise, government style */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-2">For Institutes</h3>
            <ol className="space-y-2 text-sm">
              <li>1) Login with institute credentials</li>
              <li>2) Complete Aadhaar verification</li>
              <li>3) Verify student Aadhaar</li>
              <li>4) Upload certificate and issue</li>
            </ol>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-2">For Employers/Public</h3>
            <ol className="space-y-2 text-sm">
              <li>1) Verify Aadhaar</li>
              <li>2) Upload certificate</li>
              <li>3) View instant verification result</li>
            </ol>
          </div>
        </section>
      </main>
    </ThemeProvider>
  )
}
