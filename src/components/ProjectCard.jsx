import { motion } from 'framer-motion'

export default function ProjectCard({ project }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="card cursor-pointer overflow-hidden rounded-2xl bg-neutral-900 opacity-0"
    >
      <div className="aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900">
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex items-center justify-between p-4">
        <h3 className="font-medium">{project.title}</h3>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
          {project.tag}
        </span>
      </div>
    </motion.div>
  )
}