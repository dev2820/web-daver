import { ark, type HTMLArkProps } from '@ark-ui/react/factory'
import { cn } from '@/lib/utils'

export function Root({ className, ...props }: HTMLArkProps<'div'>) {
  return <ark.div className={cn('overflow-hidden rounded-xl border border-zinc-200 bg-white', className)} {...props} />
}

export function Header({ className, ...props }: HTMLArkProps<'div'>) {
  return <ark.div className={cn('flex flex-col gap-1 p-6', className)} {...props} />
}

export function Title({ className, ...props }: HTMLArkProps<'h2'>) {
  return <ark.h2 className={cn('text-lg font-semibold text-zinc-950', className)} {...props} />
}

export function Description({ className, ...props }: HTMLArkProps<'p'>) {
  return <ark.p className={cn('text-sm leading-6 text-zinc-500', className)} {...props} />
}

export function Body({ className, ...props }: HTMLArkProps<'div'>) {
  return <ark.div className={cn('px-6 pb-6', className)} {...props} />
}

