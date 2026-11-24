import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { buttonClass, type ButtonVariant } from './buttonStyles'

export function ButtonLink({
  to,
  variant,
  children,
  className = '',
}: {
  to: string
  variant: ButtonVariant
  children: ReactNode
  className?: string
}) {
  return (
    <Link to={to} viewTransition className={`${buttonClass(variant)} ${className}`}>
      {children}
    </Link>
  )
}
