import { ark, type HTMLArkProps } from '@ark-ui/react/factory'
import { cn } from '@/lib/utils'

type ButtonProps = HTMLArkProps<'button'>

export function Button({ asChild, className, type = 'button', ...props }: ButtonProps) {
  return (
    <ark.button
      asChild={asChild}
      type={asChild ? undefined : type}
      className={cn(
        'inline-flex h-control-lg items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-base font-semibold text-white shadow-sm transition-[background-color,transform,box-shadow] duration-150 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
