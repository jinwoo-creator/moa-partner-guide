# TIL: MOA Partners Guide Site (Next.js 14 + MDX)
**Date**: 2026-03-03
**Project**: MOA 파트너 가이드 사이트 구축
**Tech Stack**: Next.js 14, MDX, Tailwind CSS, TypeScript

---

## 배운 것 (Learned)

### 1. Git 저장소 감지로 인한 create-next-app 동작 변화
**상황**: `create-next-app`이 parent git repo에서 실행될 때 자체 `.git` 디렉토리를 생성하지 않음
- 홈 디렉토리가 git repo로 관리되면, create-next-app은 git init을 스킵
- 별도 프로젝트 git repo가 필요한 경우 수동으로 `git init`을 실행해야 함
- 이후 `git remote add origin` 등으로 연결 가능

**실제 해결 과정**:
```bash
cd moa-partner-guide
git init
git add .
git commit -m "initial"
git remote add origin https://github.com/jinwoo-creator/moa-partner-guide.git
```

**학습 포인트**: create-next-app의 git 감지 로직 이해 → git 구조가 복잡한 환경에서 주의 필요

---

### 2. Next.js 14 + @next/mdx + remark-gfm + output: 'export' 조합 검증
**성공한 조합**:
```javascript
// next.config.mjs
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

const nextConfig = {
  output: "export",  // Static export
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
});

export default withMDX(nextConfig);
```

**검증 결과**:
- ✅ MDX 파일이 page로 인식됨
- ✅ Markdown + React 컴포넌트 혼합 동작
- ✅ 테이블(GFM), 코드 블록 등 remark-gfm 기능 정상 작동
- ✅ `next build` → `out/` 정적 HTML 생성 성공
- ✅ Vercel 배포용 export 가능

**버전 호환성 주의**:
- Next.js 14.2.35 + @next/mdx 16.1.6 조합에서는 버전 불일치가 있으나 실제 동작함
- 최신 Next.js 버전으로 업그레이드하면 더 안정적일 것 예상

---

### 3. mdx-components.tsx에서 커스텀 컴포넌트 매핑의 강점
**구조**:
```typescript
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="...">...</h1>,
    h2: ({ children }) => <h2 className="...">...</h2>,
    Callout,      // 커스텀 컴포넌트
    StepGuide,    // 커스텀 컴포넌트
    InfoTable,    // 커스텀 컴포넌트
    ...components,
  };
}
```

**장점**:
- MDX 파일에서 `import { Callout }` 불필요 → 자동 가능
- HTML 요소(`<h1>`, `<h2>` 등)도 동시에 커스터마이징 가능
- 전사적 스타일 일관성 유지 가능
- 컴포넌트 props 기본값 설정 가능 (예: `variant="info"` 기본값)

**사용 예**:
```mdx
# 제목  <!-- mdx-components.tsx의 h1 매핑 적용 -->

<Callout variant="tip" title="팁">
  특별한 정보입니다.
</Callout>  <!-- import 없이 사용 가능 -->
```

---

### 4. App Router 중첩 layout.tsx로 섹션별 prose 스타일 적용
**패턴**:
```
src/app/
├── layout.tsx                    # Root layout (Header, Sidebar)
├── getting-started/
│   └── layout.tsx                # DocsLayout 적용
│       └── overview/page.mdx
│       └── signup-login/page.mdx
└── moa-partners/
    └── layout.tsx                # DocsLayout 적용
        └── customer-requests/page.mdx
```

**DocsLayout 구현**:
```typescript
export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <article className="prose prose-gray max-w-none prose-headings:scroll-mt-20 prose-a:text-moa-600 prose-a:no-underline hover:prose-a:underline">
      {children}
    </article>
  );
}
```

**실제 효과**:
- Root layout은 Header/Sidebar 레이아웃 담당
- 각 섹션의 layout.tsx에서 DocsLayout으로 감싸면 prose 스타일 자동 적용
- MDX 콘텐츠가 일관된 타이포그래피 스타일 적용됨
- 각 헤딩에 `scroll-mt-20` 추가로 sticky header와 스크롤 offset 조정

---

