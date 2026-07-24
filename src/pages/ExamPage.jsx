import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ExamHeader from '../components/ExamHeader'
import QuestionCard from '../components/QuestionCard'
import QuestionNav from '../components/QuestionNav'
import WarningModal from '../components/WarningModal'
import { useExam } from '../context/ExamContext'
import { dummyQuestions } from '../data/dummyQuestions'
import { useExamGuard } from '../hooks/useExamGuard'
import { loadTipSeen, saveTipSeen } from '../utils/storage'

const EXAM_DURATION_MS = 30 * 60 * 1000

export default function ExamPage() {
  const {
    status,
    user,
    answers,
    currentQuestionIndex,
    examEndsAt,
    warningEndsAt,
    warningReason,
    demoMode,
    setStatus,
    setAnswer,
    setCurrentQuestionIndex,
    setDemoMode,
    startExamTimer,
    continueExam,
    blockExam,
    triggerWarning,
  } = useExam()

  const [searchParams] = useSearchParams()
  const [showTip, setShowTip] = useState(() => !loadTipSeen())

  const urlDemo = searchParams.get('demo')
  const labOpen = useMemo(() => {
    if (urlDemo === '0' || urlDemo === 'false') return false
    if (urlDemo === '1' || urlDemo === 'true') return true
    return demoMode
  }, [urlDemo, demoMode])

  const locked = status === 'blocked' || status === 'warning'

  useExamGuard({ enabled: Boolean(user) && status === 'in_exam' })

  useEffect(() => {
    if (!user) return
    if (status === 'blocked' || status === 'warning') return
    if (status === 'logged_in' || status === 'idle') {
      setStatus('in_exam')
    }
    if (!examEndsAt) {
      startExamTimer(Date.now() + EXAM_DURATION_MS)
    }
  }, [user, status, examEndsAt, setStatus, startExamTimer])

  const handleStop = useCallback(() => {
    blockExam()
  }, [blockExam])

  const handleContinue = useCallback(() => {
    continueExam()
  }, [continueExam])

  const handleExpire = useCallback(() => {
    blockExam('timeout')
  }, [blockExam])

  function dismissTip() {
    saveTipSeen()
    setShowTip(false)
  }

  const total = dummyQuestions.length
  const index = Math.min(Math.max(0, currentQuestionIndex), total - 1)
  const question = dummyQuestions[index]
  const selectedKey = question ? (answers[question.id] ?? null) : null

  function goPrev() {
    if (index > 0) setCurrentQuestionIndex(index - 1)
  }

  function goNext() {
    if (index < total - 1) setCurrentQuestionIndex(index + 1)
  }

  const blockCopy =
    warningReason === 'timeout'
      ? 'Waktu ujian habis. Soal terkunci.'
      : 'Tes dihentikan. Soal terkunci setelah refresh pun tetap blocked.'

  return (
    <main className="page page--exam">
      <ExamHeader
        name={user.name ?? user.username}
        endsAt={examEndsAt}
        onExpire={handleExpire}
      />

      {showTip && status === 'in_exam' && (
        <div className="banner banner--tip" role="status">
          <div>
            <strong>Tips:</strong> Jangan pindah tab atau tekan Esc selama
            ujian — sistem akan menampilkan peringatan.
          </div>
          <button type="button" className="btn btn--ghost btn--sm" onClick={dismissTip}>
            Mengerti
          </button>
        </div>
      )}

      {status === 'blocked' && (
        <div className="banner banner--blocked" role="alert">
          <div>
            <strong>{blockCopy}</strong>{' '}
            Buka lagi lewat Admin → Buka Akses.
          </div>
          <Link className="btn btn--sm" to="/admin">
            Buka Admin
          </Link>
        </div>
      )}

      <div
        className={`exam-layout${status === 'blocked' ? ' exam-layout--locked' : ''}`}
      >
        <QuestionNav
          questions={dummyQuestions}
          answers={answers}
          currentIndex={index}
          onSelect={setCurrentQuestionIndex}
        />

        <div className="panel exam-main">
          <QuestionCard
            question={question}
            selectedKey={selectedKey}
            onSelect={(key) => setAnswer(question.id, key)}
            disabled={locked}
          />

          <div className="exam-actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={goPrev}
              disabled={index === 0}
            >
              Sebelumnya
            </button>
            <span className="exam-actions__pos">
              {index + 1} / {total}
            </span>
            <button
              type="button"
              className="btn"
              onClick={goNext}
              disabled={index === total - 1}
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>

      {labOpen && (
        <aside className="lab-panel" aria-label="Panel lab demo">
          <div className="lab-panel__head">
            <p className="eyebrow">Lab demo</p>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => setDemoMode(false)}
            >
              Sembunyikan
            </button>
          </div>
          <p className="hint lab-panel__hint">
            Status: <code>{status}</code>
            {warningReason ? (
              <>
                {' '}
                · Alasan: <code>{warningReason}</code>
              </>
            ) : null}
          </p>
          <div className="lab-panel__actions">
            {status === 'in_exam' && (
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => triggerWarning('visibility')}
              >
                Simulasi warning
              </button>
            )}
            <Link className="btn btn--ghost btn--sm" to="/login">
              Login
            </Link>
            <Link className="btn btn--ghost btn--sm" to="/admin">
              Admin
            </Link>
            <Link className="btn btn--ghost btn--sm" to="/">
              Beranda
            </Link>
          </div>
        </aside>
      )}

      {!labOpen && (
        <p className="exam-demo-toggle">
          <button
            type="button"
            className="linkish"
            onClick={() => setDemoMode(true)}
          >
            Tampilkan lab demo
          </button>
        </p>
      )}

      <WarningModal
        open={status === 'warning'}
        endsAt={warningEndsAt}
        reason={warningReason}
        onContinue={handleContinue}
        onStop={handleStop}
      />
    </main>
  )
}
