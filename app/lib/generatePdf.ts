import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import type { FormValues } from "./schema";

const FIELDS: { label: string; key: keyof FormValues }[] = [
  { label: "Imię", key: "firstName" },
  { label: "Nazwisko", key: "lastName" },
  { label: "E-mail", key: "email" },
  { label: "Telefon", key: "phone" },
  { label: "Kraj", key: "kraj" },
  { label: "Województwo", key: "wojewodztwo" },
  { label: "Powiat", key: "powiat" },
  { label: "Gmina", key: "gmina" },
  { label: "Ulica", key: "ulica" },
  { label: "Nr domu", key: "nrDomu" },
  { label: "Nr lokalu", key: "nrLokalu" },
  { label: "Miejscowość", key: "miejscowosc" },
  { label: "Kod pocztowy", key: "kodPocztowy" },
];

async function loadFont(path: string): Promise<ArrayBuffer> {
  const res = await fetch(path);
  return res.arrayBuffer();
}

export async function generatePdf(data: FormValues): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const page = doc.addPage([595, 842]); // A4

  const [regularBytes, boldBytes] = await Promise.all([
    loadFont("/fonts/Roboto-Regular.ttf"),
    loadFont("/fonts/Roboto-Bold.ttf"),
  ]);

  const regularFont = await doc.embedFont(regularBytes);
  const boldFont = await doc.embedFont(boldBytes);

  const { width, height } = page.getSize();
  const margin = 60;
  const colSplit = 200;

  // Header bar
  page.drawRectangle({
    x: 0,
    y: height - 70,
    width,
    height: 70,
    color: rgb(0.07, 0.33, 0.82),
  });

  page.drawText("Formularz", {
    x: margin,
    y: height - 44,
    size: 20,
    font: boldFont,
    color: rgb(1, 1, 1),
  });

  // Separator line below header
  let y = height - 100;

  page.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 0.5,
    color: rgb(0.8, 0.8, 0.8),
  });

  const ROW_HEIGHT = 26;
  const FONT_SIZE = 10;

  // Render each field
  for (const { label, key } of FIELDS) {
    const value = data[key];
    if (!value) continue;

    // Vertically center text within the row (baseline offset from row top)
    const textY = y - ROW_HEIGHT / 2 + FONT_SIZE * 0.35;

    page.drawText(`${label}:`, {
      x: margin,
      y: textY - 8,
      size: FONT_SIZE,
      font: boldFont,
      color: rgb(0.3, 0.3, 0.3),
    });

    page.drawText(String(value), {
      x: colSplit,
      y: textY - 8,
      size: FONT_SIZE,
      font: regularFont,
      color: rgb(0.05, 0.05, 0.05),
    });

    y -= ROW_HEIGHT;

    // Thin row separator at the bottom of this row
    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 0.3,
      color: rgb(0.92, 0.92, 0.92),
    });
  }

  // Footer
  page.drawText("Wygenerowano po stronie klienta — dane nie opusciły przegladarki.", {
    x: margin,
    y: 30,
    size: 8,
    font: regularFont,
    color: rgb(0.6, 0.6, 0.6),
  });

  return doc.save();
}
