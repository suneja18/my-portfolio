import Hero from './components/Hero'
import Work from './components/Work'

export default function App() {
  return (
    <>
      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-5 mix-blend-difference md:px-16">
        <a href="#" className="font-bold">YN.</a>
        <div className="flex gap-6 text-sm">
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <Hero />
      <Work />

      <footer id="contact" className="px-6 py-24 md:px-16">
        <h2 className="text-4xl font-bold md:text-6xl">Let's work together</h2>
        <a
          href="mailto:perryplatypus098234@gmail.com"
          className="mt-6 inline-block text-xl text-neutral-400 underline"
        >
          perryplatypus098234@gmail.com
        </a>
      </footer>
    </>
  )
}