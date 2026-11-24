const base =
  'inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-6 font-medium hover:brightness-[1.03] motion-safe:transition-[translate,scale] motion-safe:duration-(--motion-fast) motion-safe:ease-out motion-safe:hover:-translate-y-px motion-safe:active:scale-[0.98]'

const variants = {
  main: 'glass-main glass-sheen',
  secondary: 'glass-secondary',
}

export type ButtonVariant = keyof typeof variants

export const buttonClass = (variant: ButtonVariant) => `${base} ${variants[variant]}`
