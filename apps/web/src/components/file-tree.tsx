import { useMemo, useState } from "react";
import {
  TreeView,
  createTreeCollection,
  type TreeCollection,
} from "@ark-ui/react/tree-view";
import { ChevronRight, File, Folder } from "lucide-react";
import { ScrollView } from "@/components/ui";
import { useFileTree, type FileTreeNode } from "@/features/file-tree";
import { useServersStore } from "@/stores/servers";

function Node({
  node,
  indexPath,
  onOpenFile,
}: {
  node: FileTreeNode;
  indexPath: number[];
  onOpenFile: (node: FileTreeNode) => void;
}) {
  return (
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      {node.kind === "directory" ? (
        <TreeView.Branch>
          <TreeView.BranchControl className="flex min-h-9 cursor-pointer items-center gap-2 rounded-md px-2 text-sm text-zinc-800 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-blue-600 data-selected:bg-blue-50">
            <TreeView.BranchIndicator className="shrink-0 transition-transform data-[state=open]:rotate-90">
              <ChevronRight size={14} aria-hidden="true" />
            </TreeView.BranchIndicator>
            <Folder
              size={16}
              className="shrink-0 text-zinc-500"
              aria-hidden="true"
            />
            <TreeView.BranchText className="truncate">
              {node.label}
            </TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent className="ml-4 border-l border-zinc-200 pl-1">
            {node.children?.map((child, index) => (
              <Node
                key={child.value}
                node={child}
                indexPath={[...indexPath, index]}
                onOpenFile={onOpenFile}
              />
            ))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      ) : (
        <TreeView.Item
          onClick={() => onOpenFile(node)}
          onKeyDown={(event) => {
            if (event.key === "Enter") onOpenFile(node);
          }}
          className="flex min-h-9 cursor-pointer items-center gap-2 rounded-md px-2 pl-7 text-sm text-zinc-800 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-blue-600 data-selected:bg-blue-50"
        >
          <File
            size={16}
            className="shrink-0 text-zinc-500"
            aria-hidden="true"
          />
          <TreeView.ItemText className="truncate">
            {node.label}
          </TreeView.ItemText>
        </TreeView.Item>
      )}
    </TreeView.NodeProvider>
  );
}

export function FileTree({
  activeFileUrl,
  onOpenFile,
}: {
  activeFileUrl: string | null;
  onOpenFile: (node: FileTreeNode) => void;
}) {
  const serverUrl = useServersStore((state) => state.currentServerUrl);
  const { nodes, isPending, isError, error, loadChildren } =
    useFileTree(serverUrl);
  const [loaded, setLoaded] = useState<{
    nodes: FileTreeNode[];
    collection: TreeCollection<FileTreeNode>;
  } | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const baseCollection = useMemo(
    () =>
      createTreeCollection<FileTreeNode>({
        rootNode: {
          value: "__root__",
          label: "",
          url: serverUrl ?? "",
          kind: "directory",
          children: nodes,
        },
      }),
    [nodes, serverUrl],
  );
  const collection =
    loaded?.nodes === nodes ? loaded.collection : baseCollection;

  return (
    <ScrollView className="h-full bg-white">
      <div className="px-2 pb-4 pt-4">
        {isPending ? (
          <p role="status" className="px-2 text-sm text-zinc-500">
            파일을 불러오는 중...
          </p>
        ) : isError ? (
          <p role="alert" className="px-2 text-sm text-red-600">
            {error?.message ?? "파일 목록을 불러오지 못했습니다."}
          </p>
        ) : nodes.length === 0 ? (
          <p className="px-2 text-sm text-zinc-500">파일이 없습니다.</p>
        ) : (
          <TreeView.Root
            key={serverUrl}
            collection={collection}
            selectedValue={activeFileUrl ? [activeFileUrl] : []}
            loadChildren={({ node }) => {
              setLoadError(null);
              return loadChildren(node.url);
            }}
            onLoadChildrenComplete={({ collection }) =>
              setLoaded({ nodes, collection })
            }
            onLoadChildrenError={({ nodes: failed }) =>
              setLoadError(
                failed[0]?.error.message ?? "폴더를 불러오지 못했습니다.",
              )
            }
          >
            <TreeView.Label className="sr-only">파일 트리</TreeView.Label>
            <TreeView.Tree>
              {collection.rootNode.children?.map((node, index) => (
                <Node
                  key={node.value}
                  node={node}
                  indexPath={[index]}
                  onOpenFile={onOpenFile}
                />
              ))}
            </TreeView.Tree>
          </TreeView.Root>
        )}
        {loadError && (
          <p role="alert" className="px-2 pt-2 text-sm text-red-600">
            {loadError}
          </p>
        )}
      </div>
    </ScrollView>
  );
}
