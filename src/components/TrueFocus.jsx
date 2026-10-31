import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function TrueFocus({
  sentence = 'True Focus',
  blurAmount = 5,
  borderColor = '#ffffff',
  glowColor = 'rgba(255, 255, 255, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}) {
  const words = sentence.split(' ')
  const [current, setCurrent] = useState(0)
  const containerRef = useRef(null)
  const wordRefs = useRef([])
  const [rect, setRect] = useState({ x: 0, y: 0, width: 0, height: 0 })

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((p) => (p + 1) % words.length),
      (animationDuration + pauseBetweenAnimations) * 1000
    )
    return () => clearInterval(id)
  }, [words.length, animationDuration, pauseBetweenAnimations])

  useEffect(() => {
    const measure = () => {
      const el = wordRefs.current[current]
      const box = containerRef.current
      if (!el || !box) return
      const p = box.getBoundingClientRect()
      const r = el.getBoundingClientRect()
      setRect({
        x: r.left - p.left,
        y: r.top - p.top,
        width: r.width,
        height: r.height,
      })
    }
    measure()
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [current, sentence])

  return (
    <span className="focus-container" ref={containerRef}>
      {words.map((word, i) => (
        <span
          key={i}
          ref={(el) => (wordRefs.current[i] = el)}
          className="focus-word"
          style={{
            filter: i === current ? 'blur(0px)' : `blur(${blurAmount}px)`,
            transition: `filter ${animationDuration}s ease`,
          }}
        >
          {word}
        </span>
      ))}

      <motion.span
        className="focus-frame"
        initial={false}
        animate={{
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          opacity: rect.width > 0 ? 1 : 0,
        }}
        transition={{ duration: animationDuration }}
        style={{ '--border-color': borderColor, '--glow-color': glowColor }}
      >
        <span className="corner top-left" />
        <span className="corner top-right" />
        <span className="corner bottom-left" />
        <span className="corner bottom-right" />
      </motion.span>
    </span>
  )
}