import { useEffect, useRef } from 'react'

const TEXT_TARGETS = 'h2, h3, p'
const BOX_TARGETS = 'a, button, .card, [data-focus]'

export default function FocusCursor() {
  const frame = useRef(null)

  useEffect(() => {
    // only on devices with a mouse
    if (!window.matchMedia('(hover: hover)').matches) return

    const el = frame.current
    const cur = { x: 0, y: 0, w: 0, h: 0, o: 0 }
    let target = null
    let mouse = { x: -1, y: -1 }
    let raf

    const pick = () => {
      const hit = document.elementFromPoint(mouse.x, mouse.y)
      target = hit ? hit.closest(`${BOX_TARGETS}, ${TEXT_TARGETS}`) : null
    }

    const rectOf = (node) => {
      if (node.matches(TEXT_TARGETS)) {
        const range = document.createRange()
        range.selectNodeContents(node)
        return range.getBoundingClientRect()
      }
      return node.getBoundingClientRect()
    }

    const onMove = (e) => {
      mouse = { x: e.clientX, y: e.clientY }
      pick()
    }
    const onLeave = () => {
      target = null
    }

    const tick = () => {
      let tx = cur.x
      let ty = cur.y
      let tw = cur.w
      let th = cur.h
      let to = 0

      if (target && target.isConnected) {
        const r = rectOf(target)
        tx = r.left
        ty = r.top
        tw = r.width
        th = r.height
        to = 1
        if (cur.o < 0.05) {
          cur.x = tx
          cur.y = ty
          cur.w = tw
          cur.h = th
        }
      }

      cur.x += (tx - cur.x) * 0.22
      cur.y += (ty - cur.y) * 0.22
      cur.w += (tw - cur.w) * 0.22
      cur.h += (th - cur.h) * 0.22
      cur.o += (to - cur.o) * 0.2

      el.style.transform = `translate(${cur.x}px, ${cur.y}px)`
      el.style.width = `${cur.w}px`
      el.style.height = `${cur.h}px`
      el.style.opacity = cur.o

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('pointermove', onMove)
    window.addEventListener('scroll', pick, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', pick)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div ref={frame} className="focus-frame cursor-frame">
      <span className="corner top-left" />
      <span className="corner top-right" />
      <span className="corner bottom-left" />
      <span className="corner bottom-right" />
    </div>
  )
}