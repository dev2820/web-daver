import { Menu as ArkMenu } from "@ark-ui/react/menu";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Root = ArkMenu.Root;
export const Trigger = ArkMenu.Trigger;

export function Positioner({
  className,
  ...props
}: ComponentProps<typeof ArkMenu.Positioner>) {
  return <ArkMenu.Positioner className={cn("z-50", className)} {...props} />;
}

export function Content({
  className,
  ...props
}: ComponentProps<typeof ArkMenu.Content>) {
  return (
    <ArkMenu.Content
      className={cn(
        "min-w-40 rounded-lg border border-zinc-200 bg-white p-1 shadow-lg focus-visible:outline-2 focus-visible:outline-blue-600 data-[state=open]:animate-menu-in data-[state=closed]:animate-menu-out motion-reduce:animate-none!",
        className,
      )}
      {...props}
    />
  );
}

export function Item({
  className,
  ...props
}: ComponentProps<typeof ArkMenu.Item>) {
  return (
    <ArkMenu.Item
      className={cn(
        "flex min-h-10 cursor-pointer items-center gap-3 rounded-md px-3 text-sm text-zinc-800 focus-visible:outline-2 focus-visible:outline-blue-600 data-highlighted:bg-zinc-100",
        className,
      )}
      {...props}
    />
  );
}
