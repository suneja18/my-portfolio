import FocusCursor from './components/FocusCursor'
import Hero from './components/Hero'
import Cube from './components/Cube'
import Work from './components/Work'

export default function App() {
  return (
    <>
      <FocusCursor />

      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-5 mix-blend-difference md:px-16">
        <a href="#" className="font-bold">S.</a>
        <div className="flex gap-6 text-sm">
          <a href="#cube">Viewer</a>
          <a href="#work">All work</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <Hero />
      <Cube />
      <Work />

      <footer id="contact" className="px-6 py-24 md:px-16">
        <h2 className="text-4xl font-bold md:text-6xl">Let's work together</h2>

        <a
          href="mailto:perryplatypus098234@gmail.com"
          className="mt-6 inline-block text-xl text-neutral-400 underline"
        >
          perryplatypus098234@gmail.com
        </a>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="https://www.instagram.com/passiveoutput/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/30 px-6 py-3 transition hover:bg-white hover:text-black"
          >
            Instagram ↗
          </a>
          <a
            href="https://www.pinterest.com/passiveoutput/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/30 px-6 py-3 transition hover:bg-white hover:text-black"
          >
            Pinterest ↗
          </a>
        </div>
      </footer>
    </>
  )
}