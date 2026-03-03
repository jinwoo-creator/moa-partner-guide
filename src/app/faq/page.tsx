"use client";

import { FaqAccordion } from "@/components/FaqAccordion";
import Link from "next/link";

const faqItems = [
  {
    question: "파트너사 전용코드는 어디서 받을 수 있나요?",
    answer:
      "파트너사 전용코드는 MOA와 파트너십 업무 협약을 완료한 후 담당자를 통해 발급됩니다. 코드를 받지 못하셨다면 담당자에게 문의해 주세요.",
  },
  {
    question: "한 파트너사에서 여러 직원이 가입할 수 있나요?",
    answer:
      "네, 가능합니다. 같은 파트너사 전용코드를 사용하여 여러 직원이 개별 계정으로 가입할 수 있으며, 동일한 소속으로 자동 연결됩니다.",
  },
  {
    question: "매물 제안 요청 참여 시간이 지나면 어떻게 되나요?",
    answer:
      "알림 수신 후 3시간 이내에 참여해야 합니다. 시간 초과 시 자동으로 마감 처리되며 재참여가 불가능합니다.",
  },
  {
    question: "PDF 일괄 등록으로 매물을 등록하면 바로 고객에게 제안되나요?",
    answer:
      "아닙니다. PDF 일괄 등록으로 자동 입력된 정보는 담당자의 검수가 완료된 후에야 고객에게 제안됩니다. 자동 입력 내용의 정확성을 반드시 확인해 주세요.",
  },
  {
    question: "고객의 조건이 변경되면 어떻게 알 수 있나요?",
    answer:
      "고객의 주요 조건이 변경되면 카카오 알림톡으로 통지되며, 고객 상세 페이지에서 버전별 변경 이력을 확인할 수 있습니다.",
  },
  {
    question: "MOA 담당자에게 어떻게 문의하나요?",
    answer:
      "MOA Partners 화면 우측 하단의 말풍선 버튼을 클릭하여 실시간으로 문의할 수 있습니다. 또는 문의하기 페이지의 이메일로 연락하실 수 있습니다.",
  },
];

export default function FaqPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
        자주 묻는 질문
      </h1>
      <p className="text-gray-500 mb-8">
        파트너분들이 자주 문의하는 질문과 답변을 모았습니다.
      </p>

      <FaqAccordion items={faqItems} />

      <div className="mt-10 rounded-lg bg-gray-50 p-6 text-center">
        <p className="text-sm text-gray-600 mb-3">
          원하는 답변을 찾지 못하셨나요?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-lg bg-moa-500 px-4 py-2 text-sm font-medium text-white hover:bg-moa-600 transition-colors"
        >
          문의하기
        </Link>
      </div>
    </div>
  );
}
