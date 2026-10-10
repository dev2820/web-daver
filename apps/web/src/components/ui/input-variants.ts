import { cva } from 'class-variance-authority'

export const inputVariants = cva(
  'block w-full rounded-lg border border-zinc-300 bg-white px-3 text-base text-zinc-950 placeholder:text-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 aria-invalid:border-red-500',
  {
    variants: {
      size: {
        lg: 'h-control-lg',
        natural: 'py-2.5',
      },
    },
  },
)
