import { Download, FileText, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { buttonClass } from '../../../shared/components/buttonStyles'
import { site } from '../../../shared/site'
import { texts } from '../../../shared/texts'
import { cvContent, type CvEntry } from './cvContent'

function CvSheetEntry({ title, org, date, bullets }: CvEntry) {
  return (
    <div className="cv-sheet-entry">
      <p className="cv-sheet-entry-title">
        <strong>{title}</strong>
        <span className="cv-sheet-entry-date type-label">{date}</span>
      </p>
      <p className="cv-sheet-entry-org">{org}</p>
      {!!bullets?.length && (
        <ul>
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

function CvSheet() {
  const sheet = texts.cv.sheet
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  async function copyEmail() {
    try {
      if (!navigator.clipboard?.writeText) return
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
    } catch {
      // Clipboard access can be unavailable or denied.
    }
  }

  return (
    <article className="cv-sheet">
      <header className="cv-sheet-header">
        <h2 className="type-h1">{texts.owner.name}</h2>
        <p className="cv-sheet-role">{cvContent.role}</p>
        <p className="cv-sheet-contacts type-small flex flex-wrap">
          <span>
            <button
              type="button"
              className="link min-h-11 text-left"
              aria-label={sheet.copyEmail(site.email)}
              onClick={copyEmail}
            >
              {site.email}
            </button>
            <span className="cv-sheet-copied" aria-live="polite">
              {copied ? sheet.copied : ''}
            </span>
          </span>
          <span>{texts.owner.location}</span>
          <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-11 items-center">
            {cvContent.linkedinLabel}
          </a>
        </p>
      </header>
      <section>
        <h3 className="type-h3">{sheet.headings.summary}</h3>
        <p>{cvContent.summary}</p>
      </section>
      <section>
        <h3 className="type-h3">{sheet.headings.skills}</h3>
        <ul>
          {cvContent.skills.map(({ label, value }) => (
            <li key={label}>
              <strong>{label}:</strong> {value}
            </li>
          ))}
        </ul>
      </section>
      {[
        { heading: sheet.headings.experience, entries: cvContent.experience },
        { heading: sheet.headings.volunteer, entries: cvContent.volunteer },
        { heading: sheet.headings.education, entries: cvContent.education },
      ].map(({ heading, entries }) => (
        <section key={heading}>
          <h3 className="type-h3">{heading}</h3>
          {entries.map((entry) => (
            <CvSheetEntry key={entry.title} {...entry} />
          ))}
        </section>
      ))}
      {[
        { heading: sheet.headings.certifications, items: cvContent.certifications },
        { heading: sheet.headings.languages, items: cvContent.languages },
      ].map(({ heading, items }) => (
        <section key={heading}>
          <h3 className="type-h3">{heading}</h3>
          <ul>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  )
}

export function CvPreview() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const [isOpen, setIsOpen] = useState(() => window.location.hash === '#cv')

  useEffect(() => {
    if (isOpen && !dialogRef.current?.open) dialogRef.current?.showModal()
  }, [isOpen])

  function handleClose() {
    setIsOpen(false)
    if (window.location.hash === '#cv') {
      window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search)
    }
  }

  return (
    <>
      <button type="button" className={buttonClass('secondary')} onClick={() => setIsOpen(true)}>
        <FileText size={20} strokeWidth={1.5} aria-hidden="true" />
        {texts.about.cvLink}
      </button>
      {createPortal(
        <dialog
          ref={dialogRef}
          className="cv-dialog"
          aria-labelledby={titleId}
          onClose={handleClose}
          onClick={(event) => {
            if (event.target === event.currentTarget) dialogRef.current?.close()
          }}
        >
          <div className="cv-toolbar">
            <h2 id={titleId} className="sr-only sm:not-sr-only">
              {texts.cv.sheet.title}
            </h2>
            <div className="ml-auto flex items-center gap-2">
              <a href={site.cvPdfUrl} download="Yintong_Zhou_CV.pdf" className={`${buttonClass('main')} max-sm:px-3 max-sm:text-sm`}>
                <Download size={20} strokeWidth={1.5} aria-hidden="true" className="shrink-0" />
                {texts.cv.download}
              </a>
              <button
                type="button"
                className="cv-close glass-secondary"
                aria-label={texts.cv.sheet.close}
                onClick={() => dialogRef.current?.close()}
              >
                <X size={20} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="cv-viewport">{isOpen && <CvSheet />}</div>
        </dialog>,
        document.body,
      )}
    </>
  )
}
