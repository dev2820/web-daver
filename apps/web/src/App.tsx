import { Link, Outlet } from '@tanstack/react-router'
import { Layers3 } from 'lucide-react'

const navLink = 'rounded-lg px-2 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 data-[status=active]:bg-blue-50 data-[status=active]:text-blue-700 md:px-3'

function App() {
  return (
    <div className="min-h-dvh bg-zinc-50 text-zinc-950">
      <div className="mx-auto max-w-[1080px] px-6 md:px-10">
        <header className="flex min-h-20 items-center justify-between gap-3 border-b border-zinc-200">
          <Link to="/home" className="inline-flex shrink-0 items-center gap-2.5 text-lg font-bold tracking-[-0.04em] text-zinc-950 no-underline">
            <span className="grid size-9 place-items-center rounded-lg bg-blue-600 text-white">
              <Layers3 size={19} strokeWidth={2} aria-hidden="true" />
            </span>
            daver
          </Link>
          <nav aria-label="주요 메뉴" className="flex items-center gap-1">
            <Link to="/home" className={navLink}>홈</Link>
            <Link to="/setting" className={navLink}>설정</Link>
            <Link to="/auth" className={navLink}>로그인</Link>
          </nav>
        </header>
        <Outlet />
      </div>
    </div>
  )
}

export default App
