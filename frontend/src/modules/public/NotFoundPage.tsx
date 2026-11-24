import { ButtonLink } from '../../shared/components/ButtonLink'
import { Container } from '../../shared/components/Container'
import { texts } from '../../shared/texts'

export function NotFoundPage() {
  return (
    <Container className="page-pad">
      <title>{`${texts.notFound.title} · ${texts.owner.name}`}</title>
      <h1 className="type-h1 enter">{texts.notFound.title}</h1>
      <div className="enter mt-8 [--enter-i:1]">
        <ButtonLink to="/" variant="secondary">
          {texts.notFound.back}
        </ButtonLink>
      </div>
    </Container>
  )
}
