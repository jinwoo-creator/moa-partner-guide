import { BookOpen, Building2, HelpCircle, Mail } from "lucide-react";
import { SectionCard } from "@/components/SectionCard";

export default function Home() {
  return (
    <div className="max-w-3xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          MOA Partners 가이드
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          MOA 파트너를 위한 서비스 사용 가이드입니다. 아래 섹션에서 필요한
          정보를 찾아보세요.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <SectionCard
          href="/getting-started/overview"
          icon={BookOpen}
          title="시작하기"
          description="MOA 파트너 프로그램 소개와 회원가입 방법을 알아보세요."
        />
        <SectionCard
          href="/moa-partners/customer-requests"
          icon={Building2}
          title="MOA Partners 사용법"
          description="매물 제안 요청 관리, 고객 조회, 매물 등록 방법을 확인하세요."
        />
        <SectionCard
          href="/faq"
          icon={HelpCircle}
          title="자주 묻는 질문"
          description="파트너분들이 자주 문의하는 질문과 답변을 모았습니다."
        />
        <SectionCard
          href="/contact"
          icon={Mail}
          title="문의하기"
          description="추가 도움이 필요하시면 담당자에게 문의하세요."
        />
      </div>
    </div>
  );
}
