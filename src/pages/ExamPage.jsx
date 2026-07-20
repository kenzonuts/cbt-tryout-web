import { Link } from 'react-router-dom'
import { useExam } from '../context/ExamContext'
import { dummyQuestions } from '../data/dummyQuestions'

export default function ExamPage() {
  const { status, user } = useExam()

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">CBT Tryout</p>
          <h1>Halaman Ujian</h1>
        </div>
        <nav className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </header>
      <div className="panel">
        <p className="muted">
          UI soal & navigasi — diisi di Fase C. Guard — Fase D.
        </p>
        <dl className="meta">
          <div>
            <dt>Status</dt>
            <dd>
              <code>{status}</code>
            </dd>
          </div>
          <div>
            <dt>User</dt>
            <dd>
              <code>{user?.username ?? '—'}</code>
            </dd>
          </div>
          <div>
            <dt>Soal</dt>
            <dd>
              <code>{dummyQuestions.length} siap</code>
            </dd>
          </div>
        </dl>
        {!user && (
          <p className="form-error">
            Belum login. <Link to="/login">Masuk dulu</Link>
          </p>
        )}
      </div>
    </main>
  )
}
