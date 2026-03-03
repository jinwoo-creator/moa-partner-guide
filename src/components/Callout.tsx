import { Info, AlertTriangle, Lightbulb } from "lucide-react";
import clsx from "clsx";

const variants = {
  info: {
    icon: Info,
    bg: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-500",
    title: "text-blue-800",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-500",
    title: "text-amber-800",
  },
  tip: {
    icon: Lightbulb,
    bg: "bg-green-50 border-green-200",
    iconColor: "text-green-500",
    title: "text-green-800",
  },
};

interface CalloutProps {
  variant?: keyof typeof variants;
  title?: string;
  children: React.ReactNode;
}

export function Callout({
  variant = "info",
  title,
  children,
}: CalloutProps) {
  const v = variants[variant];
  const Icon = v.icon;

  return (
    <div
      className={clsx(
        "my-6 rounded-lg border p-4 not-prose",
        v.bg
      )}
    >
      <div className="flex gap-3">
        <Icon className={clsx("h-5 w-5 mt-0.5 shrink-0", v.iconColor)} />
        <div>
          {title && (
            <p className={clsx("font-semibold text-sm mb-1", v.title)}>
              {title}
            </p>
          )}
          <div className="text-sm text-gray-700 [&>p]:mt-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
