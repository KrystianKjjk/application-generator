"use client";

interface PdfPreviewProps {
  pdfUrl: string;
  onBack: () => void;
}

export default function PdfPreview({ pdfUrl, onBack }: PdfPreviewProps) {
  return (
    <div
      className="flex flex-col w-full max-w-4xl flex-1 "
      style={{ animation: "fadeUp 0.35s ease both" }}
    >
      <div className="flex items-center gap-3 mb-4 w-full">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded hover:bg-gray-50 hover:border-gray-300 transition-colors"
        >
          ← Wróć do formularza
        </button>
        <div className="preview-status">
          <span className="preview-status-dot preview-status-dot--active" />
          Gotowy
        </div>
        <a
          href={pdfUrl}
          download="formularz.pdf"
          className="btn-primary"
          style={{
            width: "auto",
            padding: "8px 18px",
            fontSize: "13px",
            textDecoration: "none",
            marginLeft: "auto",
          }}
        >
          <span className="btn-icon">⬇</span>
          Pobierz PDF
        </a>
      </div>
      <div
        className="flex-1 border border-gray-200 rounded overflow-hidden bg-white"
        style={{ minHeight: "700px" }}
      >
        <iframe
          src={pdfUrl}
          style={{
            width: "100%",
            height: "100%",
            minHeight: "700px",
            border: "none",
          }}
          title="Podgląd PDF"
        />
      </div>
    </div>
  );
}
