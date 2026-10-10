import {
  Children,
  isValidElement,
  useMemo,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import type { MarkdownElementProps } from "./types";

type TableElement = ReactElement<{
  children?: ReactNode;
  style?: CSSProperties;
}>;

function elements(children: ReactNode, tag: string): TableElement[] {
  return Children.toArray(children).filter(
    (child): child is TableElement =>
      isValidElement(child) && child.type === tag,
  );
}

export function MarkdownTable({
  node: _node,
  children,
  className,
  ...props
}: MarkdownElementProps<"table">) {
  const { columns, data, alignments } = useMemo(() => {
    const headerRow = elements(elements(children, "thead")[0]?.props.children, "tr")[0];
    const headers = elements(headerRow?.props.children, "th");
    const body = elements(children, "tbody")[0];
    const data = elements(body?.props.children, "tr").map((row) =>
      elements(row.props.children, "td").map((cell) => cell.props.children),
    );
    const columns: ColumnDef<ReactNode[]>[] = headers.map((header, index) => ({
      id: String(index),
      accessorFn: (row) => row[index],
      header: () => header.props.children,
      cell: (info) => info.getValue(),
    }));

    return { columns, data, alignments: headers.map((header) => header.props.style?.textAlign) };
  }, [children]);

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="my-6 max-w-full overflow-x-auto rounded-lg border border-zinc-200">
      <table
        {...props}
        className={cn("w-max min-w-full border-collapse text-sm", className)}
      >
        <thead className="bg-zinc-50">
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id} className="border-b border-zinc-200">
              {group.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-3 py-2.5 text-left font-semibold text-zinc-700"
                  style={{ textAlign: alignments[header.index] }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-zinc-100 last:border-b-0">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-3 py-2.5 align-top text-zinc-800"
                  style={{ textAlign: alignments[cell.column.getIndex()] }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
