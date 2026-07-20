const STORAGE_KEY = 'cbt-tryout-state'

const defaultState = {
  status: 'idle',
  user: null,
  answers: {},
  currentQuestionIndex: 0,
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultState }
    return { ...defaultState, ...JSON.parse(raw) }
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
