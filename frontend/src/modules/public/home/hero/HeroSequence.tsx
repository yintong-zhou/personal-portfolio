import { ChevronDown } from 'lucide-react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
import { useEffect, useEffectEvent, useRef, useState, type FocusEvent } from 'react'
import { Container } from '../../../../shared/components/Container'
import { texts } from '../../../../shared/texts'
import type { HeroScene } from './heroScene'
import { supportsWebGL } from './heroMode'
import { HeroCopy } from './HeroCopy'
import { copyState, HERO, navHidden } from './heroTimeline'

const span = (r: readonly [number, number]) => [r[0], r[1]]

// Scroll-driven hero: a tall section with a sticky stage. The scroll animates the 3D model,
// then the real text fades in. The live disk runs while visible; all drawing uses one RAF scheduler.
export function HeroSequence({ onFail }: { onFail: () => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const holeCanvasRef = useRef<HTMLCanvasElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const revealedRef = useRef(false)
  const scheduleRef = useRef(() => {})
  const firstScroll = useRef(true)
  const [revealed, setRevealed] = useState(false)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, HERO.spring)
  // A page opened already scrolled (reload, back) snaps to its position instead of replaying from 0.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!firstScroll.current) return
    firstScroll.current = false
    progress.jump(v)
  })
  useMotionValueEvent(progress, 'change', (p) => {
    scheduleRef.current()
    syncNav(p, revealedRef.current)
  })

  // The title comes out of the tunnel towards the reader, then the rest settles under it.
  const titleOpacity = useTransform(progress, span(HERO.copy.title), [0, 1])
  const titleScale = useTransform(progress, span(HERO.copy.title), [1.18, 1])
  const subtitleOpacity = useTransform(progress, span(HERO.copy.subtitle), [0, 1])
  const subtitleY = useTransform(progress, span(HERO.copy.subtitle), [12, 0])
  const actionsOpacity = useTransform(progress, span(HERO.copy.actions), [0, 1])
  const actionsY = useTransform(progress, span(HERO.copy.actions), [12, 0])
  const styles = {
    title: { opacity: titleOpacity, scale: titleScale },
    subtitle: { opacity: subtitleOpacity, y: subtitleY },
    actions: { opacity: actionsOpacity, y: actionsY },
  }
  const hint = useTransform(progress, [0, HERO.hintEnd], [1, 0])

  const fail = useEffectEvent(onFail)

  // The Header hides its island on :root[data-hero-nav='hidden'].
  useEffect(() => {
    syncNav(progress.get(), revealed)
    return () => syncNav(0, true)
  }, [progress, revealed])

  useEffect(() => {
    const section = sectionRef.current!
    const stage = stageRef.current!
    const canvas = canvasRef.current!
    const copy = copyRef.current!
    let disposed = false
    let raf = 0
    let visible = true
    let dirty = false
    let resized = false
    let scene: HeroScene | null = null

    const draw = () => {
      raf = 0
      if (disposed || !visible || document.hidden) {
        dirty = true // a frame requested before the hero left the screen
        return
      }
      const p = revealedRef.current ? 1 : progress.get()
      if (resized) {
        resized = false
        try {
          scene?.layout()
        } catch {
          fail()
          return
        }
      }
      try {
        if (scene?.render(p)) schedule()
      } catch {
        fail()
        return
      }
      copy.style.pointerEvents = copyState(p, revealedRef.current).interactive ? 'auto' : 'none'
    }

    const schedule = () => {
      if (disposed) return
      if (!visible) {
        dirty = true
        return
      }
      if (!raf) raf = requestAnimationFrame(draw)
    }

    scheduleRef.current = schedule

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && dirty) {
        dirty = false
        schedule()
      }
    })
    io.observe(section)
    const visibility = () => {
      if (!document.hidden) schedule()
    }
    document.addEventListener('visibilitychange', visibility)
    const ro =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => {
            resized = true
            schedule()
          })
    ro?.observe(stage)
    schedule()

    // Both GPU layers load only on the Home, with WebGL and motion enabled.
    if (supportsWebGL()) {
      const small = window.matchMedia('(max-width: 767px)').matches
      import('./heroScene')
        .then(({ createHeroScene }) =>
          disposed
            ? null
            : createHeroScene({
                canvas,
                holeCanvas: holeCanvasRef.current!,
                stage,
                count: small ? HERO.stars.small : HERO.stars.large,
                onLost: () => {
                  if (!disposed) fail()
                },
              }),
        )
        .catch(() => null)
        .then((layer) => {
          if (!layer) {
            if (!disposed) fail()
            return
          }
          if (disposed) {
            layer.dispose()
            return
          }
          scene = layer
          schedule()
        })
    } else fail()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      io.disconnect()
      document.removeEventListener('visibilitychange', visibility)
      ro?.disconnect()
      scene?.dispose()
      scheduleRef.current = () => {}
    }
  }, [progress])

  const onFocus = () => {
    revealedRef.current = true
    setRevealed(true)
    scheduleRef.current()
  }
  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget)) return
    revealedRef.current = false
    setRevealed(false)
    scheduleRef.current()
  }

  return (
    <section
      ref={sectionRef}
      data-hero="sequence"
      data-revealed={revealed}
      className="relative -mt-(--header-height) h-[400svh] bg-card"
    >
      <div ref={stageRef} className="hero-stage sticky top-0 h-svh overflow-hidden">
        <canvas
          ref={holeCanvasRef}
          data-hero-fx
          data-layer="black-hole"
          aria-hidden="true"
          className="absolute inset-0 size-full"
        />
        <canvas
          ref={canvasRef}
          data-hero-fx
          data-layer="model"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full"
        />
        <div
          ref={copyRef}
          data-hero-copy
          onFocus={onFocus}
          onBlur={onBlur}
          style={{ pointerEvents: 'none' }}
          className="relative"
        >
          <Container>
            <HeroCopy styles={styles} />
          </Container>
        </div>
        <motion.div
          aria-hidden="true"
          style={{ opacity: hint }}
          className="absolute inset-x-(--gut) bottom-6 flex flex-col items-center gap-1 text-center text-muted-foreground"
        >
          <span className="type-label">{texts.home.scrollHint}</span>
          <ChevronDown size={20} strokeWidth={1.5} />
        </motion.div>
      </div>
    </section>
  )
}

function syncNav(p: number, revealed: boolean) {
  const root = document.documentElement
  if (navHidden(p, revealed)) root.dataset.heroNav = 'hidden'
  else delete root.dataset.heroNav
}
