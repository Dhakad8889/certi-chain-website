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
          <h1 className="text-3xl md:text-4xl font-bold text-balance">CertiChain: Academic Verification System</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Blockchain-powered certificate verification for universities and employers. Secure, transparent, and
            tamper-proof academic credential management.
          </p>
          <div className="inline-flex mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground font-semibold">
            ⛓️ Powered by Blockchain Technology
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <PortalCard
            variant="university"
            title="University Portal (Issuer)"
            subtitle="Issue blockchain-verified certificates and digitize legacy records"
            href="/login"
            primaryCta="Issue New Certificate"
            secondaryCta="Digitize Records"
          />
          <PortalCard
            variant="verification"
            title="Verification Portal (Employer & Public)"
            subtitle="Verify credentials instantly with blockchain authentication"
            href="/verification"
            primaryCta="Verify Certificate"
          />
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-xl font-semibold">🔄 How CertiChain Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold mb-2">📚 For Universities</h3>
              <ol className="space-y-3 text-sm text-foreground">
                <li>1. Enter student details & Aadhaar</li>
                <li>2. Upload official certificate PDF</li>
                <li>3. Generate SHA-256 hash & store on chain</li>
                <li>4. Certificate issued with blockchain proof</li>
              </ol>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold mb-2">🔍 For Employers</h3>
              <ol className="space-y-3 text-sm text-foreground">
                <li>1. Upload certificate & Aadhaar number</li>
                <li>2. System calculates document hash</li>
                <li>3. Smart contract lookup on blockchain</li>
                <li>4. Instant verification result</li>
              </ol>
            </div>
          </div>
        </section>
      </main>
    </ThemeProvider>
  )
}
