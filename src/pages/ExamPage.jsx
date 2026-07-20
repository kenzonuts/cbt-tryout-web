import { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ExamHeader from '../components/ExamHeader'
import QuestionCard from '../components/QuestionCard'
import QuestionNav from '../components/QuestionNav'
import WarningModal from '../components/WarningModal'
import { useExam } from '../context/ExamContext'
import { dummyQuestions } from '../data/dummyQuestions'
import { useExamGuard } from '../hooks/useExamGuard'

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
    setStatus,
    setAnswer,
    setCurrentQuestionIndex,
    startExamTimer,
    continueExam,
    blockExam,
    triggerWarning,
  } = useExam()

  const locked = status === 'blocked' || status === 'warning'

  useExamGuard({ enabled: Boolean(user) })

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

  const total = dummyQuestions.length
  const index = Math.min(Math.max(0, currentQuestionIndex), total - 1)
  const question = dummyQuestions[index]
  const selectedKey = question ? answers[question.id] ?? null : null

  function goPrev() {
    if (index > 0) setCurrentQuestionIndex(index - 1)
  }

  function goNext() {
    if (index < total - 1) setCurrentQuestionIndex(index + 1)
  }

  if (!user) {
    return (
      <main className="page">
        <div className="panel">
          <p className="eyebrow">CBT Tryout</p>
          <h1>Halaman Ujian</h1>
          <p className="form-error">
            Belum login. <Link to="/login">Masuk dulu</Link>
          </p>
          <nav className="nav-links">
            <Link to="/admin">Admin</Link>
          </nav>
        </div>
      </main>
    )
  }

  return (
    <main className="page page--exam">
      <ExamHeader name={user.name ?? user.username} endsAt={examEndsAt} />

      {status === 'blocked' && (
        <div className="banner banner--blocked" role="alert">
          <strong>Tes dihentikan / diblokir.</strong> Soal terkunci.
          Minta admin membuka akses di <Link to="/admin">halaman Admin</Link>.
        </div>
      )}

      <div className={`exam-layout${status === 'blocked' ? ' exam-layout--locked' : ''}`}>
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

          {status === 'in_exam' && (
            <p className="hint">
              Uji cepat: pindah tab, tekan Esc, atau{' '}
              <button
                type="button"
                className="linkish"
                onClick={() => triggerWarning('visibility')}
              >
                simulasi warning
              </button>
              .
            </p>
          )}
        </div>
      </div>

      <nav className="nav-links exam-footer-nav">
        <Link to="/login">Login</Link>
        <Link to="/admin">Admin</Link>
        <span className="muted">
          Status: <code>{status}</code>
        </span>
      </nav>

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
