import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";

export default function DocumentationIntroductionPage() {
  const { i18n } = useTranslation();
  const [content, setContent] = useState("");

  useEffect(() => {
    const loadDoc = async () => {
      try {
        let fileModule;

        if (i18n.language.startsWith("de")) {
          fileModule = await import("@/docs/de/introduction.md?raw");
        } else if (i18n.language.startsWith("pt")) {
          fileModule = await import("@/docs/pt/introduction.md?raw");
        } else {
          fileModule = await import("@/docs/en/introduction.md?raw");
        }

        setContent(fileModule.default);
      } catch (err) {
        setContent("Documentation not available in this language" + err);
      }
    };

    loadDoc();
  }, [i18n.language]);

  return (
    <div className="max-w-3xl px-4 py-6">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mt-6 mb-4">{children}</h1>
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
          a: ({ href, children }) => (
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
        {content}
      </ReactMarkdown>
    </div>
  );
}
