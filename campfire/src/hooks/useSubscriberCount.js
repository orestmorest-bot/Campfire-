import { useEffect, useState } from 'react';

export function useSubscriberCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/subscriber-count')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (!cancelled && data) setCount(data.count); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return count;
}
