"use client"

export default function FileUpload({ id, accept, multiple = false, onFiles }) {
  function onChange(e) {
    const files = Array.from(e.target.files || [])
    onFiles?.(files)
  }

  function onDrop(e) {
    e.preventDefault()
    const files = Array.from(e.dataTransfer?.files || [])
    onFiles?.(files)
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="cursor-pointer rounded-xl border-2 border-dashed border-border bg-card p-8 text-center transition hover:border-primary"
      onClick={() => document.getElementById(id)?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && document.getElementById(id)?.click()}
      aria-label="Upload files"
    >
      <div className="text-4xl mb-2" aria-hidden>
        📁
      </div>
      <div className="font-semibold">Drop files here or click to upload</div>
      <div className="text-sm text-muted-foreground mt-1">{accept ? `Accepted: ${accept}` : "Any file"}</div>
      <input id={id} type="file" className="sr-only" accept={accept} multiple={multiple} onChange={onChange} />
    </div>
  )
}

export function FileList({ files }) {
  if (!files?.length) return null
  return (
    <div className="mt-3 space-y-2">
      {files.map((f, idx) => (
        <div
          key={`${f.name}-${idx}`}
          className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2"
        >
          <span aria-hidden>📄</span>
          <div className="flex-1">
            <div className="font-medium">{f.name}</div>
            <div className="text-xs text-muted-foreground">{formatSize(f.size)}</div>
          </div>
          <span className="text-primary text-lg" aria-hidden>
            ✅
          </span>
        </div>
      ))}
    </div>
  )
}

function formatSize(bytes = 0) {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}
