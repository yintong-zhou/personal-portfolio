import { animate as animateTrace, cubicBezier } from 'animejs'
import { inView } from 'motion'
import { animate as animateHeading } from 'motion/mini'
import { useEffect, useRef } from 'react'
import type { Experience } from '../../../shared/api/types'
import { Tag } from '../../../shared/components/Tag'
import { formatDateRange } from '../../../shared/format'
import { reducedMotionQuery } from '../../../shared/motion'
import { texts } from '../../../shared/texts'
import './experience-marker.css'

export function ExperienceItem({ entry }: { entry: Experience }) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const traceRef = useRef<HTMLSpanElement>(null)
  const markerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const marker = markerRef.current
    if (!marker || typeof IntersectionObserver === 'undefined') return
    return inView(marker, () => {
      marker.classList.add('is-visible')
      return () => marker.classList.remove('is-visible')
    })
  }, [])

  useEffect(() => {
    const heading = headingRef.current
    const trace = traceRef.current
    if (!heading || !trace || typeof IntersectionObserver === 'undefined') return

    const preference = window.matchMedia(reducedMotionQuery)
    let reset: (() => void) | undefined
    const unobserve = inView(heading, () => {
      if (preference.matches) return

      const headingMotion = animateHeading(
        heading,
        { transform: ['translateY(8px)', 'translateY(0px)'] },
        { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
      )
      const traceMotion = animateTrace(trace, {
        scaleX: [0, 1],
        opacity: [0, 1, 0],
        duration: 560,
        ease: cubicBezier(0.33, 1, 0.68, 1),
      })
      reset = () => {
        headingMotion.cancel()
        traceMotion.revert()
      }
    }, { amount: 0.5 })

    const onPreferenceChange = () => {
      if (preference.matches) reset?.()
    }
    preference.addEventListener('change', onPreferenceChange)
    return () => {
      unobserve()
      preference.removeEventListener('change', onPreferenceChange)
      reset?.()
    }
  }, [])

  return (
    <li className="editorial-split border-b border-border py-6 first:pt-0 sm:py-8">
      <div>
        <p className="type-label relative tabular-nums text-muted-foreground">
          {formatDateRange(entry.startDate, entry.endDate)}
          <span
            ref={markerRef}
            aria-hidden="true"
            className="experience-marker pointer-events-none absolute -start-4 top-1/2 -translate-1/2"
          />
          <span
            ref={traceRef}
            aria-hidden="true"
            className="pointer-events-none absolute start-0 top-full mt-1 h-px w-12 origin-left bg-accent opacity-0"
          />
        </p>
        {entry.endDate === null && <p className="type-small mt-2 text-muted-foreground">{texts.cv.current}</p>}
      </div>
      <div className="min-w-0">
        <h3 ref={headingRef} className="type-h3">{entry.role}</h3>
        <p className="type-small mt-2 text-muted-foreground">
          {entry.location ? `${entry.company} · ${entry.location}` : entry.company}
        </p>
        <ul className="type-body mt-4 max-w-[62ch] list-disc space-y-2 pl-4 marker:text-muted-foreground sm:mt-6 sm:space-y-3">
          {entry.description.split('\n').map((line, index) => (
            <li key={index}>
              {line.includes('icpn.it') ? (
                <>
                  {line.split('icpn.it')[0]}
                  <a className="link-inline" href="https://icpn.it/">
                    icpn.it
                  </a>
                  {line.split('icpn.it')[1]}
                </>
              ) : (
                line
              )}
            </li>
          ))}
        </ul>
        {entry.skills && entry.skills.length > 0 && (
          <ul aria-label={texts.cv.skills} className="mt-4 flex flex-wrap gap-2 sm:mt-6">
            {entry.skills.map((skill) => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}
