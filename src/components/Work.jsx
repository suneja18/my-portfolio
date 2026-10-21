import { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

export default function Work() {
  const grid = useRef(null)

  useEffect(() => {
    const cards = grid.current.querySelectorAll('.card')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target, {
              opacity: [0, 1],
              y: [60, 0],
              duration: 900,
              ease: 'outExpo',
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    cards.forEach((c) => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="work" className="px-6 py-24 md:px-16">
      <h2 className="mb-12 text-4xl font-bold md:text-6xl">Selected Work</h2>
      <div
        ref={grid}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  )
}