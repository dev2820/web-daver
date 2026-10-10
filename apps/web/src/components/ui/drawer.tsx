import { Drawer as ArkDrawer } from "@ark-ui/react/drawer";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Root = ArkDrawer.Root;
export const Trigger = ArkDrawer.Trigger;
export const CloseTrigger = ArkDrawer.CloseTrigger;
export const Title = ArkDrawer.Title;

export function Backdrop({
  className,
  ...props
}: ComponentProps<typeof ArkDrawer.Backdrop>) {
  return (
    <ArkDrawer.Backdrop
      className={cn("fixed z-60 bg-black/35", className)}
      {...props}
    />
  );
}

export function Positioner({
  className,
  ...props
}: ComponentProps<typeof ArkDrawer.Positioner>) {
  return (
    <ArkDrawer.Positioner
      className={cn("fixed z-70 flex", className)}
      {...props}
    />
  );
}

export function Content({
  className,
  ...props
}: ComponentProps<typeof ArkDrawer.Content>) {
  return (
    <ArkDrawer.Content
      className={cn(
        "flex h-full w-[min(85vw,20rem)] flex-col bg-white shadow-xl outline-none",
        className,
      )}
      {...props}
    />
  );
}
