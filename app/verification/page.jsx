"use client"

import { useState } from "react"
import Header from "@/components/site/header"
import { ThemeProvider } from "@/components/site/theme-context"
import FileUpload, { FileList } from "@/components/site/file-upload"
import ProgressSteps from "@/components/site/progress-steps"
import AadhaarVerify, { AadhaarBadge } from "@/components/site/aadhaar-verify"

export default function VerificationPage() {
  const [aadhaar, setAadhaar] = useState("")
  const [aadhaarVerified, setAadhaarVerified] = useState(false)
  const [files, setFiles] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [active, setActive] = useState(-1)
  const [completed, setCompleted] = useState(0)
  const [result, setResult] = useState(null)

  function onSubmit(e) {
    e.preventDefault()
    if (!files.length || !aadhaarVerified) return
    setSubmitting(true)
    setResult(null)
    simulate()
  }

  function simulate() {
    setActive(0)
    setCompleted(0)
    let step = 0
    const total = 4
    const timer = setInterval(() => {
      if (step < total) {
        setActive(step)
        setTimeout(() => setCompleted((c) => Math.max(c, step + 1)), 500)
        step += 1
      } else {
        clearInterval(timer)
        setSubmitting(false)
        const ok = Math.random() > 0.2
        setResult({
          ok,
          data: ok
            ? {
                studentName: "Rahul Kumar Singh",
                course: "B.Tech Computer Science",
                university: "Institute of Technology, Ranchi",
                graduationYear: "2023",
                hash: mockHash().slice(0, 16) + "...",
              }
            : null,
        })
        setActive(-1)
      }
    }, 800)
  }

  return (
    <ThemeProvider>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <section className="rounded-2xl bg-accent text-accent-foreground p-6 text-center mb-6">
          <h1 className="text-2xl font-bold">🔍 Verification Portal</h1>
          <p>Employer & Public Access — instantly verify credentials</p>
        </section>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">📋 Certificate Verification</h2>
          {/* Aadhaar gate */}
          {!aadhaarVerified ? (
            <div className="mb-5">
              <div className="mb-2 text-sm font-medium">Aadhaar Verification</div>
              <AadhaarVerify
                onSuccess={(num) => {
                  setAadhaar(num)
                  setAadhaarVerified(true)
                }}
                title="Aadhaar Verification"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Verify Aadhaar to proceed with document verification.
              </p>
            </div>
          ) : (
            <div className="mb-5">
              <AadhaarBadge aadhaar={aadhaar} />
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Upload */}
            <div>
              <label className="mb-2 block text-sm font-medium">Upload Certificate to Verify</label>
              <FileUpload
                id="verify-upload"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple={false}
                onFiles={(fs) => setFiles(fs.slice(0, 1))}
              />
              <FileList files={files} />
            </div>

            {submitting && <ProgressSteps total={4} active={active} completed={completed} />}

            <button
              type="submit"
              disabled={submitting || !files.length || !aadhaarVerified}
              className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground disabled:opacity-60"
            >
              {submitting ? "Verifying..." : "Verify Certificate"}
            </button>
          </form>

          {result && (
            <div className="mt-6">
              {result.ok ? (
                <div className="rounded-lg border-l-4 border-primary bg-accent/50 p-4">
                  <div className="font-semibold text-primary mb-2">✅ Certificate Verified Successfully</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <strong>Student Name:</strong> {result.data.studentName}
                      <br />
                      <strong>Course:</strong> {result.data.course}
                    </div>
                    <div>
                      <strong>University:</strong> {result.data.university}
                      <br />
                      <strong>Year:</strong> {result.data.graduationYear}
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    ⛓️ Blockchain Verified — Hash: <span className="font-mono">{result.data.hash}</span>
                  </div>
                  <div className="mt-2 text-sm">
                    Aadhaar matched: <span className="font-mono">{`${aadhaar.slice(0, 4)}-xxxx-xxxx`}</span>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border-l-4 border-destructive bg-muted p-4">
                  <div className="font-semibold mb-2">❌ Certificate Not Found</div>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Not issued by a registered institution</li>
                    <li>Document may be tampered</li>
                    <li>Certificate not digitized yet</li>
                    <li>Aadhaar number mismatch</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </ThemeProvider>
  )
}

function mockHash() {
  const chars = "0123456789abcdef"
  let h = "0x"
  for (let i = 0; i < 64; i++) h += chars[Math.floor(Math.random() * chars.length)]
  return h
}
