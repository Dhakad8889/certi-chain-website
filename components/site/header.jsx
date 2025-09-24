"use client"

import Link from "next/link"
import { useState } from "react"
import { ThemeToggleButton } from "./theme-context"

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span aria-hidden>🛡️</span>
          <span className="text-balance">CertiChain</span>
        </Link>

        <button
          aria-label="Toggle menu"
          className="md:hidden rounded-md px-3 py-2 border border-primary-foreground/20"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>

        <div className="hidden md:flex items-center gap-2">
          <Link className="rounded-md px-3 py-2 hover:bg-primary-foreground/10" href="/">
            Home
          </Link>
          <Link className="rounded-md px-3 py-2 hover:bg-primary-foreground/10" href="/login">
            Institute Login
          </Link>
          <Link className="rounded-md px-3 py-2 hover:bg-primary-foreground/10" href="/verification">
            Verification Portal
          </Link>
          <ThemeToggleButton className="ml-2" />
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-primary-foreground/20">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
            <Link
              className="rounded-md px-3 py-2 hover:bg-primary-foreground/10"
              href="/"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              className="rounded-md px-3 py-2 hover:bg-primary-foreground/10"
              href="/login"
              onClick={() => setOpen(false)}
            >
              Institute Login
            </Link>
            <Link
              className="rounded-md px-3 py-2 hover:bg-primary-foreground/10"
              href="/verification"
              onClick={() => setOpen(false)}
            >
              Verification Portal
            </Link>
            <ThemeToggleButton />
          </div>
        </div>
      )}
    </header>
  )
}
