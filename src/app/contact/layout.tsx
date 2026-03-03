import { DocsLayout } from "@/components/DocsLayout";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsLayout>{children}</DocsLayout>;
}