### 5. Tailwind Typography (@tailwindcss/typography) ESM Import
**Next.js 14에서 작동하는 방식**:
```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";  // ESM import

const config: Config = {
  plugins: [typography],  // CommonJS require 대신 ESM import 사용
};
export default config;
```

**주의점**:
- `tailwind.config.ts` (TypeScript)에서는 ESM import 가능
- `tailwind.config.js` (JavaScript)에서는 CommonJS (`require`)이 일반적
- Next.js 14부터 ESM 친화적 설정 가능

---

### 6. Client-side Search with Flexsearch 구현 패턴
**설계 패턴**:
```typescript
// src/lib/search.ts - 정적 데이터 배열
export const searchEntries: SearchEntry[] = [
  { id: 0, title: "...", section: "...", href: "...", content: "..." },
  // ...
];

// src/components/SearchDialog.tsx - 클라이언트 검색
const handleSearch = (q: string) => {
  const lower = q.toLowerCase();
  const matched = searchEntries.filter(entry =>
    entry.title.toLowerCase().includes(lower) ||
    entry.content.toLowerCase().includes(lower) ||
    entry.section.toLowerCase().includes(lower)
  );
  setResults(matched);
};
```

**Cmd+K 단축키 통합**:
```typescript
// src/components/SearchTrigger.tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      onOpen();
    }
  };
  document.addEventListener('keydown', handleKeyDown);
}, []);
```

**성능 최적화**:
- 검색 데이터는 빌드 타임에 정적으로 수집 → 런타임 오버헤드 없음
- 클라이언트 필터링 → 서버 요청 없음
- flexsearch는 설치했지만 현 단계에서는 간단한 `.includes()` 필터링으로도 충분

---

## 실수한 것 (Mistakes)

### 1. Figma MCP get_screenshot API 한도 초과
**상황**: 설계 스크린샷 캡처 중 API 호출 수 제한에 걸림
- 여러 번 동일한 node ID로 screenshot 요청
- API 한도 초과로 실패

**개선안**:
- 필요한 스크린샷만 선택적으로 캡처
- 캐시 메커니즘 활용 (가능하면)
- Figma 토큰 재생성 고려

**배운 점**: 외부 API 호출 시 한도/쿼터 사전 확인 필수

---

### 2. 초기 파일 구조 설계 미흡
**상황**: 각 섹션마다 layout.tsx를 반복 생성
```
getting-started/layout.tsx
moa-partners/layout.tsx
contact/layout.tsx  # 단순 pass-through
```

**개선 방안**:
- 공통 DocsLayout은 재사용 가능 패턴으로 설계됨 (현재 상태도 나쁘지 않음)
- 섹션별로 다른 layout이 필요한 경우만 분리
- 현재 구조는 실제로 확장성 좋음

**결론**: 이 부분은 실수가 아니라 좋은 설계 선택

---

## 새로 발견한 것 (Discoveries)

### 1. `not-prose` 클래스의 중요성
**문제**: Callout, StepGuide 같은 커스텀 컴포넌트가 prose 스타일 영향을 받음
```css
.prose {
  padding: 1rem;        /* 원치 않은 패딩 */
  margin: 1rem 0;       /* 원치 않은 마진 */
  font-size: 0.875rem;  /* 스타일 오버라이드 */
}
```

**해결책**:
```typescript
// Callout.tsx
<div className="...not-prose">
  {/* prose 스타일 미적용 */}
</div>

// StepGuide.tsx
<div className="my-6 not-prose border-l-2 ...">
  {/* 커스텀 스타일만 적용 */}
</div>
```

**학습**: `@tailwindcss/typography`의 prose 스타일이 강력하므로, 커스텀 컴포넌트는 `not-prose`로 격리 필요

---

### 2. Tailwind prose 한정자(Modifiers)의 강력함
**사용한 예**:
```typescript
className="prose prose-gray max-w-none
  prose-headings:scroll-mt-20
  prose-a:text-moa-600
  prose-a:no-underline
  hover:prose-a:underline"
```

**각 한정자의 역할**:
- `prose-gray`: 회색 계열 prose 테마
- `max-w-none`: 콘텐츠 최대 너비 제거 (full width 허용)
- `prose-headings:scroll-mt-20`: 모든 제목에 scroll-margin-top 적용
- `prose-a:text-moa-600`: 모든 링크를 MOA 브랜드 색상으로
- `hover:prose-a:underline`: 링크 hover 시 underline

