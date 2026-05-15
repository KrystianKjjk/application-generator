"use client";

import { useState, useEffect } from "react";
import OfficialForm from "./OfficialForm";
import PdfPreview from "./PdfPreview";

type Tab = "formularz" | "podglad";

function TabIndicator({
  number,
  label,
  state,
}: {
  number: number;
  label: string;
  state: "active" | "idle" | "done";
}) {
  const numClass =
    state === "active"
      ? "bg-gray-900 text-white border-gray-900"
      : state === "done"
        ? "bg-gray-200 text-gray-500 border-gray-200"
        : "bg-transparent text-gray-400 border-gray-300";

  const labelClass =
    state === "active"
      ? "text-gray-900 font-semibold"
      : "text-gray-400 font-medium";

  return (
    <div className="flex items-center gap-2 select-none">
      <span
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-semibold transition-colors ${numClass}`}
      >
        {number}
      </span>
      <span className={`text-sm tracking-wide transition-colors ${labelClass}`}>
        {label}
      </span>
    </div>
  );
}

export default function AppShell() {
  const [activeTab, setActiveTab] = useState<Tab>("formularz");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  function scrollToTop() {
    document.querySelector("main")?.scrollTo(0, 0);
  }

  function handleGenerated(url: string) {
    setPdfUrl(url);
    setActiveTab("podglad");
    scrollToTop();
  }

  return (
    <div className="shell">
      <div
        style={{
          background: "#152b1e",
          borderBottom: "1px solid #274d36",
          padding: "14px 28px",
        }}
      >
        <h1
          style={{
            color: "#e0bc6e",
            fontSize: "28px",
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          Generator Wniosków
        </h1>
      </div>
      <header className="shell-header">
        <nav className="flex items-center gap-2" aria-label="Kroki">
          <TabIndicator
            number={1}
            label="Formularz"
            state={activeTab === "formularz" ? "active" : "done"}
          />
          <div className="w-8 h-px bg-gray-300 mx-1" aria-hidden="true" />
          <TabIndicator
            number={2}
            label="Podgląd"
            state={activeTab === "podglad" ? "active" : "idle"}
          />
        </nav>
      </header>

      <main className="shell-main">
        {activeTab === "formularz" ? (
          <>
            <div className="privacy-notice">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Twoje dane nie opuszczają tego komputera — formularz działa
              wyłącznie po stronie przeglądarki.
            </div>
            <div className="form-card">
              <OfficialForm onGenerated={handleGenerated} />
            </div>
          </>
        ) : (
          <PdfPreview
            pdfUrl={pdfUrl!}
            onBack={() => {
              setActiveTab("formularz");
              scrollToTop();
            }}
          />
        )}
      </main>
    </div>
  );
}
