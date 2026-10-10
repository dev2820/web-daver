import { ark, type HTMLArkProps } from '@ark-ui/react/factory'
import { cva, type VariantProps } from 'class-variance-authority'
import type { Ref } from 'react'
import { cn } from '@/lib/utils'

const inputStyles = cva(
  'block w-full rounded-lg border border-zinc-300 bg-white px-3 text-base text-zinc-950 placeholder:text-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 aria-invalid:border-red-500',
  {
    variants: {
      controlSize: {
        lg: 'h-control-lg',
        natural: 'py-2.5',
      },
    },
    defaultVariants: { controlSize: 'lg' },
  },
)

type InputProps = HTMLArkProps<'input'> & VariantProps<typeof inputStyles> & { ref?: Ref<HTMLInputElement> }

export function Input({ className, controlSize, ref, ...props }: InputProps) {
  return <ark.input ref={ref} className={cn(inputStyles({ controlSize }), className)} {...props} />
}
