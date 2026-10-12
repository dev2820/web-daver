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

`apps/mobile`은 Expo 앱입니다. WebView에서 `apps/web`의 배포 주소나 개발 서버 주소를 엽니다.

```bash
pnpm install
pnpm --filter web dev --host 0.0.0.0
```

다른 터미널에서 모바일 앱을 실행합니다. `EXPO_PUBLIC_WEB_URL`을 설정하지 않으면 앱에서 웹 주소를 입력할 수 있습니다. 입력한 주소는 기기에 저장되어 다음 실행에도 사용됩니다. `.env.example`을 `.env`로 복사해 `EXPO_PUBLIC_WEB_URL`을 설정하면 기본 주소로 사용합니다.

```bash
pnpm --filter mobile start
```

실기기는 컴퓨터와 같은 네트워크에 연결하고 컴퓨터의 LAN IP를 사용합니다. Android 에뮬레이터에서는 `http://10.0.2.2:5173`, iOS 시뮬레이터에서는 `http://localhost:5173`을 사용할 수 있습니다. 개발 서버는 실행 중이어야 합니다. Tailscale 전용 주소를 사용하려면 Android 기기도 같은 tailnet에 연결해야 합니다.

설치 가능한 Android APK는 `apps/mobile`에서 `eas build --platform android --profile preview`로 빌드합니다. APK를 실행하면 웹 주소를 입력할 수 있습니다.

웹 주소는 모바일 앱의 AsyncStorage에 저장됩니다. 웹의 Zustand 서버 목록(`daver-servers`)은 WebView의 `localStorage`에 저장됩니다. 같은 앱과 웹 출처를 다시 열면 복원됩니다. 외부 브라우저의 저장소나 모바일 네이티브 저장소와는 공유되지 않습니다. 작업 공간 상태는 `/home` URL의 검색 파라미터에 있으므로 URL 이동 중에는 유지되지만 앱을 새로 실행하면 초기 URL에서 시작합니다. TanStack Query의 API 데이터는 메모리 캐시여서 앱을 다시 실행하면 새로 가져옵니다. WebView의 HTTP 캐시는 브라우저 캐시 정책을 따르며 오프라인 사용을 보장하지 않습니다. 웹 출처를 바꾸거나 앱 데이터를 삭제하면 저장된 서버 목록도 사용할 수 없습니다.
