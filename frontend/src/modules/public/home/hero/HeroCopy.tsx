import { ArrowRight } from 'lucide-react'
import { motion, type MotionStyle } from 'motion/react'
import { ButtonLink } from '../../../../shared/components/ButtonLink'
import { texts } from '../../../../shared/texts'

// What the owner does: title, subtitle and the two actions. Who the owner is lives on the About page.
export function HeroCopy({
  styles = {},
}: {
  styles?: { title?: MotionStyle; subtitle?: MotionStyle; actions?: MotionStyle }
}) {
  return (
    <div className="max-sm:text-center">
      <motion.h1 className="type-display max-w-[24ch] max-sm:mx-auto" style={styles.title}>
        {texts.home.title}
      </motion.h1>
      <motion.p className="type-body-lg mt-6 max-w-[62ch] text-pretty text-muted-foreground max-sm:mx-auto" style={styles.subtitle}>
        {texts.home.subtitle}
      </motion.p>
      <motion.div className="mt-8 flex flex-wrap gap-3 max-sm:justify-center sm:gap-4" style={styles.actions}>
        <ButtonLink to="/projects" variant="main">
          {texts.home.seeProjects}
          <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} className="glass-arrow shrink-0" />
        </ButtonLink>
        <ButtonLink to="/about#experience" variant="secondary">
          {texts.home.readCv}
        </ButtonLink>
      </motion.div>
    </div>
  )
}
