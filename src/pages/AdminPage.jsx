import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useExam } from '../context/ExamContext'
import { ADMIN_CREDENTIALS, dummyQuestions } from '../data/dummyQuestions'
import {
  STORAGE_KEY,
  loadAdminSession,
  saveAdminSession,
} from '../utils/storage'

export default function AdminPage() {
  const {
    status,
    user,
    answers,
    currentQuestionIndex,
    warningReason,
    demoMode,
    unlockExam,
    resetExam,
    setDemoMode,
  } = useExam()

  const [authed, setAuthed] = useState(() => loadAdminSession())
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const answeredCount = Object.keys(answers ?? {}).length
  const isBlocked = status === 'blocked'
  const isWarning = status === 'warning'

  function handleLogin(e) {
    e.preventDefault()
    setError('')
    const u = username.trim()
    if (
      u !== ADMIN_CREDENTIALS.username ||
      password !== ADMIN_CREDENTIALS.password
    ) {
      setError('Username atau password admin salah.')
      return
    }
    saveAdminSession(true)
    setAuthed(true)
  }

  function handleLogout() {
    saveAdminSession(false)
    setAuthed(false)
    setUsername('')
    setPassword('')
  }

  if (!authed) {
    return (
      <main className="page page--center">
        <div className="panel panel--narrow">
          <p className="eyebrow">CBT Tryout</p>
          <h1>Admin</h1>
          <p className="muted">
            Masuk dengan akun admin demo untuk membuka blokir peserta.
          </p>

          <form className="form" onSubmit={handleLogin} noValidate>
            <label className="field">
              <span>Username</span>
              <input
                type="text"
                name="admin-username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
              />
            </label>
            <label className="field">
              <span>Password</span>
              <input
                type="password"
                name="admin-password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </label>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button type="submit" className="btn btn--block">
              Masuk Admin
            </button>
          </form>

          <p className="hint">
            Demo: <code>admin</code> / <code>admin123</code>
          </p>
          <nav className="nav-links">
            <Link to="/">Beranda</Link>
            <Link to="/login">Login peserta</Link>
          </nav>
        </div>
      </main>
    )
  }

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">CBT Tryout</p>
          <h1>Admin</h1>
        </div>
        <nav className="nav-links">
          <Link to="/">Beranda</Link>
          <Link to="/login">Login</Link>
          <Link to="/ujian">Ujian</Link>
          <button type="button" className="linkish" onClick={handleLogout}>
            Keluar admin
          </button>
        </nav>
      </header>

      <div className="panel admin-panel">
        <p className="muted">
          Pantau status peserta dari <code>localStorage</code> dan buka blokir
          untuk demo. PIN admin hanya proteksi sederhana di sesi browser.
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
            <dt>Lab demo</dt>
            <dd>
              <code>{demoMode ? 'ON' : 'OFF'}</code>
            </dd>
          </div>
          <div>
            <dt>Storage</dt>
            <dd>
              <code>{STORAGE_KEY}</code>
            </dd>
          </div>
        </dl>

        {isBlocked && (
          <div className="banner banner--blocked" role="status">
            Peserta sedang <strong>blocked</strong>
            {warningReason === 'timeout' ? ' (waktu habis)' : ''}. Klik Buka
            Akses agar bisa lanjut ujian.
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
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setDemoMode(!demoMode)}
          >
            Lab demo: {demoMode ? 'ON' : 'OFF'}
          </button>
        </div>

        {status === 'in_exam' && (
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
