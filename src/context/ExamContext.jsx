import { createContext, useContext, useEffect, useState } from 'react'
import { clearState, defaultState, loadState, saveState } from '../utils/storage'

const ExamContext = createContext(null)

export function ExamProvider({ children }) {
  const [state, setState] = useState(() => loadState())

  useEffect(() => {
    saveState(state)
  }, [state])

  function setStatus(status) {
    setState((prev) => ({ ...prev, status }))
  }

  function setUser(user) {
    setState((prev) => ({
      ...prev,
      user,
      status: user ? 'logged_in' : 'idle',
    }))
  }

  function setAnswer(questionId, answer) {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
    }))
  }

  function setCurrentQuestionIndex(index) {
    setState((prev) => ({ ...prev, currentQuestionIndex: index }))
  }

  function resetExam() {
    setState({ ...defaultState })
    clearState()
  }

  const value = {
    ...state,
    setStatus,
    setUser,
    setAnswer,
    setCurrentQuestionIndex,
    resetExam,
  }

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>
}

export function useExam() {
  const ctx = useContext(ExamContext)
  if (!ctx) {
    throw new Error('useExam harus dipakai di dalam ExamProvider')
  }
  return ctx
}
