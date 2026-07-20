import { Link } from 'react-router-dom'
import { useExam } from '../context/ExamContext'
import { dummyQuestions } from '../data/dummyQuestions'
import { STORAGE_KEY } from '../utils/storage'

export default function AdminPage() {
  const {
    status,
    user,
    answers,
    currentQuestionIndex,
    warningReason,
    unlockExam,
    resetExam,
  } = useExam()

  const answeredCount = Object.keys(answers ?? {}).length
  const isBlocked = status === 'blocked'
  const isWarning = status === 'warning'
  const canUnlock = isBlocked || isWarning || status === 'in_exam'

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">CBT Tryout</p>
          <h1>Admin</h1>
        </div>
        <nav className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/ujian">Ujian</Link>
        </nav>
      </header>

      <div className="panel admin-panel">
        <p className="muted">
          Pantau status peserta dari <code>localStorage</code> dan buka blokir
          untuk demo.
        </p>

        <dl className="meta admin-meta">
          <div>
            <dt>Status</dt>
            <dd>
              <code className={`status-pill status-pill--${status}`}>
                {status}
              </code>
            </dd>
          </div>
          <div>
            <dt>Peserta</dt>
            <dd>
              <code>{user?.username ?? '— belum login'}</code>
            </dd>
          </div>
          <div>
            <dt>Jawaban</dt>
            <dd>
              <code>
                {answeredCount} / {dummyQuestions.length}
              </code>
            </dd>
          </div>
          <div>
            <dt>Soal aktif</dt>
            <dd>
              <code>{(currentQuestionIndex ?? 0) + 1}</code>
            </dd>
          </div>
          {warningReason && (
            <div>
              <dt>Alasan</dt>
              <dd>
                <code>{warningReason}</code>
              </dd>
            </div>
          )}
          <div>
            <dt>Storage</dt>
            <dd>
              <code>{STORAGE_KEY}</code>
            </dd>
          </div>
        </dl>

        {isBlocked && (
          <div className="banner banner--blocked" role="status">
            Peserta sedang <strong>blocked</strong>. Klik Buka Akses agar bisa
            lanjut ujian.
          </div>
        )}

        {isWarning && (
          <div className="banner banner--warn" role="status">
            Peserta sedang dalam <strong>warning</strong>. Buka Akses akan
            mengembalikan ke <code>in_exam</code>.
          </div>
        )}

        <div className="admin-actions">
          <button
            type="button"
            className="btn"
            onClick={unlockExam}
            disabled={!user && status === 'idle'}
          >
            Buka Akses
          </button>
          <button type="button" className="btn btn--ghost" onClick={resetExam}>
            Reset Demo
          </button>
        </div>

        {canUnlock && status === 'in_exam' && (
          <p className="hint">Status sudah <code>in_exam</code> — akses aktif.</p>
        )}

        <nav className="nav-links admin-quick">
          <Link to="/login">← Login</Link>
          <Link to="/ujian">Ke Ujian →</Link>
        </nav>
      </div>
    </main>
  )
}
