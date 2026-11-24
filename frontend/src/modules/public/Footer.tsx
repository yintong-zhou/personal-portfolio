import { ArrowRight } from 'lucide-react'
import { buttonClass } from '../../shared/components/buttonStyles'
import { Container } from '../../shared/components/Container'
import { site } from '../../shared/site'
import { texts } from '../../shared/texts'

const links = [
  { href: site.githubUrl, label: texts.footer.github },
  { href: site.linkedinUrl, label: texts.footer.linkedin },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-background">
      <Container>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-16 pb-8">
          <a href={`mailto:${site.email}`} className={buttonClass('main')}>
            {texts.closing.action}
            <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} className="glass-arrow shrink-0" />
          </a>
          <p className="type-body text-muted-foreground">{texts.closing.line}</p>
        </div>
        <div className="flex flex-col gap-4 pb-12 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="font-medium">{texts.owner.name}</p>
            <p className="type-small mt-2 text-muted-foreground">
              {texts.owner.role} · {texts.owner.location}
            </p>
          </div>
          <ul className="flex flex-wrap gap-4">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="link inline-flex min-h-11 min-w-11 items-center">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="type-small w-full text-muted-foreground">
            © {new Date().getFullYear()} {texts.owner.name} · {texts.footer.trademarks}
          </p>
        </div>
      </Container>
    </footer>
  )
}
