import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import TrueFocus from './TrueFocus'

export default function Hero() {
  const root = useRef(null)

  useEffect(() => {
    const fades = animate(root.current.querySelectorAll('.fade'), {
      y: [20, 0],
      opacity: [0, 1],
      delay: stagger(200, { start: 600 }),
      duration: 800,
      ease: 'outExpo',
    })
    return () => fades.revert()
  }, [])

  return (
    <section
      ref={root}
      className="relative flex min-h-screen items-center px-6 md:px-16"
    >
      <div>
        <p className="fade mb-6 text-sm uppercase tracking-[0.3em] text-neutral-400 opacity-0">
          Graphic & Poster Designer
        </p>

        <h1 className="text-5xl font-bold leading-tight sm:text-7xl md:text-9xl">
          <TrueFocus sentence="hi, i am Suneja" />
        </h1>

        <p className="fade mt-8 max-w-md text-lg text-neutral-400 opacity-0">
          I design posters and visuals. Scroll down to see my work.
        </p>

        <a
          href="#cube"
          className="fade mt-8 inline-block rounded-full border border-white/30 px-6 py-3 opacity-0 transition hover:bg-white hover:text-black"
        >
          See my work ↓
        </a>
      </div>
    </section>
  )
}