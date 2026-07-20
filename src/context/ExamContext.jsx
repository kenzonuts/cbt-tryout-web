import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { clearState, defaultState, loadState, saveState } from '../utils/storage'

const WARNING_MS = 15_000

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
      // Jangan timpa blocked saat rehydrate login ulang di sesi yang sama
      status: user
        ? prev.status === 'blocked' || prev.status === 'warning'
          ? prev.status
          : 'logged_in'
        : 'idle',
    }))
  }

  function setAnswer(questionId, answer) {
    setState((prev) => {
      if (prev.status === 'blocked' || prev.status === 'warning') return prev
      return {
        ...prev,
        answers: { ...prev.answers, [questionId]: answer },
      }
    })
  }

  function setCurrentQuestionIndex(index) {
    setState((prev) => ({ ...prev, currentQuestionIndex: index }))
  }

  const startExamTimer = useCallback((endsAt) => {
    setState((prev) => ({ ...prev, examEndsAt: endsAt }))
  }, [])

  const triggerWarning = useCallback((reason = 'visibility') => {
    setState((prev) => {
      if (prev.status !== 'in_exam') return prev
      return {
        ...prev,
        status: 'warning',
        warningEndsAt: Date.now() + WARNING_MS,
        warningReason: reason,
      }
    })
  }, [])

  const continueExam = useCallback(() => {
    setState((prev) => ({
      ...prev,
      status: 'in_exam',
      warningEndsAt: null,
      warningReason: null,
    }))
  }, [])

  const blockExam = useCallback(() => {
    setState((prev) => {
      if (prev.status === 'blocked') return prev
      return {
        ...prev,
        status: 'blocked',
        warningEndsAt: null,
        warningReason: null,
      }
    })
  }, [])

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
    startExamTimer,
    triggerWarning,
    continueExam,
    blockExam,
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
