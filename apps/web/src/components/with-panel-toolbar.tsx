import { Suspense, useRef, type ComponentType } from "react";
import { Portal } from "@ark-ui/react/portal";
import { CatchBoundary } from "@tanstack/react-router";
import { EllipsisIcon, PanelLeftIcon } from "lucide-react";
import { Drawer, Menu, ScrollView } from "@/components/ui";
import { FileDepthNavigator } from "./file-depth-navigator";

type ContentProps = { url: string };

export type PanelToolbarProps = ContentProps & {
  activeContent?: ComponentType<ContentProps>;
  onContentChange: (content: ComponentType<ContentProps>) => void;
};

export type PanelToolProps = {
  content: ComponentType<ContentProps>;
  onContentChange: (content: ComponentType<ContentProps>) => void;
  presentation?: "toolbar" | "menu";
};

export function withPanelToolbar(
  Content: ComponentType<ContentProps>,
  tools: ComponentType<PanelToolProps>[] = [],
) {
  return function PanelWithToolbar({
    url,
    activeContent: ActiveContent = Content,
    onContentChange,
  }: PanelToolbarProps) {
    const pendingMenuContent = useRef<ComponentType<ContentProps> | null>(null);

    return (
      <div className="flex h-full min-h-0 min-w-0 w-full flex-col">
        <header className="flex h-12 min-w-0 shrink-0 items-center gap-2 border-b border-zinc-200 px-2 lg:h-10 lg:gap-3 lg:px-3">
          <Drawer.Trigger
            type="button"
            aria-label="사이드 메뉴 열기"
            data-side-menu-trigger=""
            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-zinc-600 focus-visible:outline-2 focus-visible:outline-blue-600 lg:hidden"
          >
            <PanelLeftIcon size={20} aria-hidden="true" />
          </Drawer.Trigger>
          <FileDepthNavigator url={url} />
          <div
            data-slot="panel-toolbar"
            className="hidden shrink-0 items-center gap-1 lg:flex"
          >
            {tools.map((Tool, index) => (
              <Tool
                key={index}
                content={ActiveContent}
                onContentChange={onContentChange}
              />
            ))}
          </div>
          {tools.length > 0 ? (
            <Menu.Root
              positioning={{ placement: "bottom-end", gutter: 8 }}
              lazyMount
              unmountOnExit
              onExitComplete={() => {
                const content = pendingMenuContent.current;
                pendingMenuContent.current = null;
                if (content) onContentChange(content);
              }}
            >
              <Menu.Trigger
                type="button"
                aria-label="도구"
                className="group flex size-10 shrink-0 items-center justify-center rounded-lg text-zinc-600 focus-visible:outline-2 focus-visible:outline-blue-600 lg:hidden data-[state=open]:bg-zinc-100"
              >
                <EllipsisIcon size={20} aria-hidden="true" />
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    {tools.map((Tool, index) => (
                      <Tool
                        key={index}
                        content={ActiveContent}
                        onContentChange={(content) => {
                          pendingMenuContent.current = content;
                        }}
                        presentation="menu"
                      />
                    ))}
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          ) : (
            <span className="size-10 lg:hidden" aria-hidden="true" />
          )}
        </header>
        <ScrollView className="flex-1 overflow-x-hidden">
          <CatchBoundary
            getResetKey={() => url}
            errorComponent={() => (
              <p role="alert" className="p-6 text-sm text-red-600">
                파일을 불러오지 못했습니다.
              </p>
            )}
          >
            <Suspense
              fallback={
                <p role="status" className="p-6 text-sm text-zinc-500">
                  파일을 불러오는 중...
                </p>
              }
            >
              <ActiveContent url={url} />
            </Suspense>
          </CatchBoundary>
        </ScrollView>
      </div>
    );
  };
}
