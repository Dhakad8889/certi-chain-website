"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/site/header"
import { ThemeProvider } from "@/components/site/theme-context"
import AadhaarVerify from "@/components/site/aadhaar-verify"

export default function InstituteAadhaarPage() {
  const router = useRouter()

  useEffect(() => {
    const logged = sessionStorage.getItem("instituteLoggedIn") === "true"
    if (!logged) router.replace("/login")
  }, [router])

  function handleSuccess(aadhaar) {
    sessionStorage.setItem("instituteAadhaarVerified", "true")
    sessionStorage.setItem("instituteAadhaarNumber", aadhaar)
    router.push("/institution")
  }

  return (
    <ThemeProvider>
      <Header />
      <main className="mx-auto max-w-md px-4 py-10">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="text-center mb-4">
            <h1 className="text-xl font-semibold">Institute Aadhaar Verification</h1>
            <p className="text-muted-foreground text-sm">Complete Aadhaar verification to continue to the dashboard.</p>
          </div>

          <AadhaarVerify inline onSuccess={handleSuccess} title="Institute Aadhaar Verification" />

          <div className="mt-4 text-xs text-muted-foreground">
            By continuing you consent to Aadhaar-based identity verification for secure institute actions.
          </div>
        </div>
      </main>
    </ThemeProvider>
  )
}
