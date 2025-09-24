"use client"

import { useEffect, useState } from "react"
import Header from "@/components/site/header"
import FileUpload, { FileList } from "@/components/site/file-upload"
import { ThemeProvider } from "@/components/site/theme-context"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function InstitutionPage() {
  const router = useRouter()
  const [showDigitize, setShowDigitize] = useState(false)
  const [files, setFiles] = useState([])
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState("")

  useEffect(() => {
    const logged = sessionStorage.getItem("instituteLoggedIn") === "true"
    if (!logged) router.replace("/login")
  }, [router])

  function processBulk() {
    if (!files.length) {
      setResult("Please upload files for digitization.")
      return
    }
    setProcessing(true)
    setResult("")
    setTimeout(() => {
      setProcessing(false)
      setResult(`Successfully processed ${files.length} legacy records.`)
    }, 2000)
  }

  return (
    <ThemeProvider>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <section className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome, Institute of Technology, Ranchi!</h1>
          <p className="text-muted-foreground">The official platform for issuing and verifying credentials.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground text-3xl">
              📜
            </div>
            <h3 className="font-semibold mb-2">Issue New Certificate</h3>
            <p className="text-muted-foreground mb-4">Create a blockchain-verified and tamper-proof certificate</p>
            <Link
              href="/issue-certificate"
              className="inline-block w-full rounded-xl bg-primary px-4 py-2 text-primary-foreground font-medium"
            >
              Issue New
            </Link>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-3xl">
              🗂️
            </div>
            <h3 className="font-semibold mb-2">Digitize Legacy Records</h3>
            <p className="text-muted-foreground mb-4">Convert physical records into secure digital certificates</p>
            <button
              className="inline-block w-full rounded-xl bg-muted px-4 py-2 font-medium"
              onClick={() => setShowDigitize(true)}
            >
              Digitize Records
            </button>
          </div>
        </section>

        {showDigitize && (
          <section className="mt-8 rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">💾 Digitize Legacy Records</h2>
            <p className="text-muted-foreground">Bulk upload scanned certificates (PDF, JPG, PNG)</p>
            <div className="mt-4">
              <FileUpload id="bulk-upload" accept=".pdf,.jpg,.jpeg,.png" multiple onFiles={setFiles} />
              <FileList files={files} />
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={processBulk}
                disabled={processing}
                className="rounded-lg bg-primary px-4 py-2 text-primary-foreground font-semibold"
              >
                {processing ? "Processing..." : "Process Legacy Records"}
              </button>
              <button
                onClick={() => {
                  setShowDigitize(false)
                  setFiles([])
                  setResult("")
                }}
                className="rounded-lg bg-muted px-4 py-2 font-semibold"
              >
                Cancel
              </button>
            </div>
            {result && (
              <div className="mt-4 rounded-lg border-l-4 border-primary bg-accent/50 p-4">
                <div className="font-semibold">✅ Legacy Records Processed</div>
                <p className="text-sm">{result}</p>
              </div>
            )}
          </section>
        )}
      </main>
    </ThemeProvider>
  )
}
