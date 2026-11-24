import { motion } from 'motion/react'
import { useId } from 'react'
import { Link, NavLink } from 'react-router'
import { texts } from '../../shared/texts'
import styles from './Header.module.css'

const links = [
  { to: '/projects', label: texts.nav.projects },
  { to: '/about', label: texts.nav.about },
]

const navLinkClass = `${styles.navLink} relative isolate inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 max-[390px]:px-2`

export function Header() {
  // One pill per header: the same layoutId on the active link makes it glide to the next one.
  const pillId = useId()
  return (
    <header className={`${styles.header} pointer-events-none sticky top-0 z-40 flex h-(--header-height) shrink-0 items-center justify-center`}>
      <div
        className={`${styles.island} pointer-events-auto flex max-w-[min(100%-2*var(--gut),1280px)] items-center rounded-full py-1 text-card-foreground`}
      >
        <Link to="/" viewTransition className="inline-flex min-h-11 min-w-11 items-center rounded-full px-2 font-medium">
          <span className="truncate">{texts.owner.name}</span>
        </Link>
        <nav className="shrink-0">
          <ul className="flex w-max md:gap-2">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} viewTransition className={navLinkClass}>
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId={pillId}
                          aria-hidden="true"
                          className={styles.pill}
                          transition={{ type: 'spring', stiffness: 420, damping: 38 }}
                        />
                      )}
                      {l.label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
