import { useState, type ComponentType } from "react";
import { ScrollView } from "@/components/ui";
import { FileDepthNavigator } from "./file-depth-navigator";

export type PanelToolProps<Props extends object> = {
  content: ComponentType<Props>;
  onContentChange: (content: ComponentType<Props>) => void;
};

export function withPanelToolbar<Props extends { url: string }>(
  Content: ComponentType<Props>,
  tools: ComponentType<PanelToolProps<Props>>[] = [],
) {
  return function PanelWithToolbar(props: Props) {
    const [ActiveContent, setActiveContent] = useState(() => Content);

    return (
      <div className="flex h-full min-h-0 flex-col">
        <header className="flex h-10 min-w-0 shrink-0 items-center gap-3 border-b border-zinc-200 px-3">
          <FileDepthNavigator url={props.url} />
          <div data-slot="panel-toolbar" className="flex shrink-0 items-center gap-1">
            {tools.map((Tool, index) => (
              <Tool
                key={index}
                content={ActiveContent}
                onContentChange={(content) => setActiveContent(() => content)}
              />
            ))}
          </div>
        </header>
        <ScrollView className="flex-1">
          <ActiveContent {...props} />
        </ScrollView>
      </div>
    );
  };
}
