"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer role="contentinfo" className="mt-16 border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="font-semibold text-lg">CertiChain</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Secure, tamper-evident academic credentials for institutes, employers, and the public.
          </p>
        </div>

        {/* Links */}
        <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-6 md:col-span-2 md:grid-cols-3">
          <div>
            <h4 className="text-sm font-semibold">Portals</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link className="hover:underline" href="/login">
                  Institute Login
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/verification">
                  Verification Portal
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/issue-certificate">
                  Issue Certificate
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link className="hover:underline" href="/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/terms">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/cookies">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Help</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a className="hover:underline" href="mailto:contact@certichain.app">
                  contact@certichain.app
                </a>
              </li>
              <li>
                <a className="hover:underline" href="tel:+910000000000">
                  +91 00000 00000
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#faq">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Address */}
        <address className="not-italic text-sm text-muted-foreground">
          <div className="font-semibold text-foreground">Address</div>
          <div className="mt-2">ITM Gwalior MP India</div>
        </address>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} CertiChain. All rights reserved.</p>
          <p className="md:text-right">Built for secure, inclusive verification across India.</p>
        </div>
      </div>
    </footer>
  )
}
