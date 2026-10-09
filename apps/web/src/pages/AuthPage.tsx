import { useRef, useState } from "react";
import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { Plus, Server, X } from "lucide-react";
import { Button } from "@/components/ui";
import { useServersStore } from "@/stores/servers";

const inputClassName =
  "block h-control-lg w-full rounded-lg border border-zinc-300 bg-white px-3 text-base text-zinc-950 placeholder:text-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 aria-invalid:border-red-500";

function ServerConnectDialog() {
  const [open, setOpen] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const addServer = useServersStore((state) => state.addServer);
  const setCurrentServer = useServersStore((state) => state.setCurrentServer);

  const form = useForm({
    defaultValues: { name: "", url: "" },
    onSubmit: ({ value }) => {
      const name = value.name.trim();
      const url = value.url.trim();
      addServer({ name, url });
      setCurrentServer(url);
      form.reset();
      setOpen(false);
    },
    onSubmitInvalid: ({ value }) => {
      if (!value.name.trim()) nameInputRef.current?.focus();
      else urlInputRef.current?.focus();
    },
  });

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
      initialFocusEl={() => nameInputRef.current}
      lazyMount
      unmountOnExit
    >
      <Dialog.Trigger className="flex min-h-40 w-full cursor-pointer flex-col items-start justify-between rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-5 text-left text-zinc-950 transition-colors hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
        <span className="flex size-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
          <Plus size={22} aria-hidden="true" />
        </span>
        <span className="text-lg font-semibold">서버 연결</span>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-zinc-950/50" />
        <Dialog.Positioner className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
          <Dialog.Content className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <Dialog.Title className="text-xl font-semibold text-zinc-950">
                서버 연결
              </Dialog.Title>
              <Dialog.CloseTrigger
                aria-label="닫기"
                className="flex size-9 shrink-0 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <X size={20} aria-hidden="true" />
              </Dialog.CloseTrigger>
            </div>

            <form
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                void form.handleSubmit();
              }}
              className="grid gap-5"
            >
              <form.Field
                name="name"
                validators={{
                  onSubmit: ({ value }) =>
                    value.trim() ? undefined : "서버 이름을 입력하세요.",
                }}
              >
                {(field) => (
                  <div className="grid gap-2">
                    <label htmlFor="server-name" className="text-sm font-medium text-zinc-700">
                      이름
                    </label>
                    <input
                      ref={nameInputRef}
                      id="server-name"
                      name={field.name}
                      type="text"
                      placeholder="서버 이름"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                      aria-invalid={!field.state.meta.isValid || undefined}
                      aria-describedby={!field.state.meta.isValid ? "server-name-error" : undefined}
                      className={inputClassName}
                    />
                    {!field.state.meta.isValid && (
                      <p id="server-name-error" className="text-sm text-red-600">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="url"
                validators={{
                  onSubmit: ({ value }) => {
                    try {
                      const url = new URL(value.trim());
                      return url.protocol === "http:" || url.protocol === "https:"
                        ? undefined
                        : "http 또는 https 주소를 입력하세요.";
                    } catch {
                      return "올바른 주소를 입력하세요.";
                    }
                  },
                }}
              >
                {(field) => (
                  <div className="grid gap-2">
                    <label htmlFor="server-url" className="text-sm font-medium text-zinc-700">
                      주소
                    </label>
                    <input
                      ref={urlInputRef}
                      id="server-url"
                      name={field.name}
                      type="url"
                      placeholder="https://example.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                      aria-invalid={!field.state.meta.isValid || undefined}
                      aria-describedby={!field.state.meta.isValid ? "server-url-error" : undefined}
                      className={inputClassName}
                    />
                    {!field.state.meta.isValid && (
                      <p id="server-url-error" className="text-sm text-red-600">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <Button type="submit" className="mt-1 w-full">
                접속
              </Button>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

function AuthPage() {
  const navigate = useNavigate({ from: "/auth" });
  const servers = useServersStore((state) => state.servers);
  const setCurrentServer = useServersStore((state) => state.setCurrentServer);

  return (
    <main className="min-h-dvh bg-white px-6 py-10 sm:px-10 sm:py-14">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight text-zinc-950">
        서버 접속
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ServerConnectDialog />
        {servers.map((server) => (
          <button
            key={server.url}
            type="button"
            onClick={() => {
              setCurrentServer(server.url);
              void navigate({ to: "/home" });
            }}
            className="flex min-h-40 w-full cursor-pointer flex-col items-start justify-between rounded-xl border border-zinc-200 bg-white p-5 text-left transition-colors hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
              <Server size={20} aria-hidden="true" />
            </span>
            <span className="w-full min-w-0">
              <span className="block truncate text-lg font-semibold text-zinc-950">
                {server.name}
              </span>
              <span className="mt-1 block truncate text-sm text-zinc-500">
                {server.url}
              </span>
            </span>
          </button>
        ))}
      </div>
    </main>
  );
}

export default AuthPage;
