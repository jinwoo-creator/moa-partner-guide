"use client";

import { useState, useCallback } from "react";
import "./globals.css";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { MobileMenu } from "@/components/MobileMenu";
import { SearchTrigger } from "@/components/SearchTrigger";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuClose = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <html lang="ko">
      <head>
        <title>MOA Partners 가이드</title>
        <meta
          name="description"
          content="MOA 파트너를 위한 사용 가이드 사이트"
        />
      </head>
      <body className="antialiased">
        <Header
          onMenuToggle={() => setMobileMenuOpen((prev) => !prev)}
          searchTrigger={<SearchTrigger />}
        />
        <MobileMenu isOpen={mobileMenuOpen} onClose={handleMenuClose} />

        <div className="mx-auto max-w-7xl lg:flex">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block lg:w-64 lg:shrink-0 lg:border-r lg:border-gray-200">
            <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-6">
              <Sidebar />
            </div>
          </aside>

          {/* Main content */}
          <main className="min-w-0 flex-1 px-4 py-8 lg:px-10 lg:py-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
