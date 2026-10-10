# 코드 작성 규칙

## Tailwind 클래스

- 한 곳에서만 쓰는 클래스는 요소의 `className`에 직접 작성한다.
- 클래스 재사용만을 위해 문자열을 상수로 분리하지 않는다. `const inputClassName = "..."` 같은 패턴을 사용하지 않는다.
- 여러 곳에서 공유할 클래스와 변형은 `class-variance-authority`의 `cva`로 정의한다. 호출할 때 변형을 선택하고, 해당 요소에만 필요한 클래스는 호출 인자로 전달한다.

## Lucide 아이콘

- `lucide-react`에서 아이콘을 가져올 때 이름이 `Icon`으로 끝나는 export를 사용한다. 예: `import { FilesIcon, XIcon } from "lucide-react";`.
