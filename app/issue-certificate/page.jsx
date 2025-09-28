"use client"

import { useState } from "react"
import Header from "@/components/site/header"
import { ThemeProvider } from "@/components/site/theme-context"
import FileUpload, { FileList } from "@/components/site/file-upload"
import ProgressSteps from "@/components/site/progress-steps"
import AadhaarVerify, { AadhaarBadge } from "@/components/site/aadhaar-verify"

export default function IssueCertificatePage() {
  const [studentName, setStudentName] = useState("")
  const [roll, setRoll] = useState("")
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [type, setType] = useState("")
  const [program, setProgram] = useState("")
  const [files, setFiles] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [active, setActive] = useState(-1)
  const [completed, setCompleted] = useState(0)
  const [tx, setTx] = useState(null)
  const [studentAadhaar, setStudentAadhaar] = useState("")
  const [aadhaarVerified, setAadhaarVerified] = useState(false)

  function simulate() {
    setActive(0)
    setCompleted(0)
    let step = 0
    const total = 5
    const timer = setInterval(() => {
      if (step < total) {
        setActive(step)
        setTimeout(() => setCompleted((c) => Math.max(c, step + 1)), 600)
        step += 1
      } else {
        clearInterval(timer)
        const transaction = mockHash()
        setTx({
          tx: transaction,
          block: Math.floor(Math.random() * 1000000) + 500000,
        })
        setSubmitting(false)
        setActive(-1)
      }
    }, 900)
  }

  function onSubmit(e) {
    e.preventDefault()
    if (!files.length || !aadhaarVerified) return
    setSubmitting(true)
    setTx(null)
    simulate()
  }

  return (
    <ThemeProvider>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-center text-xl font-semibold mb-6">Issue a New Certificate</h2>

          {!aadhaarVerified ? (
            <div className="mb-6">
              <div className="mb-2 text-sm font-medium">Student Aadhaar Verification (Mandatory)</div>
              <AadhaarVerify
                inline
                title="Student Aadhaar Verification"
                onSuccess={(num) => {
                  setStudentAadhaar(num)
                  setAadhaarVerified(true)
                }}
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Verify the student's Aadhaar before entering certificate details.
              </p>
            </div>
          ) : (
            <div className="mb-6">
              <AadhaarBadge aadhaar={studentAadhaar} />
            </div>
          )}

          {aadhaarVerified && (
            <>
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Student Full Name</label>
                  <input
                    className="w-full rounded-lg border-2 border-input bg-background px-4 py-2"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Roll Number / Enrollment ID</label>
                  <input
                    className="w-full rounded-lg border-2 border-input bg-background px-4 py-2"
                    value={roll}
                    onChange={(e) => setRoll(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Institute</label>
                  <input
                    className="w-full rounded-lg border-2 border-input bg-muted px-4 py-2"
                    value="Institute of Technology, Ranchi"
                    readOnly
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Date of Issue</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border-2 border-input bg-background px-4 py-2"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Certificate Type</label>
                  <select
                    className="w-full rounded-lg border-2 border-input bg-background px-4 py-2"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option value="">Select Certificate Type</option>
                    <option value="degree">Degree Certificate</option>
                    <option value="diploma">Diploma Certificate</option>
                    <option value="transcript">Academic Transcript</option>
                    <option value="provisional">Provisional Certificate</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Course/Program</label>
                  <input
                    className="w-full rounded-lg border-2 border-input bg-background px-4 py-2"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Upload Certificate PDF</label>
                  <FileUpload
                    id="detailed-cert-upload"
                    accept=".pdf"
                    multiple={false}
                    onFiles={(fs) => setFiles(fs.slice(0, 1))}
                  />
                  <FileList files={files} />
                </div>

                {submitting && <ProgressSteps total={5} active={active} completed={completed} />}

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={submitting || !files.length}
                    className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground"
                  >
                    {submitting ? "Processing..." : "Add to Database"}
                  </button>
                </div>
              </form>

              {tx && (
                <div className="mt-6 rounded-lg border-l-4 border-primary bg-accent/50 p-4">
                  <div className="font-semibold text-primary mb-2">🎉 Certificate Successfully Issued!</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <strong>Student:</strong> {studentName}
                      <br />
                      <strong>Enrollment:</strong> {roll}
                    </div>
                    <div>
                      <strong>File:</strong> {files[0]?.name}
                      <br />
                      <strong>Size:</strong> {formatSize(files[0]?.size || 0)}
                    </div>
                  </div>
                  <div className="mt-3 rounded-md bg-card p-3 text-sm">
                    <div className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1 text-primary-foreground">
                      ⛓️ Blockchain Transaction Details
                    </div>
                    <div className="mt-2 font-mono">
                      <div>
                        <strong>Transaction Hash:</strong> {tx.tx}
                      </div>
                      <div>
                        <strong>Block Number:</strong> {tx.block}
                      </div>
                      <div>
                        <strong>Status:</strong> Confirmed
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
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
function formatSize(bytes = 0) {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}
