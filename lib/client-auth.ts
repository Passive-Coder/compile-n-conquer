export type ClientAuthSession = {
  token?: string | null
  userId?: string | null
  userName?: string | null
}

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null
  return window.sessionStorage.getItem("cnc.token")
}

export const getAuthHeaders = (): Record<string, string> => {
  const token = getAuthToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const cacheAuthSession = ({ token, userId, userName }: ClientAuthSession) => {
  if (typeof window === "undefined") return
  if (token) {
    window.sessionStorage.setItem("cnc.token", token)
  }
  if (userId) {
    window.sessionStorage.setItem("cnc.userId", userId)
    window.localStorage.setItem("cnc.userId", userId)
  }
  if (userName) {
    window.sessionStorage.setItem("cnc.userName", userName)
    window.localStorage.setItem("cnc.userName", userName)
  }
}

export const getCachedUserId = (): string | null => {
  if (typeof window === "undefined") return null
  return (
    window.sessionStorage.getItem("cnc.userId") ||
    window.localStorage.getItem("cnc.userId")
  )
}

export const getCachedUserName = (): string | null => {
  if (typeof window === "undefined") return null
  return (
    window.sessionStorage.getItem("cnc.userName") ||
    window.localStorage.getItem("cnc.userName")
  )
}
