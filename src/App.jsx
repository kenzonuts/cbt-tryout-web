import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import { ExamProvider } from './context/ExamContext'
import AdminPage from './pages/AdminPage'
import ExamPage from './pages/ExamPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

export default function App() {
  return (
    <ExamProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/ujian"
            element={
              <RequireAuth>
                <ExamPage />
              </RequireAuth>
            }
          />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ExamProvider>
  )
}
