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

## 모바일 앱

`apps/mobile`은 Expo 앱입니다. `apps/web`의 화면과 CSS를 빌드할 때 APK에 포함하고, 앱 안의 WebView에서 엽니다. 웹 프런트엔드의 배포 주소는 필요하지 않습니다.

```bash
pnpm install
pnpm --filter mobile start
```

Expo 개발 서버는 개발할 때만 필요합니다. 설치된 APK는 웹 화면을 오프라인에서도 열 수 있습니다. 파일을 조회하거나 수정하려면 앱의 로그인 화면에 WebDAV 서버 주소를 입력하고, 기기에서 그 서버에 연결할 수 있어야 합니다. Tailscale 전용 WebDAV 서버라면 실기기에도 Tailscale을 설치하고 같은 tailnet에 연결해야 합니다. 서버는 WebView의 `file://` 출처에서 보내는 요청도 허용해야 합니다.

설치 가능한 Android APK는 `apps/mobile`에서 `eas build --platform android --profile preview`로 빌드합니다.

웹의 Zustand 서버 목록(`daver-servers`)은 앱 안 WebView의 `localStorage`에 저장됩니다. 앱을 다시 열면 같은 WebView 저장소에서 복원되며, 외부 브라우저나 React Native 상태와는 공유되지 않습니다. 작업 공간 상태는 해시 URL의 검색 파라미터에 있으므로 화면 이동 중에는 유지되지만 앱을 새로 실행하면 초기 URL에서 시작합니다. TanStack Query의 API 데이터는 메모리 캐시여서 앱을 다시 실행하면 새로 가져옵니다. 앱 데이터를 삭제하면 저장된 서버 목록도 삭제됩니다.
