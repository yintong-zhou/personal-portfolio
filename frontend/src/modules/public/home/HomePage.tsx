import { useProjects } from '../../../shared/api/queries'
import { ButtonLink } from '../../../shared/components/ButtonLink'
import { Container } from '../../../shared/components/Container'
import { texts } from '../../../shared/texts'
import { ProjectGrid } from '../projects/ProjectsPage'
import { HomeHero } from './hero/HomeHero'
import { StackDiagram } from './StackDiagram'

export function HomePage() {
  const projects = useProjects().data ?? []

  return (
    <>
      <title>{`${texts.owner.name} · ${texts.owner.role}`}</title>
      <HomeHero />
      <section className="bg-background py-8 sm:pb-12">
        <Container>
          <h2 className="type-h2">{texts.home.stackTitle}</h2>
          <div className="mt-6 sm:mt-8">
            <StackDiagram />
          </div>
        </Container>
      </section>

      {projects.length > 0 && (
        <section className="bg-muted py-12 sm:py-16">
          <Container>
            <h2 className="type-h2 mb-8 sm:mb-12">{texts.home.previewTitle}</h2>
            <ProjectGrid projects={projects.slice(0, 3)} tone="card" />
            <ButtonLink to="/projects" variant="secondary" className="mt-8 sm:mt-12">
              {texts.home.previewAll}
            </ButtonLink>
          </Container>
        </section>
      )}
    </>
  )
}
