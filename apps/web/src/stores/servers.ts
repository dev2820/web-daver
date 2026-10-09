import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Server = {
  name: string;
  url: string;
};

type ServersStore = {
  servers: Server[];
  currentServerUrl: string | null;
  addServer: (server: Server) => void;
  removeServer: (url: string) => void;
  setCurrentServer: (url: string) => void;
};

export const useServersStore = create<ServersStore>()(
  persist(
    (set) => ({
      servers: [],
      currentServerUrl: null,
      addServer: (server) =>
        set((state) =>
          state.servers.some((saved) => saved.url === server.url)
            ? state
            : { servers: [...state.servers, server] },
        ),
      removeServer: (url) =>
        set((state) => ({
          servers: state.servers.filter((server) => server.url !== url),
          currentServerUrl:
            url === state.currentServerUrl ? null : state.currentServerUrl,
        })),
      setCurrentServer: (url) =>
        set((state) =>
          state.servers.some((server) => server.url === url)
            ? { currentServerUrl: url }
            : state,
        ),
    }),
    {
      name: "daver-servers",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        servers: state.servers,
        currentServerUrl: state.currentServerUrl,
      }),
    },
  ),
);
