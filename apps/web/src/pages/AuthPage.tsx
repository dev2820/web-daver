import { Badge, Card } from '@/components/ui'

function AuthPage() {
  return (
    <main className="max-w-[680px] py-16 md:py-24">
      <Badge>AUTH</Badge>
      <h1 className="mt-5 text-4xl font-bold tracking-[-0.05em] md:text-5xl">로그인</h1>
      <Card.Root className="mt-8">
        <Card.Header>
          <Card.Title>인증 화면</Card.Title>
          <Card.Description>로그인 기능을 추가할 자리입니다.</Card.Description>
        </Card.Header>
      </Card.Root>
    </main>
  )
}

export default AuthPage
