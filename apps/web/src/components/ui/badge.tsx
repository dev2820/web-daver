import { ark, type HTMLArkProps } from '@ark-ui/react/factory'
import { cn } from '@/lib/utils'

type BadgeProps = HTMLArkProps<'span'> & { variant?: 'subtle' | 'surface' }

export function Badge({ className, variant = 'subtle', ...props }: BadgeProps) {
  return (
    <ark.span
      className={cn(
        'inline-flex h-5 items-center whitespace-nowrap rounded-md px-2 text-xs font-medium',
        variant === 'surface' ? 'border border-zinc-200 bg-white text-zinc-700' : 'bg-blue-50 text-blue-700',
        className,
      )}
      {...props}
    />
  )
}
