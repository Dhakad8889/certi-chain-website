"use client"

import { useEffect, useMemo, useState } from "react"
import Modal from "./modal"

export default function AadhaarVerify({
  onSuccess,
  inline = false,
  defaultOpen = false,
  title = "Aadhaar Verification",
}) {
  const [open, setOpen] = useState(defaultOpen || inline)
  const [aadhaar, setAadhaar] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [serverOtp, setServerOtp] = useState("")
  const [seconds, setSeconds] = useState(0)
  const [info, setInfo] = useState("")
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (!otpSent || seconds <= 0) return
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [otpSent, seconds])

  const masked = useMemo(() => {
    if (aadhaar.length < 12) return ""
    return `${aadhaar.slice(0, 4)}-xxxx-xxxx`
  }, [aadhaar])

  function sendOtp() {
    if (aadhaar.length !== 12) {
      setInfo("Enter a valid 12-digit Aadhaar number.")
      return
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    setServerOtp(code)
    setOtp("")
    setOtpSent(true)
    setSeconds(30)
    setInfo("OTP sent to your registered mobile number. Use demo code for preview.")
    // Debug aid (remove in production)
    console.log("[v0] Demo OTP:", code)
  }

  function verifyOtp() {
    if (otp.length !== 6) {
      setInfo("Enter the 6-digit OTP.")
      return
    }
    if (otp === serverOtp) {
      setVerified(true)
      setInfo("Aadhaar verified successfully.")
      setTimeout(() => {
        onSuccess?.(aadhaar)
        if (!inline) setOpen(false)
      }, 500)
    } else {
      setInfo("Incorrect OTP. Please try again.")
    }
  }

  const content = (
    <div className="space-y-4">
      <div className="rounded-xl bg-accent/60 text-accent-foreground p-3 text-sm">
        Aadhaar-based verification is mandatory for secure access.
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Aadhaar Number</label>
        <input
          inputMode="numeric"
          pattern="[0-9]{12}"
          maxLength={12}
          placeholder="Enter 12-digit Aadhaar"
          className="w-full rounded-lg border-2 border-input bg-background px-4 py-2"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, "").slice(0, 12))}
          disabled={verified}
        />
        {masked && <div className="mt-1 text-xs text-muted-foreground">Masked: {masked}</div>}
      </div>

      {!otpSent && !verified && (
        <button
          type="button"
          onClick={sendOtp}
          className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground"
          disabled={aadhaar.length !== 12}
        >
          Send OTP
        </button>
      )}

      {otpSent && !verified && (
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Enter OTP</label>
            <input
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              placeholder="6-digit OTP"
              className="w-full rounded-lg border-2 border-input bg-background px-4 py-2 tracking-widest text-center"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{seconds > 0 ? `Resend in ${seconds}s` : "Didn't get the code?"}</span>
            <button
              type="button"
              className="text-primary underline underline-offset-2 disabled:opacity-50"
              onClick={sendOtp}
              disabled={seconds > 0}
            >
              Resend OTP
            </button>
          </div>
          <button
            type="button"
            onClick={verifyOtp}
            className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground"
          >
            Verify OTP
          </button>
        </div>
      )}

      {verified && (
        <div className="rounded-lg border-l-4 border-primary bg-accent/50 p-3 text-sm">
          ✅ Aadhaar Verified. Access granted.
        </div>
      )}

      {info && <p className="text-xs text-muted-foreground">{info}</p>}
    </div>
  )

  if (inline) return content

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground"
      >
        Verify with Aadhaar
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        actions={
          !verified ? (
            <button onClick={() => setOpen(false)} className="rounded-lg bg-muted px-4 py-2 font-medium">
              Cancel
            </button>
          ) : (
            <button onClick={() => setOpen(false)} className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">
              Done
            </button>
          )
        }
      >
        {content}
      </Modal>
    </>
  )
}

export function AadhaarBadge({ aadhaar }) {
  if (!aadhaar) return null
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      ✅ Aadhaar Verified • {`${aadhaar.slice(0, 4)}-xxxx-xxxx`}
    </div>
  )
}
