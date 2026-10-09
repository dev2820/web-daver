import { ArrowUpRight } from 'lucide-react'
import { Badge, Button, Card } from '@/components/ui'

function HomePage() {
  return (
    <main className="py-16 md:py-24">
      <div className="max-w-[680px]">
        <Badge>새로운 시작</Badge>
        <h1 className="mt-5 text-4xl font-bold leading-[1.12] tracking-[-0.055em] md:text-6xl">
          Daver 웹 서비스의
          <br />
          첫 화면입니다.
        </h1>
        <p className="mt-6 max-w-[560px] text-base leading-7 text-zinc-600 md:text-lg md:leading-8">
          웹 앱의 기본 구조와 화면 구성을 준비했습니다. 다음 단계에서 서비스에 필요한 기능과 콘텐츠를 이곳에 추가할 수 있습니다.
        </p>
        <Button asChild className="mt-8">
          <a href="https://ark-ui.com/docs/overview/introduction" target="_blank" rel="noreferrer">
            Ark UI 살펴보기 <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </Button>
      </div>

      <section aria-label="현재 구성" className="mt-16 md:mt-24">
        <Card.Root className="max-w-[680px]">
          <Card.Header>
            <Card.Title>현재 구성</Card.Title>
            <Card.Description>웹 서비스 개발을 위한 기본 도구가 연결되어 있습니다.</Card.Description>
          </Card.Header>
          <Card.Body>
            <div className="flex flex-wrap gap-2">
              <Badge variant="surface">Vite</Badge>
              <Badge variant="surface">TypeScript</Badge>
              <Badge variant="surface">Ark UI</Badge>
              <Badge variant="surface">Tailwind CSS</Badge>
              <Badge variant="surface">TanStack Router</Badge>
            </div>
          </Card.Body>
        </Card.Root>
      </section>
    </main>
  )
}

export default HomePage
