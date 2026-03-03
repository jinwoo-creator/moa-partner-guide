"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { searchEntries, type SearchEntry } from "@/lib/search";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      return;
    }

    const lower = q.toLowerCase();
    const matched = searchEntries.filter(
      (entry) =>
        entry.title.toLowerCase().includes(lower) ||
        entry.content.toLowerCase().includes(lower) ||
        entry.section.toLowerCase().includes(lower)
    );
    setResults(matched);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="fixed inset-x-4 top-20 mx-auto max-w-lg">
        <div className="rounded-xl bg-white shadow-2xl ring-1 ring-gray-200">
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="검색어를 입력하세요..."
              className="flex-1 text-sm outline-none placeholder:text-gray-400"
            />
            <button
              onClick={onClose}
              className="rounded p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto p-2">
            {query && results.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-gray-400">
                검색 결과가 없습니다.
              </p>
            )}
            {results.map((result) => (
              <Link
                key={result.id}
                href={result.href}
                onClick={onClose}
                className="block rounded-lg px-3 py-2.5 hover:bg-gray-50 transition-colors"
              >
                <div className="text-sm font-medium text-gray-900">
                  {result.title}
                </div>
                <div className="text-xs text-gray-400">{result.section}</div>
              </Link>
            ))}
            {!query && (
              <p className="px-3 py-6 text-center text-sm text-gray-400">
                가이드 페이지를 검색하세요
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-4 py-2 text-xs text-gray-400">
            <kbd className="rounded border border-gray-200 px-1.5 py-0.5 text-[10px] font-mono">
              ESC
            </kbd>{" "}
            닫기
          </div>
        </div>
      </div>
    </div>
  );
}
