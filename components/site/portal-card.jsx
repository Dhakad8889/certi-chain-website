"use client"

import Link from "next/link"

export default function PortalCard({ variant = "university", title, subtitle, href, primaryCta, secondaryCta }) {
  const isUniversity = variant === "university"
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md">
      <div
        className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-3xl ${
          isUniversity ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
        }`}
        aria-hidden
      >
        {isUniversity ? "🏛️" : "🔍"}
      </div>
      <h3 className="text-lg font-semibold text-center">{title}</h3>
      <p className="mt-1 text-center text-muted-foreground">{subtitle}</p>
      <div className="mt-6 flex flex-col items-center gap-2">
        {primaryCta && (
          <Link
            href={href}
            className="w-full rounded-lg bg-primary px-4 py-2 text-center font-medium text-primary-foreground hover:opacity-90"
          >
            {primaryCta}
          </Link>
        )}
        {secondaryCta && (
          <Link
            href={href}
            className="w-full rounded-lg bg-muted px-4 py-2 text-center font-medium text-foreground hover:opacity-90"
          >
            {secondaryCta}
          </Link>
        )}
      </div>
    </div>
  )
}
