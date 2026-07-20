import { useEffect } from 'react'
import { useExam } from '../context/ExamContext'

/**
 * Deteksi keluar fokus / gangguan saat ujian aktif (status === in_exam).
 * Trigger: visibilitychange (hidden), Esc, offline.
 */
export function useExamGuard({ enabled = true } = {}) {
  const { status, triggerWarning } = useExam()

  const arm = enabled && status === 'in_exam'

  useEffect(() => {
    if (!arm) return undefined

    function onVisibility() {
      if (document.visibilityState === 'hidden') {
        triggerWarning('visibility')
      }
    }

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault()
        triggerWarning('escape')
      }
    }

    function onOffline() {
      triggerWarning('offline')
    }

    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('offline', onOffline)

    if (!navigator.onLine) {
      triggerWarning('offline')
    }

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('offline', onOffline)
    }
  }, [arm, triggerWarning])
}