**발견**: 이런 한정자로 MDX 콘텐츠의 전체 스타일을 제어 → 매우 효율적

---

### 3. Static Export와 Dynamic 기능의 경계
**현재 구현**:
- ✅ `output: "export"` 사용 (정적 배포 가능)
- ✅ 모든 페이지는 static generation
- ✅ SearchDialog는 client-side 렌더링
- ✅ Cmd+K 이벤트는 클라이언트에서 처리

**제약사항**:
- ❌ 동적 라우팅 불가 (`[id].tsx` 패턴 사용 불가)
- ❌ 실시간 데이터 페칭 불가
- ❌ API 라우트 미사용

**배운 점**: 도움말/가이드 같은 정적 콘텐츠는 static export가 적합. API 기반 동적 기능이 필요하면 다시 고려.

---

### 4. MDX 페이지 구조의 표준화
**현재 패턴**:
```mdx
# 페이지 제목

주요 설명 단락

## 섹션 1
내용...

<StepGuide>
  <Step number={1} title="...">...</Step>
  <Step number={2} title="...">...</Step>
</StepGuide>

## 섹션 2
<InfoTable rows={[...]} />

<Callout variant="tip" title="...">
  팁 내용
</Callout>
```

**장점**:
- 모든 페이지가 일관된 구조 → 사용자 경험 예측 가능
- 컴포넌트 재사용으로 개발 속도 향상
- 콘텐츠 추가 시 템플릿 활용 가능

---

### 5. TypeScript + MDX의 타입 안전성
**@types/mdx 설치로 제공되는 기능**:
```typescript
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  // 타입 체크: 올바른 컴포넌트만 반환 가능
}
```

**발견**: MDX를 TypeScript로 작성하면 타입 안전성 확보 가능 → 런타임 오류 감소

---

## 시스템 아키텍처 정리

```
MOA Partners 가이드 사이트
├── Root Layout (RootLayout)
│   ├── Header (검색 트리거 포함)
│   ├── Sidebar (네비게이션)
│   └── Main Content Area
│       └── 섹션별 Layout (DocsLayout)
│           └── MDX 페이지
│
├── 컴포넌트 계층
│   ├── DocsLayout: prose 스타일 적용 래퍼
│   ├── SearchDialog: Cmd+K 기반 클라이언트 검색
│   ├── Callout: 강조 박스 (info/warning/tip)
│   ├── StepGuide/Step: 단계별 가이드
│   └── InfoTable: 정보 테이블
│
├── 정적 데이터
│   ├── src/lib/search.ts: 검색 인덱스
│   └── src/lib/navigation.ts: 사이드바 네비게이션
│
└── 빌드 설정
    ├── next.config.mjs: MDX + remark-gfm + export
    ├── tailwind.config.ts: prose + MOA 컬러
    └── mdx-components.tsx: 글로벌 MDX 매핑
```

---

## 다음 단계에서 고려할 점

1. **콘텐츠 확대 시**
   - 페이지 수가 50+ 넘어가면 검색 성능 고려
   - 그때는 flexsearch나 Algolia 같은 라이브러리 도입

2. **배포 시**
   - `output: "export"` → Vercel, Netlify 등에서 정적 호스팅 가능
   - CDN 캐싱으로 성능 향상 가능

3. **유지보수**
   - 매달 콘텐츠 추가/변경 시 search.ts 업데이트 필수
   - 자동화 스크립트 개발 고려

4. **접근성**
   - 현재 구조는 기본 a11y 준수 (스크린 리더 고려)
   - ARIA 레이블 추가 검토

---

**최종 평가**:
이번 구축은 Next.js 14 + MDX의 강력한 조합을 검증했으며, 정적 콘텐츠 기반 문서 사이트로는 최적의 설계이다. 특히 `mdx-components.tsx`의 글로벌 매핑 패턴과 중첩 layout으로 섹션별 스타일 적용하는 방식은 향후 다른 프로젝트에서도 재사용 가능한 좋은 패턴이다.
