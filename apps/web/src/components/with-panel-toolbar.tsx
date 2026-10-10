import { useState, type ComponentType } from "react";

export type PanelToolProps<Props extends object> = {
  content: ComponentType<Props>;
  onContentChange: (content: ComponentType<Props>) => void;
};

export function withPanelToolbar<Props extends object>(
  Content: ComponentType<Props>,
  tools: ComponentType<PanelToolProps<Props>>[] = [],
) {
  return function PanelWithToolbar(props: Props) {
    const [ActiveContent, setActiveContent] = useState(() => Content);

    return (
      <div className="flex h-full min-h-0 flex-col">
        <header className="flex h-10 shrink-0 items-center justify-end border-b border-zinc-200 px-3">
          <div data-slot="panel-toolbar" className="flex items-center gap-1">
            {tools.map((Tool, index) => (
              <Tool
                key={index}
                content={ActiveContent}
                onContentChange={(content) => setActiveContent(() => content)}
              />
            ))}
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-auto">
          <ActiveContent {...props} />
        </div>
      </div>
    );
  };
}
