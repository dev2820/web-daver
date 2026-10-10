import { Splitter as ArkSplitter } from "@ark-ui/react/splitter";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const RootProvider = ArkSplitter.RootProvider;

export function Panel({
  className,
  ...props
}: ComponentProps<typeof ArkSplitter.Panel>) {
  return <ArkSplitter.Panel className={cn("min-w-0", className)} {...props} />;
}

export function ResizeTrigger({
  className,
  ...props
}: ComponentProps<typeof ArkSplitter.ResizeTrigger>) {
  return (
    <ArkSplitter.ResizeTrigger
      className={cn(
        "group relative z-10 -mx-1.5 flex w-3 items-center justify-center focus-visible:outline-2 focus-visible:outline-blue-600",
        className,
      )}
      {...props}
    />
  );
}

export function ResizeTriggerIndicator({
  className,
  ...props
}: ComponentProps<typeof ArkSplitter.ResizeTriggerIndicator>) {
  return (
    <ArkSplitter.ResizeTriggerIndicator
      className={cn(
        "h-full w-px bg-zinc-200 group-hover:bg-blue-400 group-focus-visible:bg-blue-600",
        className,
      )}
      {...props}
    />
  );
}
