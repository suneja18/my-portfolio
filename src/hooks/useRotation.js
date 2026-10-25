import { useEffect, useRef } from 'react'

export default function useRotation(stageRef, rotorRef, opts = {}) {
  const {
    autoSpeed = 0.15,
    minX = -90,
    maxX = 90,
    startX = -12,
    idleMs = 2000,
    onFrame,
  } = opts

  const cb = useRef(onFrame)
  cb.current = onFrame

  const s = useRef({
    rx: startX, ry: 0, vx: 0, vy: 0,
    dragging: false, busy: false,
    lastX: 0, lastY: 0, last: 0,
  })

  useEffect(() => {
    const stage = stageRef.current
    const rotor = rotorRef.current
    const st = s.current
    let raf
    let visible = true

    const down = (e) => {
      st.dragging = true
      st.lastX = e.clientX
      st.lastY = e.clientY
      st.vx = 0
      st.vy = 0
      st.last = performance.now()
      stage.setPointerCapture(e.pointerId)
    }
    const move = (e) => {
      if (!st.dragging) return
      const dx = e.clientX - st.lastX
      const dy = e.clientY - st.lastY
      st.lastX = e.clientX
      st.lastY = e.clientY
      st.vy = dx * 0.35
      st.vx = -dy * 0.35
      st.ry += st.vy
      st.rx = Math.max(minX, Math.min(maxX, st.rx + st.vx))
      st.last = performance.now()
    }
    const up = () => {
      st.dragging = false
      st.last = performance.now()
    }

    stage.addEventListener('pointerdown', down)
    stage.addEventListener('pointermove', move)
    stage.addEventListener('pointerup', up)
    stage.addEventListener('pointercancel', up)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(stage)

    const tick = () => {
      if (visible) {
        const now = performance.now()
        if (!st.dragging && !st.busy) {
          st.ry += st.vy
          st.rx = Math.max(minX, Math.min(maxX, st.rx + st.vx))
          st.vy *= 0.95
          st.vx *= 0.95
          if (Math.abs(st.vy) < 0.01) st.vy = 0
          if (Math.abs(st.vx) < 0.01) st.vx = 0
          if (now - st.last > idleMs) st.ry += autoSpeed
        }
        rotor.style.transform = `rotateX(${st.rx}deg) rotateY(${st.ry}deg)`
        cb.current?.(st)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      stage.removeEventListener('pointerdown', down)
      stage.removeEventListener('pointermove', move)
      stage.removeEventListener('pointerup', up)
      stage.removeEventListener('pointercancel', up)
    }
  }, [])

  return s
}