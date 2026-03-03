export interface NavItem {
  title: string;
  href: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    label: "시작하기",
    items: [
      { title: "프로그램 소개", href: "/getting-started/overview" },
      { title: "회원가입 & 로그인", href: "/getting-started/signup-login" },
    ],
  },
  {
    label: "MOA Partners 사용법",
    items: [
      { title: "매물 제안 요청 관리", href: "/moa-partners/customer-requests" },
      { title: "고객 상세 조회", href: "/moa-partners/customer-detail" },
      { title: "매물 제안 및 관리", href: "/moa-partners/listing-proposal" },
      { title: "담당자 소통", href: "/moa-partners/communication" },
      { title: "알림 내역", href: "/moa-partners/notifications" },
    ],
  },
  {
    label: "도움말",
    items: [
      { title: "자주 묻는 질문", href: "/faq" },
      { title: "문의하기", href: "/contact" },
    ],
  },
];
