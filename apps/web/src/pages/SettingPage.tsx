import { Badge, Card } from '@/components/ui'

function SettingPage() {
  return (
    <main className="max-w-[680px] py-16 md:py-24">
      <Badge>SETTING</Badge>
      <h1 className="mt-5 text-4xl font-bold tracking-[-0.05em] md:text-5xl">설정</h1>
      <Card.Root className="mt-8">
        <Card.Header>
          <Card.Title>서비스 설정</Card.Title>
          <Card.Description>설정 항목을 추가할 자리입니다.</Card.Description>
        </Card.Header>
      </Card.Root>
    </main>
  )
}

export default SettingPage
