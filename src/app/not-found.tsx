import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <h2 className="mt-4 text-xl font-semibold text-gray-900">
        페이지를 찾을 수 없습니다
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-lg bg-moa-500 px-4 py-2 text-sm font-medium text-white hover:bg-moa-600 transition-colors"
      >
        가이드 홈으로 돌아가기
      </Link>
    </div>
  );
}
