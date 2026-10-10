import { z } from "zod";
import { toServerRelativePath } from "@/lib/api-client";

const httpUrlSchema = z.url({ protocol: /^https?$/ });
const pathRoot = new URL("https://workspace.invalid/root/");
const relativePathSchema = z.string().min(1).refine((path) => {
  if (/^[\\/?#]/.test(path) || URL.canParse(path)) return false;

  try {
    const resolved = new URL(path, pathRoot);
    return (
      resolved.origin === pathRoot.origin &&
      resolved.pathname.startsWith(pathRoot.pathname)
    );
  } catch {
    return false;
  }
});

function previousUrlToPath(value: unknown) {
  if (typeof value !== "string" || !URL.canParse(value)) return value;

  try {
    return toServerRelativePath(value);
  } catch {
    return value;
  }
}

const panelSchema = z.preprocess(
  (value) => {
    if (
      !value ||
      typeof value !== "object" ||
      !("url" in value) ||
      "path" in value
    ) {
      return value;
    }

    return { ...value, path: previousUrlToPath(value.url) };
  },
  z.object({
    path: relativePathSchema,
    name: z.string().min(1),
    raw: z.boolean().catch(false).default(false),
  }),
);

export const workspaceSearchSchema = z.object({
  panels: z
    .array(panelSchema)
    .catch([])
    .default([])
    .transform((panels) => {
      const seen = new Set<string>();
      return panels.filter((panel) => {
        if (seen.has(panel.path)) return false;
        seen.add(panel.path);
        return true;
      });
    }),
  active: z.preprocess(
    previousUrlToPath,
    relativePathSchema.nullable().catch(null).default(null),
  ),
  tree: z.boolean().optional().catch(undefined),
  treeExpanded: z.array(httpUrlSchema).catch([]).default([]),
});

export type WorkspacePanel = z.infer<typeof panelSchema>;
export type WorkspaceSearch = z.infer<typeof workspaceSearchSchema>;
