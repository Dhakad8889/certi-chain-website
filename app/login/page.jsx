"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/site/header"
import { ThemeProvider } from "@/components/site/theme-context"

export default function LoginPage() {
  const router = useRouter()
  const [id, setId] = useState("")
  const [pw, setPw] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [info, setInfo] = useState("")

  function onSubmit(e) {
    e.preventDefault()
    if (!id || !pw) {
      setInfo("Please enter both Institute ID and password.")
      return
    }
    setSubmitting(true)
    setInfo("Login successful! Redirecting to Aadhaar verification...")
    // simulate login
    setTimeout(() => {
      sessionStorage.setItem("instituteLoggedIn", "true")
      // require Aadhaar verification step after login
      sessionStorage.removeItem("instituteAadhaarVerified")
      router.push("/login/aadhaar")
    }, 1200)
  }

  return (
    <ThemeProvider>
      <Header />
      <main className="mx-auto max-w-md px-4 py-10">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 text-xl font-semibold">
              <span aria-hidden>🛡️</span>
              <span className="text-primary">Jharkhand Credential Portal</span>
            </div>
            <p className="text-muted-foreground">Institute of Technology, Ranchi</p>
          </div>

          <h2 className="text-center text-lg font-semibold mb-4">Institute Login</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="text"
              className="w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-center"
              placeholder="Institute ID / Email"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-center"
              placeholder="Password ••••••"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
            />
            <div className="text-center">
              <button
                type="button"
                className="text-primary underline underline-offset-2"
                onClick={() => setInfo("Please contact system administrator for password reset.")}
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground"
            >
              {submitting ? "Logging in..." : "Login"}
            </button>
          </form>

          {info && (
            <p className="mt-4 text-center text-sm text-muted-foreground" role="status">
              {info}
            </p>
          )}
        </div>
      </main>
    </ThemeProvider>
  )
}
