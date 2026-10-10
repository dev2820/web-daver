type Predicate = (value: string) => boolean;
type Plugin<T> = { predicate: Predicate; render: T };

export function createFileClassifier<Render>() {
  const plugins: Plugin<Render>[] = [];
  let defaultRender: Render | null = null;

  const classifier = {
    register(predicate: (value: string) => boolean, render: Render) {
      plugins.push({ predicate, render });
      return classifier;
    },
    registerDefault(render: Render) {
      defaultRender = render;
      return classifier;
    },
    classify(value: string): Render | null {
      return (
        plugins.find((plugin) => plugin.predicate(value))?.render ??
        defaultRender
      );
    },
  };

  return classifier;
}
