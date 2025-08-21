import { useEffect, useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import { useTranslation } from "react-i18next";
import { PageContainer } from "@/components/layout/PageConatiner";

import { formatUrlPath } from "@/utils/formatPath";
import { useMatch } from "@tanstack/react-router";
// import type { MDXComponents } from "@mdx-js/react";

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
    // <PageContainer urlPath={formatUrlPath(currentPath)}>
    //   <div className=" max-w-4xl mx-auto px-4 py-8">
    //     <MDXProvider
    //       components={{
    //         h1: ({ children }) => (
    //           <h1 className="text-3xl font-bold mt-6 mb-4 text-blue-700">
    //             {children}
    //           </h1>
    //         ),
    //         h2: ({ children }) => (
    //           <h2 className="text-2xl font-bold mt-5 mb-3">{children}</h2>
    //         ),
    //         p: ({ children }) => (
    //           <p className="my-2 leading-relaxed">{children}</p>
    //         ),
    //         ul: ({ children }) => (
    //           <ul className="list-disc pl-6 my-3 space-y-1">{children}</ul>
    //         ),
    //         ol: ({ children }) => (
    //           <ol className="list-decimal pl-6 my-3 space-y-1">{children}</ol>
    //         ),
    //         li: ({ children }) => <li className="ml-1">{children}</li>,
    //         a: ({ href, children }: any) => (
    //           <a
    //             href={href}
    //             className="text-blue-600 underline hover:text-blue-800"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             {children}
    //           </a>
    //         ),
    //       }}
    //     >
    //       <MdxContent />
    //     </MDXProvider>
    //   </div>
    // </PageContainer>
    <PageContainer urlPath={formatUrlPath(currentPath)}>
      <div className="max-w-4xl mx-auto px-4 py-8 prose prose-lg prose-blue dark:prose-invert">
        <MDXProvider
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold mt-6 mb-4 text-blue-700 border-b pb-2">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold mt-5 mb-3 text-gray-800">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-medium mt-4 mb-2 text-gray-700">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="my-3 leading-relaxed text-gray-700">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-6 my-3 space-y-1 marker:text-blue-600">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-6 my-3 space-y-1 marker:text-blue-600">
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="ml-1">{children}</li>,
            a: ({ href, children }: any) => (
              <a
                href={href}
                className="text-blue-600 font-medium underline hover:text-blue-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-gray-700 dark:text-gray-200 pl-4 italic my-4">
                {children}
              </blockquote>
            ),
            code: ({ children }) => (
              <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-pink-600 font-mono text-sm">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4">
                {children}
              </pre>
            ),
            hr: () => (
              <hr className="my-6 border-gray-300 dark:border-gray-700" />
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border border-gray-300 rounded-lg text-sm">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-blue-600 text-white">{children}</thead>
            ),
            tbody: ({ children }) => <tbody>{children}</tbody>,
            tr: ({ children }) => (
              <tr className="even:bg-gray-50 hover:bg-gray-100">{children}</tr>
            ),
            th: ({ children }) => (
              <th className="px-4 py-2 border border-gray-300 text-left font-semibold">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-4 py-2 border border-gray-300">{children}</td>
            ),
          }}
        >
          <MdxContent />
        </MDXProvider>
      </div>
    </PageContainer>
  );
}
