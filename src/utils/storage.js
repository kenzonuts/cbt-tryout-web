const STORAGE_KEY = 'cbt-tryout-state'
const ADMIN_SESSION_KEY = 'cbt-tryout-admin'
const DEMO_TIP_KEY = 'cbt-tryout-tip-seen'

const defaultState = {
  status: 'idle',
  user: null,
  answers: {},
  currentQuestionIndex: 0,
  examEndsAt: null,
  warningEndsAt: null,
  warningReason: null,
  demoMode: true,
}

/** Pastikan warning yang sudah habis → blocked (termasuk setelah refresh). */
export function normalizeState(raw) {
  const state = { ...defaultState, ...(raw ?? {}) }

  if (typeof state.demoMode !== 'boolean') {
    state.demoMode = true
  }

  if (state.status === 'warning') {
    const expired =
      !state.warningEndsAt || Date.now() >= Number(state.warningEndsAt)
    if (expired) {
      state.status = 'blocked'
      state.warningEndsAt = null
      state.warningReason = null
    }
  }

  // Timer ujian habis saat refresh → blocked
  if (
    (state.status === 'in_exam' || state.status === 'warning') &&
    state.examEndsAt &&
    Date.now() >= Number(state.examEndsAt)
  ) {
    state.status = 'blocked'
    state.warningEndsAt = null
    state.warningReason = 'timeout'
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

export function loadAdminSession() {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function saveAdminSession(ok) {
  try {
    if (ok) sessionStorage.setItem(ADMIN_SESSION_KEY, '1')
    else sessionStorage.removeItem(ADMIN_SESSION_KEY)
  } catch {
    // ignore
  }
}

export function loadTipSeen() {
  try {
    return sessionStorage.getItem(DEMO_TIP_KEY) === '1'
  } catch {
    return false
  }
}

export function saveTipSeen() {
  try {
    sessionStorage.setItem(DEMO_TIP_KEY, '1')
  } catch {
    // ignore
  }
}

export {
  defaultState,
  STORAGE_KEY,
  ADMIN_SESSION_KEY,
  DEMO_TIP_KEY,
}
