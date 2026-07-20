import { useEffect, useRef, useState } from 'react'

function remainingSeconds(endsAt) {
  if (!endsAt) return 0
  return Math.max(0, Math.ceil((endsAt - Date.now()) / 1000))
}

export default function WarningModal({
  open,
  endsAt,
  reason,
  onContinue,
  onStop,
}) {
  const [seconds, setSeconds] = useState(() => remainingSeconds(endsAt))
  const stoppedRef = useRef(false)

  useEffect(() => {
    if (!open) {
      stoppedRef.current = false
      return undefined
    }
    if (!endsAt) return undefined

    function tick() {
      const left = remainingSeconds(endsAt)
      setSeconds(left)
      if (left <= 0 && !stoppedRef.current) {
        stoppedRef.current = true
        onStop()
      }
    }

    tick()
    const id = setInterval(tick, 250)
    return () => clearInterval(id)
  }, [open, endsAt, onStop])

  if (!open) return null

  const reasonText =
    reason === 'offline'
      ? 'Koneksi terputus (offline).'
      : reason === 'escape'
        ? 'Tombol Esc terdeteksi.'
        : 'Anda meninggalkan halaman ujian (pindah tab / app).'

  return (
    <div className="modal-overlay" role="presentation">
      <div
        className="modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="warning-title"
        aria-describedby="warning-desc"
      >
        <p className="eyebrow">Peringatan</p>
        <h2 id="warning-title">Fokus ujian terganggu</h2>
        <p id="warning-desc" className="muted">
          {reasonText} Kembali ke ujian dalam{' '}
          <strong className="modal-count">{seconds}</strong> detik, atau pilih
          aksi di bawah.
        </p>

        <div className="modal-actions">
          <button type="button" className="btn" onClick={onContinue}>
            Tetap Lanjut
          </button>
          <button type="button" className="btn btn--danger" onClick={onStop}>
            Hentikan Tes
          </button>
        </div>
      </div>
    </div>
  )
}
