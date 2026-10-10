import { Tooltip as ArkTooltip } from '@ark-ui/react/tooltip'
import { Portal } from '@ark-ui/react/portal'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export const Root = ArkTooltip.Root
export const Trigger = ArkTooltip.Trigger

export function Content({ className, ...props }: ComponentProps<typeof ArkTooltip.Content>) {
  return (
    <Portal>
      <ArkTooltip.Positioner className="z-50">
        <ArkTooltip.Content
          className={cn('rounded bg-zinc-900 px-2 py-1 text-xs text-white shadow-sm', className)}
          {...props}
        />
      </ArkTooltip.Positioner>
    </Portal>
  )
}
