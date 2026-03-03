interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <article className="prose prose-gray max-w-none prose-headings:scroll-mt-20 prose-a:text-moa-600 prose-a:no-underline hover:prose-a:underline">
      {children}
    </article>
  );
}
