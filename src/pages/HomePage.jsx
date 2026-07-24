import { Link } from 'react-router-dom'

const STEPS = [
  {
    n: '1',
    title: 'Login',
    desc: 'Masuk sebagai peserta demo (peserta / 1234).',
    to: '/login',
    cta: 'Ke Login',
  },
  {
    n: '2',
    title: 'Ujian',
    desc: 'Jawab soal, lalu uji pindah tab / Esc — muncul warning 15 detik.',
    to: '/ujian',
    cta: 'Ke Ujian',
  },
  {
    n: '3',
    title: 'Admin',
    desc: 'Buka blokir peserta dengan akun admin demo.',
    to: '/admin',
    cta: 'Ke Admin',
  },
]

export default function HomePage() {
  return (
    <main className="page page--home">
      <header className="home-hero">
        <p className="eyebrow">CBT Tryout</p>
        <h1>Uji deteksi fokus peserta</h1>
        <p className="home-hero__lead">
          Prototype FE-only untuk mengecek apakah deteksi keluar fokus di
          browser layak dipakai di skenario CBT. Bukan sistem ujian production.
        </p>
        <div className="home-hero__actions">
          <Link className="btn" to="/login">
            Mulai demo
          </Link>
          <Link className="btn btn--ghost" to="/admin">
            Admin
          </Link>
        </div>
      </header>

      <ol className="home-steps">
        {STEPS.map((step) => (
          <li key={step.n} className="home-step panel">
            <span className="home-step__n">{step.n}</span>
            <div>
              <h2 className="home-step__title">{step.title}</h2>
              <p className="muted">{step.desc}</p>
              <Link to={step.to}>{step.cta} →</Link>
            </div>
          </li>
        ))}
      </ol>

      <p className="hint home-footnote">
        Detail uji & batasan: lihat README di repo. Status hanya di browser ini
        (<code>localStorage</code>).
      </p>
    </main>
  )
}
