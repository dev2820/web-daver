import type { SubmitEvent } from "react";

import { Badge, Button, Card } from "@/components/ui";
import { useServersStore } from "@/stores/servers";

const inputClassName =
  "mt-1.5 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-base text-zinc-950 placeholder:text-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

function SettingPage() {
  const servers = useServersStore((state) => state.servers);
  const addServer = useServersStore((state) => state.addServer);
  const removeServer = useServersStore((state) => state.removeServer);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const nameInput = form.elements.namedItem("name");
    const urlInput = form.elements.namedItem("url");
    if (
      !(nameInput instanceof HTMLInputElement) ||
      !(urlInput instanceof HTMLInputElement)
    )
      return;

    const name = nameInput.value.trim();
    if (!name) {
      nameInput.setCustomValidity("서버 이름을 입력하세요.");
      nameInput.reportValidity();
      return;
    }

    const url = urlInput.value.trim();
    if (servers.some((server) => server.url === url)) {
      urlInput.setCustomValidity("이미 저장된 URL입니다.");
      urlInput.reportValidity();
      return;
    }

    addServer({ name, url });
    form.reset();
  }

  return (
    <main className="max-w-170 py-16 md:py-24">
      <Badge>SETTING</Badge>
      <h1 className="mt-5 text-4xl font-bold tracking-tighter md:text-5xl">
        설정
      </h1>
      <Card.Root className="mt-8">
        <Card.Header>
          <Card.Title>서버</Card.Title>
          <Card.Description>
            서버 주소는 이 브라우저에 저장됩니다.
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label
                htmlFor="server-name"
                className="text-sm font-medium text-zinc-800"
              >
                서버 이름
              </label>
              <input
                id="server-name"
                name="name"
                type="text"
                required
                placeholder="예: 개발 서버"
                onInput={(event) => event.currentTarget.setCustomValidity("")}
                className={inputClassName}
              />
            </div>
            <div>
              <label
                htmlFor="server-url"
                className="text-sm font-medium text-zinc-800"
              >
                URL
              </label>
              <input
                id="server-url"
                name="url"
                type="url"
                required
                placeholder="https://example.com"
                onInput={(event) => event.currentTarget.setCustomValidity("")}
                className={inputClassName}
              />
            </div>
            <Button type="submit" className="justify-self-start">
              서버 추가
            </Button>
          </form>

          <div className="mt-6 border-t border-zinc-200 pt-6">
            <p className="sr-only" aria-live="polite">
              저장된 서버 {servers.length}개
            </p>
            {servers.length === 0 ? (
              <p className="text-sm text-zinc-500">
                저장된 서버가 없습니다. 위 입력란에서 서버를 추가하세요.
              </p>
            ) : (
              <ul aria-label="저장된 서버" className="space-y-3">
                {servers.map((server) => (
                  <li
                    key={server.url}
                    className="flex min-w-0 items-start justify-between gap-4 rounded-lg border border-zinc-200 p-3"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-zinc-950">{server.name}</p>
                      <p className="break-all text-sm text-zinc-500">
                        {server.url}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeServer(server.url)}
                      aria-label={`${server.name} 삭제`}
                      className="min-h-10 shrink-0 rounded-lg px-3 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card.Body>
      </Card.Root>
    </main>
  );
}

export default SettingPage;
