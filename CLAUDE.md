@AGENTS.md

# CLAUDE.md — Briefing projektu: Formularz urzędowy → PDF

## Cel projektu

Aplikacja webowa oparta na Next.js, która umożliwia użytkownikowi wypełnienie formularza urzędowego w przeglądarce, a następnie pobranie gotowego dokumentu PDF — bez udziału serwera backendowego. Całość działa po stronie klienta (frontend-only).

---

## Przepływ użytkownika

1. **Formularz** — użytkownik wypełnia pola w zakładce formularza
2. **Walidacja** — dane są walidowane po stronie klienta
3. **Generowanie** — szablon PDF wypełniany danymi w przeglądarce (live preview)
4. **Pobieranie** — gotowy dokument trafia do użytkownika

---

## Stack technologiczny

| Warstwa    | Technologia              | Uwagi                                                 |
| ---------- | ------------------------ | ----------------------------------------------------- |
| Framework  | Next.js (App Router)     |                                                       |
| PDF engine | pdf-lib                  | tworzenie szablonu i wstawianie danych w przeglądarce |
| Formularz  | React Hook Form + Zod    | zarządzanie stanem i walidacja                        |
| UI         | Tailwind CSS + shadcn/ui | komponenty formularza                                 |

---

## Live preview PDF

Podgląd PDF wymagany przed pobraniem. Podejście: **pdf-lib + iframe z blob URL**.

### Przepływ live preview

1. Użytkownik wypełnia pole w formularzu
2. `onChange` / `onBlur` triggeruje `generatePdf()` → zwraca `Uint8Array`
3. `URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }))` → wstawiany do `<iframe>`
4. Przycisk "Pobierz" robi `<a href={blobUrl} download="dokument.pdf">`

> **Uwaga:** pamiętać o `URL.revokeObjectURL()` przy każdym odświeżeniu, aby unikać wycieków pamięci.

---

## Szablon PDF

- Układ graficzny dokumentu jest znany — zostanie zakodowany na podstawie wzoru
- Szablon budowany od podstaw w kodzie (pdf-lib)
- Polskie znaki: wymagane dołączenie własnego fontu TTF (np. Lato, Roboto) jako `Uint8Array`
- Pozycjonowanie pól: współrzędne x/y mierzone na podstawie wzoru dokumentu

---

## Proponowana struktura projektu

```
app/
  page.tsx                  ← strona główna z zakładkami
  components/
    OfficialForm.tsx         ← formularz + walidacja
    PdfPreview.tsx           ← podgląd przez iframe
  lib/
    generatePdf.ts           ← logika pdf-lib
    schema.ts                ← schemat Zod
public/
  template.pdf              ← bazowy szablon (opcjonalny)
  fonts/                    ← TTF z polskimi znakami
```

---

## Kolejność implementacji

1. Szkielet Next.js z zakładkami (formularz / podgląd)
2. Minimalny szablon PDF w pdf-lib (z placeholderami)
3. Live preview przez iframe
4. Formularz z React Hook Form + Zod (pola dokładane iteracyjnie)
5. Docelowy układ graficzny PDF na podstawie wzoru

---

## Decyzje do podjęcia w trakcie implementacji

- [ ] Konkretne pola formularza (nazwisko, PESEL, daty, podpis itp.)
- [ ] Układ graficzny dokumentu (logo, nagłówki, linie) — na podstawie wzoru
