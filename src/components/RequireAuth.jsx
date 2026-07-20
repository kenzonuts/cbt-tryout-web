import { Navigate } from 'react-router-dom'
import { useExam } from '../context/ExamContext'

/** Redirect ke /login jika belum ada user di state/localStorage. */
export default function RequireAuth({ children }) {
  const { user } = useExam()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: 'ujian' }} />
  }

  return children
}
