import { screen, within } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { publicApi } from '../../../shared/api/publicApi'
import { texts } from '../../../shared/texts'
import { bare, full } from '../../../test/fixtures'
import { renderRoute } from '../../../test/render'

it('lists the published projects', async () => {
  vi.spyOn(publicApi, 'getProjects').mockResolvedValue([full, bare])
  renderRoute('/projects')
  expect(await screen.findAllByRole('article')).toHaveLength(2)
  expect(screen.getByRole('heading', { level: 2, name: full.title })).toBeInTheDocument()
})

it('opens every project directly on GitHub', async () => {
  const repoOnly = { ...full, slug: 'repo-only', title: 'Repo only', siteUrl: null }
  vi.spyOn(publicApi, 'getProjects').mockResolvedValue([full, repoOnly, bare])
  renderRoute('/projects')
  await screen.findAllByRole('article')
  const hrefs = within(screen.getByRole('main')).getAllByRole('link').map((link) => link.getAttribute('href'))
  expect(hrefs).toEqual([full.repoUrl, repoOnly.repoUrl])
})

it('has no project detail page any more', async () => {
  renderRoute('/projects/full-project')
  expect(await screen.findByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument()
})

it('shows the empty state when nothing is published', async () => {
  vi.spyOn(publicApi, 'getProjects').mockResolvedValue([])
  renderRoute('/projects')
  expect(await screen.findByText('No projects published yet.')).toBeInTheDocument()
})

it('shows an error and keeps navigation usable when loading fails', async () => {
  vi.spyOn(publicApi, 'getProjects').mockRejectedValue(new Error('network'))
  renderRoute('/projects')
  expect(await screen.findByRole('alert')).toHaveTextContent(texts.errors.load)
  expect(screen.getByRole('navigation')).toBeInTheDocument()
  expect(screen.getByRole('contentinfo')).toBeInTheDocument()
})
