const STORAGE_KEY = 'cbt-tryout-state'

const defaultState = {
  status: 'idle',
  user: null,
  answers: {},
  currentQuestionIndex: 0,
  examEndsAt: null,
  warningEndsAt: null,
  warningReason: null,
}

/** Pastikan warning yang sudah habis → blocked (termasuk setelah refresh). */
export function normalizeState(raw) {
  const state = { ...defaultState, ...(raw ?? {}) }

  if (state.status === 'warning') {
    const expired =
      !state.warningEndsAt || Date.now() >= Number(state.warningEndsAt)
    if (expired) {
      state.status = 'blocked'
      state.warningEndsAt = null
      state.warningReason = null
    }
  }

  return state
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultState }
    return normalizeState(JSON.parse(raw))
  } catch {
    return { ...defaultState }
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function clearState() {
  localStorage.removeItem(STORAGE_KEY)
}

export { defaultState, STORAGE_KEY }
