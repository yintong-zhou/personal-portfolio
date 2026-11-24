import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import type { Project } from '../../../shared/api/types'
import { bare, full } from '../../../test/fixtures'
import { ProjectCard } from './ProjectCard'

const renderCard = (project: Project, props: { tone?: 'muted' | 'card' } = {}) =>
  render(<ProjectCard project={project} {...props} />)

it('always links to the repository even when a website exists', () => {
  renderCard(full)
  const links = screen.getAllByRole('link', { name: `${full.title} (opens in a new tab)` })
  expect(links).toHaveLength(1)
  expect(links[0]).toHaveAttribute('href', full.repoUrl)
  expect(links[0]).toHaveAttribute('target', '_blank')
  expect(links[0]).toHaveAttribute('rel', 'noreferrer')
  for (const text of [full.title, full.summary, 'C#', 'Oracle', 'opens in a new tab']) expect(links[0]).toHaveTextContent(text)
  expect(screen.getByRole('heading', { name: full.title })).toBeInTheDocument()
})

it('links to the repository when there is no website', () => {
  renderCard({ ...full, siteUrl: null })
  expect(screen.getByRole('link')).toHaveAttribute('href', full.repoUrl)
})

it('shows the logo as a decorative lazy image inside the reserved 16:9 block', () => {
  renderCard(full)
  const img = document.querySelector('img')
  expect(img).toHaveAttribute('src', full.logoUrl)
  expect(img).toHaveAttribute('alt', '')
  expect(img).toHaveAttribute('loading', 'lazy')
  expect(img?.parentElement).toHaveClass('aspect-video')
  expect(img?.parentElement).toHaveAttribute('data-cover')
  expect(screen.queryByRole('img')).toBeNull()
})

it('keeps the title block, hidden from assistive technology, when there is no logo', () => {
  renderCard({ ...full, logoUrl: null })
  expect(document.querySelector('img')).toBeNull()
  const fallback = document.querySelector('[data-cover] > [aria-hidden="true"]')
  expect(fallback).toHaveTextContent(full.title)
})

it('uses the same title block if the logo fails to load', () => {
  renderCard(full)
  fireEvent.error(document.querySelector('img')!)
  expect(document.querySelector('[data-cover] > [aria-hidden="true"]')).toHaveTextContent(full.title)
})

it('uses a white tile when placed on the muted ground', () => {
  renderCard(full, { tone: 'card' })
  expect(screen.getByRole('link')).toHaveClass('bg-card', 'tile-hover')
  expect(screen.getByRole('link')).not.toHaveClass('bg-muted')
})

it('shows a plain tile, not a link, when the project has no URL, and omits empty description and tags', () => {
  renderCard(bare)
  expect(screen.queryByRole('link')).toBeNull()
  expect(screen.queryByRole('list')).toBeNull()
  expect(screen.queryByText(/opens in a new tab/)).toBeNull()
  expect(document.querySelectorAll('article p')).toHaveLength(0)
  expect(screen.getByRole('article')).not.toHaveClass('tile-hover')
})

it('lets a long unbroken title wrap', () => {
  renderCard(bare)
  expect(screen.getByRole('heading', { name: bare.title })).toHaveClass('wrap-anywhere')
})

it('does not fall back to the website when the repository URL is missing', () => {
  renderCard({ ...full, repoUrl: null })
  expect(screen.queryByRole('link')).toBeNull()
})
