import { z } from "zod";

export const formSchema = z.object({
  firstName: z
    .string()
    .min(2, "Imię musi mieć co najmniej 2 znaki")
    .max(50, "Imię może mieć maksymalnie 50 znaków")
    .regex(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/, "Imię zawiera niedozwolone znaki"),

  lastName: z
    .string()
    .min(2, "Nazwisko musi mieć co najmniej 2 znaki")
    .max(80, "Nazwisko może mieć maksymalnie 80 znaków")
    .regex(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/, "Nazwisko zawiera niedozwolone znaki"),

  email: z
    .string()
    .email("Podaj prawidłowy adres e-mail"),

  phone: z
    .string()
    .regex(/^(\+48\s?)?(\d{3}[\s-]?\d{3}[\s-]?\d{3})$/, "Podaj numer w formacie 123 456 789 lub +48 123 456 789"),

  kraj: z
    .string()
    .min(2, "Podaj nazwę kraju")
    .max(60, "Nazwa kraju jest za długa"),

  wojewodztwo: z
    .string()
    .min(2, "Podaj nazwę województwa")
    .max(60, "Nazwa województwa jest za długa"),

  powiat: z
    .string()
    .min(2, "Podaj nazwę powiatu")
    .max(60, "Nazwa powiatu jest za długa"),

  gmina: z
    .string()
    .min(2, "Podaj nazwę gminy")
    .max(60, "Nazwa gminy jest za długa"),

  ulica: z
    .string()
    .min(2, "Podaj nazwę ulicy")
    .max(100, "Nazwa ulicy jest za długa"),

  nrDomu: z
    .string()
    .min(1, "Podaj numer domu")
    .max(10, "Numer domu jest za długi"),

  nrLokalu: z
    .string()
    .max(10, "Numer lokalu jest za długi")
    .optional(),

  miejscowosc: z
    .string()
    .min(2, "Podaj nazwę miejscowości")
    .max(100, "Nazwa miejscowości jest za długa"),

  kodPocztowy: z
    .string()
    .regex(/^\d{2}-\d{3}$/, "Podaj kod w formacie 00-000"),
});

export type FormValues = z.infer<typeof formSchema>;
