import { useEffect, useState } from 'react'

function formatTime(totalSeconds) {
  const safe = Math.max(0, totalSeconds)
  const m = Math.floor(safe / 60)
  const s = safe % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function ExamHeader({ name, endsAt }) {
  const [remaining, setRemaining] = useState(() =>
    endsAt ? Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)) : 0,
  )

  useEffect(() => {
    if (!endsAt) return undefined

    function tick() {
      setRemaining(Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)))
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [endsAt])

  const urgent = remaining > 0 && remaining <= 60

  return (
    <header className="exam-header">
      <div>
        <p className="eyebrow">CBT Tryout</p>
        <h1 className="exam-header__title">{name ?? 'Peserta'}</h1>
      </div>
      <div className={`exam-timer${urgent ? ' exam-timer--urgent' : ''}`}>
        <span className="exam-timer__label">Sisa waktu</span>
        <span className="exam-timer__value">{formatTime(remaining)}</span>
      </div>
    </header>
  )
}
