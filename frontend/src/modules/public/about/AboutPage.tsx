import { motion, useScroll } from 'motion/react'
import { useRef, type CSSProperties } from 'react'
import { useExperiences } from '../../../shared/api/queries'
import type { Experience } from '../../../shared/api/types'
import { Container } from '../../../shared/components/Container'
import { QueryBoundary } from '../../../shared/components/QueryBoundary'
import { texts } from '../../../shared/texts'
import { CvPreview } from './CvPreview'
import { ExperienceItem } from './ExperienceItem'

function ExperienceTimeline({ entries }: { entries: Experience[] }) {
  const pathRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: pathRef,
    offset: ['start 60%', 'end 70%'],
    trackContentSize: true,
  })

  return (
    <div className="relative">
      <div
        ref={pathRef}
        aria-hidden="true"
        className="pointer-events-none absolute -start-4 top-2 bottom-0 w-0.5 -translate-x-1/2 bg-border"
      >
        <motion.div
          className="h-full origin-top bg-accent motion-reduce:hidden"
          style={{ scaleY: scrollYProgress }}
        />
      </div>
      <ol>
        {entries.map((entry) => <ExperienceItem key={entry.id} entry={entry} />)}
      </ol>
    </div>
  )
}

export function AboutPage() {
  const experiences = useExperiences()
  return (
    <>
      <title>{`${texts.about.title} · ${texts.owner.name}`}</title>
      <section className="page-pad max-sm:pb-0">
        <Container>
          <h1 className="type-h1 enter">{texts.about.heading}</h1>
          <div className="editorial-split mt-6 sm:mt-12">
            <dl>
              <dt className="type-small text-muted-foreground">{texts.about.facts.basedInLabel}</dt>
              <dd className="type-body mt-2">{texts.about.facts.basedIn}</dd>
            </dl>
            <div className="min-w-0 space-y-4 sm:space-y-6">
              {texts.about.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={`max-w-[62ch] ${index === 0 ? 'type-body-lg enter' : 'type-body'}`}
                  style={index === 0 ? { '--enter-i': 1 } as CSSProperties : undefined}
                >
                  {index === 2 ? (
                    <>
                      {paragraph.split('ICPN')[0]}
                      <a className="link-inline" href="https://icpn.it/">
                        ICPN
                      </a>
                      {paragraph.split('ICPN')[1]}
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
              <div className="enter" style={{ '--enter-i': 2 } as CSSProperties}>
                <CvPreview />
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section id="experience" className="section-pad scroll-mt-6 max-sm:pt-16 max-sm:pb-0 sm:scroll-mt-(--header-height)">
        <Container>
          <h2 className="type-h2">{texts.cv.experience}</h2>
          <div className="mt-6 sm:mt-12">
            <QueryBoundary query={experiences} emptyText={texts.cv.empty}>
              {(entries) => <ExperienceTimeline entries={entries} />}
            </QueryBoundary>
          </div>
        </Container>
      </section>
    </>
  )
}
