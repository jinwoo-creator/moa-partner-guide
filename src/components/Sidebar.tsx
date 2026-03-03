"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";
import clsx from "clsx";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6">
      {navigation.map((group) => (
        <div key={group.label}>
          <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            {group.label}
          </h4>
          <ul className="space-y-0.5">
            {group.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    pathname === item.href
                      ? "sidebar-link-active"
                      : "sidebar-link"
                  )}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
