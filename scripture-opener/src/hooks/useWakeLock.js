import { useEffect } from 'react'

// Asks the browser to keep the screen on while we are listening, so a laptop or tablet
// does not fall asleep in the middle of the meeting. Ignored on browsers without support.
export function useWakeLock(active) {
  useEffect(() => {
    if (!active || !('wakeLock' in navigator)) return undefined
    let lock = null
    let released = false

    const request = async () => {
      try {
        lock = await navigator.wakeLock.request('screen')
      } catch {
        lock = null
      }
    }

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && !released) request()
    }

    request()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      released = true
      document.removeEventListener('visibilitychange', onVisibility)
      if (lock) lock.release().catch(() => {})
    }
  }, [active])
}
