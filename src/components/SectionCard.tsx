import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface SectionCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export function SectionCard({
  href,
  icon: Icon,
  title,
  description,
}: SectionCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-gray-200 p-5 transition-all hover:border-moa-300 hover:shadow-md"
    >
      <div className="mb-3 inline-flex rounded-lg bg-moa-50 p-2.5 text-moa-500 group-hover:bg-moa-100 transition-colors">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </Link>
  );
}
