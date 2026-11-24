import { ArrowUpRight } from 'lucide-react'
import { useId, useState, type PointerEvent } from 'react'
import type { Project } from '../../../shared/api/types'
import { Tag } from '../../../shared/components/Tag'
import { prefersReducedMotion } from '../../../shared/motion'
import { texts } from '../../../shared/texts'

// Mouse only: the light follows the pointer across the tile. Reduced motion keeps the centred tint.
function trackSpotlight(event: PointerEvent<HTMLAnchorElement>) {
  if (event.pointerType !== 'mouse' || prefersReducedMotion()) return
  const box = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--spot-x', `${event.clientX - box.left}px`)
  event.currentTarget.style.setProperty('--spot-y', `${event.clientY - box.top}px`)
}

// Both the logo and the title fallback are decorative: the card's heading already names the project.
function ProjectLogo({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      data-cover
      className="type-label flex aspect-video w-full items-center justify-center bg-foreground/6 p-4 text-center wrap-anywhere text-muted-foreground"
    >
      {project.logoUrl && !failed ? (
        <img src={project.logoUrl} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)} className="h-16 max-w-[60%] object-contain" />
      ) : (
        <span aria-hidden="true">{project.title}</span>
      )}
    </div>
  )
}

export function ProjectCard({
  project,
  tone = 'muted',
  horizontal = false,
  heading: Heading = 'h3',
}: {
  project: Project
  tone?: 'muted' | 'card'
  horizontal?: boolean
  heading?: 'h2' | 'h3'
}) {
  const titleId = useId()
  // Cards always open the repository; without one, show a plain tile.
  const href = project.repoUrl
  const className = `grid h-full min-w-0 content-start rounded-lg p-2 text-card-foreground ${tone === 'card' ? 'bg-card' : 'bg-muted'} ${horizontal ? 'lg:grid-cols-12 lg:gap-6' : ''}`
  const content = (
    <>
      <div className={`min-w-0 self-start overflow-hidden rounded-md ${horizontal ? 'lg:col-span-4' : ''}`}>
        <ProjectLogo key={project.logoUrl} project={project} />
      </div>
      <div className={`min-w-0 p-4 ${horizontal ? 'lg:col-span-8 lg:pl-0' : ''}`}>
        <div className="flex items-baseline justify-between gap-3">
          <Heading id={titleId} className="type-h3 wrap-anywhere">{project.title}</Heading>
          {href && <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" className="shrink-0 self-start text-secondary" />}
          {href && <span id={`${titleId}-external`} className="sr-only">{texts.projects.newTab}</span>}
        </div>
        {project.summary && <p className="type-body mt-2 max-w-[62ch] text-muted-foreground">{project.summary}</p>}
        {project.technologies.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </ul>
        )}
      </div>
    </>
  )

  return (
    <article className="h-full">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-labelledby={`${titleId} ${titleId}-external`}
          className={`tile-hover ${className}`}
          onPointerMove={trackSpotlight}
        >
          {content}
        </a>
      ) : (
        <div className={className}>{content}</div>
      )}
    </article>
  )
}
