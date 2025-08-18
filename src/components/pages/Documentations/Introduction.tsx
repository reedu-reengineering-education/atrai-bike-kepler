import { useEffect, useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import { useTranslation } from "react-i18next";

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
    <div className=" max-w-4xl mx-auto px-4 py-8">
      <MDXProvider
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mt-6 mb-4 text-blue-700">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold mt-5 mb-3">{children}</h2>
          ),
          p: ({ children }) => (
            <p className="my-2 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 my-3 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 my-3 space-y-1">{children}</ol>
          ),
          li: ({ children }) => <li className="ml-1">{children}</li>,
          a: ({ href, children }: any) => (
            <a
              href={href}
              className="text-blue-600 underline hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        <MdxContent />
      </MDXProvider>
    </div>
  );
}
