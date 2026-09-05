import { useEffect, useState } from 'react'

// Keeps a piece of state saved in the browser so settings survive a page reload.
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw === null) return defaultValue
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return { ...defaultValue, ...parsed }
      return parsed
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage may be unavailable (private mode); settings then last for this visit only
    }
  }, [key, value])

  return [value, setValue]
}
