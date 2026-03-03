"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

interface HeaderProps {
  onMenuToggle: () => void;
  searchTrigger?: React.ReactNode;
}

export function Header({ onMenuToggle, searchTrigger }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
        <button
          onClick={onMenuToggle}
          className="lg:hidden -ml-1 p-1.5 text-gray-500 hover:text-gray-700"
          aria-label="메뉴 열기"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-moa-500 text-lg font-bold">MOA</span>
          <span className="text-gray-400 text-sm">Partners 가이드</span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          {searchTrigger}
        </div>
      </div>
    </header>
  );
}
