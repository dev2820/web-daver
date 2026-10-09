# Daver

웹 앱을 먼저 구성한 pnpm 모노레포입니다. 웹 앱은 `apps/web`에 있으며 Vite, React, TypeScript, Ark UI, Tailwind CSS v4를 사용합니다.

TanStack Router로 `/auth`, `/home`, `/setting` 경로를 구성했습니다. `/`로 접속하면 `/home`으로 이동합니다.

서버 목록은 Zustand로 관리하며, `{ name, url }` 배열과 현재 선택한 서버의 URL을 브라우저의 `localStorage`에 저장합니다. 로그인 화면에서 서버를 저장하거나 선택할 수 있으며, 같은 URL은 중복 저장하지 않습니다.

## 실행

Node.js 22.12 이상과 pnpm 9가 필요합니다.

```bash
nvm use
pnpm install
pnpm dev
```

`pnpm build`로 프로덕션 빌드를 확인하고, `pnpm lint`로 코드를 검사할 수 있습니다.
