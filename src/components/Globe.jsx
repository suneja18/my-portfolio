import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'
import useRotation from '../hooks/useRotation'
import Face from './Face'

const COUNT = 48

const tiles = Array.from({ length: COUNT }, (_, i) => {
  const y = 1 - (2 * i) / (COUNT - 1)
  return {
    project: projects[i % projects.length],
    lat: (Math.asin(y) * 180) / Math.PI,
    lon: (i * 137.508) % 360,
  }
})

export default function Globe() {
  const stage = useRef(null)
  const rotor = useRef(null)
  const [R, setR] = useState(300)

  useEffect(() => {
    const fit = () => setR(Math.min(320, window.innerWidth * 0.42))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  useRotation(stage, rotor, { autoSpeed: 0.18, minX: -55, maxX: 55 })

  const w = R * 0.36
  const h = R * 0.48

  return (
    <section id="globe" className="overflow-x-clip px-6 py-24 md:px-16">
      <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
        Showcase
      </p>
      <h2 className="mt-2 text-4xl font-bold md:text-6xl">Spin through my work</h2>
      <p className="mt-3 text-neutral-400">Drag the globe to rotate it.</p>

      <div
        ref={stage}
        className="mt-10 flex cursor-grab items-center justify-center active:cursor-grabbing"
        style={{
          height: R * 2 + 100,
          perspective: 1400,
          touchAction: 'pan-y',
        }}
      >
        <div
          ref={rotor}
          style={{
            position: 'relative',
            width: 0,
            height: 0,
            transformStyle: 'preserve-3d',
          }}
        >
          {tiles.map((t, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: w,
                height: h,
                left: -w / 2,
                top: -h / 2,
                backfaceVisibility: 'hidden',
                transform: `rotateY(${t.lon}deg) rotateX(${t.lat}deg) translateZ(${R}px)`,
              }}
            >
              <Face project={t.project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}