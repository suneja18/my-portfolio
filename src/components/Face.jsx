const HUES = [320, 250, 20, 160, 200, 45]

export default function Face({ project }) {
  const h = HUES[project.id % HUES.length]
  return (
    <div
      className="h-full w-full overflow-hidden rounded-lg"
      style={{
        background: `linear-gradient(135deg, hsl(${h} 70% 45%), hsl(${(h + 60) % 360} 70% 25%))`,
      }}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          draggable={false}
          className="h-full w-full select-none object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-end p-2 text-xs font-medium text-white/90">
          {project.title}
        </div>
      )}
    </div>
  )
}