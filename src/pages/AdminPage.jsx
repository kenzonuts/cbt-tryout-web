import { Link } from 'react-router-dom'
import { useExam } from '../context/ExamContext'

export default function AdminPage() {
  const { status, setStatus } = useExam()

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
      <div className="panel">
        <p className="muted">Buka akses penuh — diisi di Fase E.</p>
        <p>
          Status saat ini: <code>{status}</code>
        </p>
        <button type="button" className="btn" onClick={() => setStatus('in_exam')}>
          Buka Akses (placeholder)
        </button>
      </div>
    </main>
  )
}
