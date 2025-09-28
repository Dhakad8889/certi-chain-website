"use client"

import { useEffect } from "react"

export default function Modal({ open, onClose, title, children, actions }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.()
    }
    if (open) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-label={title || "Dialog"}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      {/* Panel */}
      <div className="relative z-[61] w-full max-w-lg origin-top animate-in fade-in zoom-in-95 rounded-2xl border border-border bg-card p-5 shadow-2xl">
        {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
        <div className="text-sm">{children}</div>
        {actions && <div className="mt-4 flex items-center justify-end gap-2">{actions}</div>}
      </div>
    </div>
  )
}
