import { Files } from "lucide-react";
import { Tooltip } from "@/components/ui";

type SideMenuId = "file-tree";

export function SideMenu({
  selectedMenu,
  onSelectMenu,
}: {
  selectedMenu: SideMenuId | null;
  onSelectMenu: (menu: SideMenuId) => void;
}) {
  return (
    <aside
      aria-label="사이드 메뉴"
      className="flex w-14 shrink-0 flex-col items-center border-r border-zinc-200 bg-zinc-50 py-2"
    >
      <Tooltip.Root positioning={{ placement: "right" }}>
        <Tooltip.Trigger
          type="button"
          aria-label="파일 트리"
          aria-pressed={selectedMenu === "file-tree"}
          onClick={() => onSelectMenu("file-tree")}
          className="flex size-10 cursor-pointer items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-blue-600 aria-pressed:bg-blue-100 aria-pressed:text-blue-700"
        >
          <Files size={20} aria-hidden="true" />
        </Tooltip.Trigger>
        <Tooltip.Content>파일 트리</Tooltip.Content>
      </Tooltip.Root>
    </aside>
  );
}
