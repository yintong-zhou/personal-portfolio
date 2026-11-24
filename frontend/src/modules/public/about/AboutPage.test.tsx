import { screen, within } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { publicApi } from '../../../shared/api/publicApi'
import { texts } from '../../../shared/texts'
import { renderRoute } from '../../../test/render'

it('shows the three bio paragraphs followed by experience', async () => {
  vi.spyOn(publicApi, 'getExperiences').mockResolvedValue([
    {
      id: 1,
      role: 'Developer',
      company: 'Acme',
      location: null,
      startDate: '2020-04-01',
      endDate: null,
      description: 'Built things.',
    },
  ])
  renderRoute('/about')

  for (const paragraph of texts.about.paragraphs.slice(0, 2)) expect(screen.getByText(paragraph)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'ICPN' })).toHaveAttribute('href', 'https://icpn.it/')
  const facts = screen.getByText('Based in', { selector: 'dt' }).closest('dl')!
  expect(within(facts).getByText('Milan', { selector: 'dd' })).toBeInTheDocument()
  expect(within(facts).queryByText('Languages')).toBeNull()
  expect(screen.getByRole('heading', { level: 1, name: texts.about.heading })).toBeInTheDocument()
  expect(document.title).toBe(`${texts.about.title} · ${texts.owner.name}`)
  expect(screen.queryByRole('link', { name: texts.about.cvLink })).toBeNull()
  expect(screen.queryByRole('link', { name: texts.cv.download })).toBeNull()
  expect(await screen.findByRole('heading', { level: 3, name: 'Developer' })).toBeInTheDocument()
  expect(screen.queryByRole('heading', { level: 2, name: texts.cv.skills })).toBeNull()
  expect(document.getElementById('experience')).toContainElement(screen.getByRole('heading', { name: 'Developer' }))
})

it('omits the education section even when education is published', async () => {
  vi.spyOn(publicApi, 'getExperiences').mockResolvedValue([])
  vi.spyOn(publicApi, 'getEducation').mockResolvedValue([
    { id: 1, type: 'education', title: 'Degree', institution: 'University', year: 2020 },
  ])
  renderRoute('/about')
  await screen.findByText('Nothing published yet.')
  expect(screen.queryByRole('heading', { name: 'Education and certifications' })).toBeNull()
  expect(screen.queryByRole('heading', { name: 'Degree' })).toBeNull()
  expect(document.getElementById('education')).toBeNull()
})
