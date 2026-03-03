import { DocsLayout } from "@/components/DocsLayout";

export default function GettingStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsLayout>{children}</DocsLayout>;
}
