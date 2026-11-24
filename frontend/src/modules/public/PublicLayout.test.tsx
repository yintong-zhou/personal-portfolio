import { screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import { renderRoute } from '../../test/render'
import { texts } from '../../shared/texts'

it('shows the owner name and only Projects and About in the navigation', () => {
  renderRoute('/about')
  const nav = screen.getByRole('navigation')
  expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects')
  expect(within(nav).getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
  expect(within(nav).getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page')
  expect(within(nav).getAllByRole('link')).toHaveLength(2)
  expect(within(nav).queryByRole('link', { name: 'CV' })).not.toBeInTheDocument()
  expect(screen.getByRole('banner')).toHaveTextContent('Yintong Zhou')
  expect(within(screen.getByRole('banner')).getByRole('link', { name: 'Yintong Zhou' })).toHaveAttribute('href', '/')
})

it.each([
  ['/projects', 'Projects'],
  ['/about', 'About'],
])('marks only the current navigation link on %s', (path, label) => {
  renderRoute(path)
  const links = within(screen.getByRole('navigation')).getAllByRole('link')
  expect(links.filter((link) => link.getAttribute('aria-current') === 'page')).toEqual([
    screen.getByRole('link', { name: label, current: 'page' }),
  ])
})

it('offers a skip link to the main content as the first link', () => {
  renderRoute('/')
  expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', '#main')
  expect(screen.getByRole('main')).toHaveAttribute('id', 'main')
  expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1')
})

it('shows identity and public links in the footer', () => {
  renderRoute('/')
  const footer = screen.getByRole('contentinfo')
  expect(within(footer).getByText(texts.owner.name, { exact: true })).toBeInTheDocument()
  expect(footer).toHaveTextContent(`${texts.owner.role} · ${texts.owner.location}`)
  expect(within(footer).getByRole('link', { name: 'GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/yintong-zhou',
  )
  expect(within(footer).getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/yintong-zhou',
  )
})

it.each(['/', '/about', '/cv', '/projects', '/nope'])('closes %s with one email action and the legal line', (path) => {
  renderRoute(path)
  const footer = screen.getByRole('contentinfo')
  expect(footer).toHaveAttribute('id', 'contact')
  expect(within(footer).getByText(texts.closing.line)).toBeInTheDocument()
  const emailLinks = within(footer).getAllByRole('link').filter((link) => link.getAttribute('href')?.startsWith('mailto:'))
  expect(emailLinks).toEqual([within(footer).getByRole('link', { name: 'Write to me' })])
  expect(emailLinks[0]).toHaveAttribute('href', 'mailto:contactdm.yt@gmail.com')
  expect(footer).toHaveTextContent(`© ${new Date().getFullYear()} ${texts.owner.name}`)
  expect(footer).toHaveTextContent(texts.footer.trademarks)
})

it('renders the About copy and sets the document title', () => {
  renderRoute('/about')
  expect(screen.getByRole('heading', { level: 1, name: texts.about.heading })).toBeInTheDocument()
  expect(screen.getByText(/I'm a fullstack developer based in Milan/)).toBeInTheDocument()
  expect(document.title).toBe('About · Yintong Zhou')
})

it('shows a not-found page with a way back for an unknown address', () => {
  renderRoute('/nope')
  expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/')
})

it('never renders the repository name', () => {
  renderRoute('/')
  expect(document.body.textContent).not.toMatch(/jade-atlas/i)
})
