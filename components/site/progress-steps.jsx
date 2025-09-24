"use client"

export default function ProgressSteps({ total = 4, active = 0, completed = 0 }) {
  const items = Array.from({ length: total }, (_, i) => i + 1)
  return (
    <div className="relative my-6 flex items-center justify-between gap-3 md:gap-6">
      <div className="absolute inset-x-0 top-1/2 -z-10 h-px -translate-y-1/2 bg-border md:h-0.5" />
      {items.map((n, i) => {
        const isActive = i === active
        const isCompleted = i < completed
        return (
          <div
            key={n}
            className={`flex h-12 w-12 items-center justify-center rounded-full border-4 font-semibold ${
              isCompleted
                ? "bg-primary border-primary text-primary-foreground"
                : isActive
                  ? "bg-accent border-accent text-accent-foreground"
                  : "bg-card border-border"
            }`}
            aria-label={`Step ${n}${isCompleted ? " completed" : isActive ? " in progress" : ""}`}
          >
            {n}
          </div>
        )
      })}
    </div>
  )
}
