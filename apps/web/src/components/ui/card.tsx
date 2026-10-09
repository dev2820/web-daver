import { ark, type HTMLArkProps } from '@ark-ui/react/factory'

export function Root({ className, ...props }: HTMLArkProps<'div'>) {
  return <ark.div className={`overflow-hidden rounded-xl border border-zinc-200 bg-white ${className ?? ''}`} {...props} />
}

export function Header({ className, ...props }: HTMLArkProps<'div'>) {
  return <ark.div className={`flex flex-col gap-1 p-6 ${className ?? ''}`} {...props} />
}

export function Title({ className, ...props }: HTMLArkProps<'h2'>) {
  return <ark.h2 className={`text-lg font-semibold text-zinc-950 ${className ?? ''}`} {...props} />
}

export function Description({ className, ...props }: HTMLArkProps<'p'>) {
  return <ark.p className={`text-sm leading-6 text-zinc-500 ${className ?? ''}`} {...props} />
}

export function Body({ className, ...props }: HTMLArkProps<'div'>) {
  return <ark.div className={`px-6 pb-6 ${className ?? ''}`} {...props} />
}

