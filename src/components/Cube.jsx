import { useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import { projects } from '../data/projects'
import useRotation from '../hooks/useRotation'
import Face from './Face'

const FACES = [
  { t: 'rotateY(0deg)', rx: 0, ry: 0 },
  { t: 'rotateY(90deg)', rx: 0, ry: -90 },
  { t: 'rotateY(180deg)', rx: 0, ry: -180 },
  { t: 'rotateY(-90deg)', rx: 0, ry: 90 },
  { t: 'rotateX(90deg)', rx: -90, ry: 0 },
  { t: 'rotateX(-90deg)', rx: 90, ry: 0 },
]

function frontFace(rxRaw, ryRaw) {
  const ry = (((ryRaw % 360) + 540) % 360) - 180
  const rx = (((rxRaw % 360) + 540) % 360) - 180
  if (rx < -45 && rx > -135) return 4
  if (rx > 45 && rx < 135) return 5
  if (ry > -45 && ry <= 45) return 0
  if (ry > -135 && ry <= -45) return 1
  if (ry > 45 && ry <= 135) return 3
  return 2
}

export default function Cube() {
  const stage = useRef(null)
  const rotor = useRef(null)
  const anim = useRef(null)
  const [size, setSize] = useState(320)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const fit = () => setSize(Math.max(220, Math.min(380, window.innerWidth * 0.6)))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  const state = useRotation(stage, rotor, {
    autoSpeed: 0.2,
    minX: -100000,
    maxX: 100000,
    startX: -15,
    idleMs: 5000,
    onFrame: (st) => {
      const idx = frontFace(st.rx, st.ry)
      setActive((prev) => (prev === idx ? prev : idx))
    },
  })

  const stopAnim = () => {
    anim.current?.pause()
    state.current.busy = false
  }

  const go = (i) => {
    const st = state.current
    const f = FACES[i]
    const ry = f.ry + 360 * Math.round((st.ry - f.ry) / 360)
    stopAnim()
    st.busy = true
    st.vx = 0
    st.vy = 0
    anim.current = animate(st, {
      rx: f.rx,
      ry,
      duration: 1100,
      ease: 'inOutExpo',
      onComplete: () => {
        st.busy = false
        st.last = performance.now()
      },
    })
  }

  const current = projects[active % projects.length]

  return (
    <section id="cube" className="overflow-x-clip px-6 py-24 md:px-16">
      <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">Viewer</p>
      <h2 className="mt-2 text-4xl font-bold md:text-6xl">View each design</h2>
      <p className="mt-3 text-neutral-400">
        Drag the cube, or pick a number.
      </p>

      <div
        ref={stage}
        onPointerDown={stopAnim}
        className="mt-10 flex cursor-grab items-center justify-center active:cursor-grabbing"
        style={{ height: size + 140, perspective: 1200, touchAction: 'pan-y' }}
      >
        <div
          ref={rotor}
          style={{
            position: 'relative',
            width: size,
            height: size,
            transformStyle: 'preserve-3d',
          }}
        >
          {FACES.map((f, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: 0,
                backfaceVisibility: 'hidden',
                transform: `${f.t} translateZ(${size / 2}px)`,
              }}
            >
              <Face project={projects[i % projects.length]} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-4">
        <p className="text-lg">
          <span className="text-neutral-500">
            {String(active + 1).padStart(2, '0')} / 06
          </span>{' '}
          {current.title} · <span className="text-neutral-400">{current.tag}</span>
        </p>
        <div className="flex gap-2">
          {FACES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-10 w-10 rounded-full border text-sm transition ${
                active === i
                  ? 'border-white bg-white text-black'
                  : 'border-white/30 hover:bg-white/10'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}