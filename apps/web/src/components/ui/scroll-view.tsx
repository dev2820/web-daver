import { ark, type HTMLArkProps } from "@ark-ui/react/factory";
import { cn } from "@/lib/utils";

export function ScrollView({ className, ...props }: HTMLArkProps<"div">) {
  return (
    <ark.div
      className={cn(
        "min-h-0 min-w-0 overflow-auto [scrollbar-color:var(--color-zinc-300)_transparent] scrollbar-thin",
        className,
      )}
      {...props}
    />
  );
}
