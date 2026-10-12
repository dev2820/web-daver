import { Navigate, Outlet, useLocation } from "@tanstack/react-router";
import { useServersStore } from "@/stores/servers";

function App() {
  const isAuth = useLocation({
    select: (location) => location.pathname === "/auth",
  });
  const currentServerUrl = useServersStore((state) => state.currentServerUrl);

  if (isAuth) return <Outlet />;
  if (!currentServerUrl) return <Navigate to="/auth" replace />;

  return (
    <div className="min-h-dvh bg-white text-zinc-950 w-full">
      <div className="px-6 md:px-10">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
