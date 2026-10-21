import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

const NAME = 'passiveoutput'

export default function Hero() {
  const root = useRef(null)

  useEffect(() => {
    const letters = animate(root.current.querySelectorAll('.letter'), {
      y: [80, 0],
      opacity: [0, 1],
      delay: stagger(50),
      duration: 900,
      ease: 'outExpo',
    })

    const sub = animate(root.current.querySelectorAll('.fade'), {
      y: [20, 0],
      opacity: [0, 1],
      delay: stagger(200, { start: 700 }),
      duration: 800,
      ease: 'outExpo',
    })

    const blobs = animate(root.current.querySelectorAll('.blob'), {
      y: [-25, 25],
      x: [-15, 15],
      duration: 3500,
      alternate: true,
      loop: true,
      ease: 'inOutSine',
      delay: stagger(500),
    })

    return () => {
      letters.revert()
      sub.revert()
      blobs.revert()
    }
  }, [])

  return (
    <section
      ref={root}
      className="relative flex min-h-screen items-center overflow-hidden px-6 md:px-16"
    >
      <div className="blob absolute right-10 top-24 h-64 w-64 rounded-full bg-fuchsia-600/30 blur-3xl" />
      <div className="blob absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-indigo-600/30 blur-3xl" />
      <div className="blob absolute right-1/4 bottom-10 h-40 w-40 rounded-full bg-orange-500/30 blur-3xl" />

      <div className="relative z-10">
        <p className="fade mb-4 text-sm uppercase tracking-[0.3em] text-neutral-400 opacity-0">
          Graphic & Poster Designer
        </p>

        <h1 className="text-6xl font-bold leading-none md:text-9xl">
          {NAME.split(' ').map((word, i) => (
            <span key={i} className="mr-4 inline-block whitespace-nowrap">
              {word.split('').map((ch, j) => (
                <span key={j} className="letter inline-block opacity-0">
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className="fade mt-6 max-w-md text-lg text-neutral-400 opacity-0">
          I design posters and visuals. Scroll down to see my work.
        </p>

        <a
          href="#work"
          className="fade mt-8 inline-block rounded-full border border-white/30 px-6 py-3 opacity-0 transition hover:bg-white hover:text-black"
        >
          View my work ↓
        </a>
      </div>
    </section>
  )
}