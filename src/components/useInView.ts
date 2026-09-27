import { useEffect, useRef, useState } from 'react'

// True while the element is on screen; used to pause offscreen WebGL canvases.
export default function useInView<T extends Element>(margin = '100px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: margin })
    io.observe(el)
    return () => io.disconnect()
  }, [margin])
  return [ref, inView] as const
}
