# Formularz urzędowy → PDF

Aplikacja webowa umożliwiająca wypełnienie formularza urzędowego w przeglądarce i pobranie gotowego dokumentu PDF. Działa w całości po stronie klienta — bez backendu.

## Tech stack

- **Next.js** (App Router)
- **pdf-lib** — generowanie PDF w przeglądarce
- **React Hook Form + Zod** — formularz i walidacja
- **Tailwind CSS + shadcn/ui** — interfejs

## Funkcje

- Formularz z walidacją po stronie klienta
- Live preview PDF w czasie wypełniania
- Pobieranie gotowego dokumentu bez udziału serwera
- Obsługa polskich znaków (font TTF)

## Uruchomienie

```bash
npm install
npm run dev
```

Aplikacja dostępna pod `http://localhost:3000`.

## Status

🚧 W trakcie budowy
