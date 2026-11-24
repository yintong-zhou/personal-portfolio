import type { CSSProperties } from 'react'
import type { Project } from '../../../shared/api/types'
import { useProjects } from '../../../shared/api/queries'
import { Container } from '../../../shared/components/Container'
import { QueryBoundary } from '../../../shared/components/QueryBoundary'
import { texts } from '../../../shared/texts'
import { ProjectCard } from './ProjectCard'
import { projectGridLayout } from './projectGridLayout'

export function ProjectGrid({ projects, tone = 'muted', heading = 'h3', entrance = false }: {
  projects: Project[]
  tone?: 'muted' | 'card'
  heading?: 'h2' | 'h3'
  // Tiles rise one after another on load (capped, so a long list does not wait). Off where the grid sits below the fold.
  entrance?: boolean
}) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-12">
      {projects.map((project, index) => {
        const layout = projectGridLayout(projects.length, index)
        return (
          <li
            key={project.slug}
            className={`min-w-0 ${entrance ? 'enter' : ''} ${layout.tabletSpan === 2 ? 'sm:col-span-2' : 'sm:col-span-1'} ${layout.desktopSpan === 6 ? 'lg:col-span-12' : layout.desktopSpan === 3 ? 'lg:col-span-6' : 'lg:col-span-4'}`}
            style={entrance ? ({ '--enter-i': Math.min(index, 5) + 1 } as CSSProperties) : undefined}
          >
            <ProjectCard project={project} tone={tone} horizontal={layout.horizontal} heading={heading} />
          </li>
        )
      })}
    </ul>
  )
}

export function ProjectsPage() {
  return (
    <section className="page-pad">
      <Container>
        <title>{`${texts.projects.title} · ${texts.owner.name}`}</title>
        <h1 className="type-h1 enter mb-8 sm:mb-12">{texts.projects.title}</h1>
        <QueryBoundary query={useProjects()} emptyText={texts.projects.empty}>
          {(projects) => <ProjectGrid projects={projects} heading="h2" entrance />}
        </QueryBoundary>
      </Container>
    </section>
  )
}
