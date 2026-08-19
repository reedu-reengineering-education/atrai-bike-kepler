import { useEffect, useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import type { MDXComponents } from "@mdx-js/react";
import { useTranslation } from "react-i18next";
import { PageContainer } from "@/components/layout/PageConatiner";

import { formatUrlPath } from "@/supabase/formatPath";
import { useMatch } from "@tanstack/react-router";

interface DocumentationViewerProps {
  page?: string;
}

export default function DocumentationViewer({
  page = "introduction",
}: DocumentationViewerProps) {
  const { i18n } = useTranslation();
  const [MdxContent, setMdxContent] = useState<React.ComponentType | null>(
    null,
  );
  const match = useMatch({
    strict: false,
  });
  const currentPath = match.pathname;
  useEffect(() => {
    const loadDocumentation = async () => {
      try {
        const lang = i18n.language.split("-")[0] || "en";
        const module = await import(`@/docs/${lang}/${page}.mdx`);
        setMdxContent(() => module.default);
      } catch (error) {
        console.error("Documentation load error:", error);
        setMdxContent(() => () => (
          <div className="text-red-500 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            Documentation not available in this language
          </div>
        ));
      }
    };

    loadDocumentation();
  }, [i18n.language, page]);

  if (!MdxContent) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <PageContainer urlPath={formatUrlPath(currentPath)}>
      <div className="max-w-4xl mx-auto px-4 py-8 prose prose-lg prose-blue dark:prose-invert">
        <MDXProvider
          components={
            {
              h1: ({ children, ...props }: any) => (
                <h1 className="text-3xl font-bold mt-6 mb-4 text-blue-700 border-b pb-2" {...props}>
                  {children}
                </h1>
              ),
              h2: ({ children, ...props }: any) => (
                <h2 className="text-2xl font-semibold mt-5 mb-3 text-gray-800" {...props}>
                  {children}
                </h2>
              ),
              h3: ({ children, ...props }: any) => (
                <h3 className="text-xl font-medium mt-4 mb-2 text-gray-700" {...props}>
                  {children}
                </h3>
              ),
              p: ({ children, ...props }: any) => (
                <p className="my-3 leading-relaxed text-gray-700" {...props}>{children}</p>
              ),
              ul: ({ children, ...props }: any) => (
                <ul className="list-disc pl-6 my-3 space-y-1 marker:text-blue-600" {...props}>
                  {children}
                </ul>
              ),
              ol: ({ children, ...props }: any) => (
                <ol className="list-decimal pl-6 my-3 space-y-1 marker:text-blue-600" {...props}>
                  {children}
                </ol>
              ),
              li: ({ children, ...props }: any) => <li className="ml-1" {...props}>{children}</li>,
              a: ({ href, children, ...props }: any) => (
                <a
                  href={href}
                  className="text-blue-600 font-medium underline hover:text-blue-800 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
              ),
              blockquote: ({ children, ...props }: any) => (
                <blockquote className="border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-gray-700 dark:text-gray-200 pl-4 italic my-4" {...props}>
                  {children}
                </blockquote>
              ),
              code: ({ children, ...props }: any) => (
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-pink-600 font-mono text-sm" {...props}>
                  {children}
                </code>
              ),
              pre: ({ children, ...props }: any) => (
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4" {...props}>
                  {children}
                </pre>
              ),
              hr: (props: any) => (
                <hr className="my-6 border-gray-300 dark:border-gray-700" {...props} />
              ),
              table: ({ children, ...props }: any) => (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full border border-gray-300 rounded-lg text-sm" {...props}>
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children, ...props }: any) => (
                <thead className="bg-blue-600 text-white" {...props}>{children}</thead>
              ),
              tbody: ({ children, ...props }: any) => <tbody {...props}>{children}</tbody>,
              tr: ({ children, ...props }: any) => (
                <tr className="even:bg-gray-50 hover:bg-gray-100" {...props}>{children}</tr>
              ),
              th: ({ children, ...props }: any) => (
                <th className="px-4 py-2 border border-gray-300 text-left font-semibold" {...props}>
                  {children}
                </th>
              ),
              td: ({ children, ...props }: any) => (
                <td className="px-4 py-2 border border-gray-300" {...props}>{children}</td>
              ),
            } as MDXComponents
          }
        >
          <MdxContent />
        </MDXProvider>
      </div>
    </PageContainer>
  );
}
