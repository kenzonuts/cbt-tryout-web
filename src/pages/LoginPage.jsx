import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useExam } from '../context/ExamContext'
import { DUMMY_CREDENTIALS } from '../data/dummyQuestions'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setUser, status, user } = useExam()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const fromGuard = location.state?.from === 'ujian'

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const u = username.trim()
    const p = password

    if (!u || !p) {
      setError('Username dan password wajib diisi.')
      return
    }

    if (
      u !== DUMMY_CREDENTIALS.username ||
      p !== DUMMY_CREDENTIALS.password
    ) {
      setError('Username atau password salah.')
      return
    }

    setUser({ username: u, name: 'Peserta Tryout' })
    navigate('/ujian', { replace: true })
  }

  return (
    <main className="page page--center">
      <div className="panel panel--narrow">
        <p className="eyebrow">CBT Tryout</p>
        <h1>Login</h1>
        <p className="muted">Masuk dengan akun contoh untuk uji coba.</p>

        {fromGuard && !user && (
          <p className="form-error" role="status">
            Masuk dulu untuk membuka halaman ujian.
          </p>
        )}

        {user && (
          <p className="hint">
            Sudah login sebagai <code>{user.username}</code> (
            <code>{status}</code>).{' '}
            <Link to="/ujian">Lanjut ke ujian</Link>
          </p>
        )}

        <form className="form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>Username</span>
            <input
              type="text"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="peserta"
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••"
            />
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button type="submit" className="btn btn--block">
            Masuk
          </button>
        </form>

        <p className="hint">
          Akun demo: <code>peserta</code> / <code>1234</code>
        </p>

        <nav className="nav-links">
          <Link to="/">Beranda</Link>
          <Link to="/admin">Ke Admin</Link>
        </nav>
      </div>
    </main>
  )
}
