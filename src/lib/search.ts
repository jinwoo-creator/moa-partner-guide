export interface SearchEntry {
  id: number;
  title: string;
  section: string;
  href: string;
  content: string;
}

export const searchEntries: SearchEntry[] = [
  {
    id: 0,
    title: "프로그램 소개",
    section: "시작하기",
    href: "/getting-started/overview",
    content:
      "MOA 파트너 프로그램 소개 협업 모델 임차기업 고객 영업 기회 매출 증대 파트너 가치",
  },
  {
    id: 1,
    title: "회원가입 & 로그인",
    section: "시작하기",
    href: "/getting-started/signup-login",
    content:
      "회원가입 로그인 전화번호 인증 계정 정보 소속 부동산 인증 파트너사 전용코드 약관",
  },
  {
    id: 2,
    title: "매물 제안 요청 관리",
    section: "MOA Partners 사용법",
    href: "/moa-partners/customer-requests",
    content:
      "매물 제안 요청 신규 고객 참여 중인 요청 미참여 종료 카카오 알림톡 3시간 마감 참여 방법",
  },
  {
    id: 3,
    title: "고객 상세 조회",
    section: "MOA Partners 사용법",
    href: "/moa-partners/customer-detail",
    content:
      "고객 상세 고객사명 위치 면적 예산 입주 시기 필수 선택 조건 변경 이력 진행 현황 피드백",
  },
  {
    id: 4,
    title: "매물 제안 및 관리",
    section: "MOA Partners 사용법",
    href: "/moa-partners/listing-proposal",
    content:
      "매물 등록 제안 관리 필수 입력 선택 항목 PDF 일괄 등록 자동 입력 검수 수정 삭제 참여 중단",
  },
  {
    id: 5,
    title: "담당자 소통",
    section: "MOA Partners 사용법",
    href: "/moa-partners/communication",
    content:
      "담당자 소통 말풍선 메시지 파일 업로드 문의 매니저 채팅 소통 내역",
  },
  {
    id: 6,
    title: "알림 내역",
    section: "MOA Partners 사용법",
    href: "/moa-partners/notifications",
    content:
      "알림 내역 알림 패널 필터 전체 안읽음 읽음 처리 카카오 알림톡 연동 종 아이콘",
  },
  {
    id: 7,
    title: "자주 묻는 질문",
    section: "도움말",
    href: "/faq",
    content:
      "FAQ 자주 묻는 질문 전용코드 여러 직원 가입 시간 초과 PDF 일괄 등록 조건 변경 문의",
  },
  {
    id: 8,
    title: "문의하기",
    section: "도움말",
    href: "/contact",
    content:
      "문의하기 담당자 김진범 이메일 jinbeom mile 연락처 도움 지원",
  },
];
