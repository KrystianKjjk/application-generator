"use client";

import { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormValues } from "../lib/schema";
import { generatePdf } from "../lib/generatePdf";
import dummyData from "../../dummy-data/formData.json";

const useDummyData = process.env.NEXT_PUBLIC_USE_DUMMY_DATA === "true";
const defaultValues: Partial<FormValues> = useDummyData ? dummyData : {};

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}

function Field({ label, error, children, hint }: FieldProps) {
  return (
    <div className="field-group">
      <label className="field-label">{label}</label>
      {children}
      {error ? (
        <p className="field-error">{error}</p>
      ) : hint ? (
        <p className="field-hint">{hint}</p>
      ) : null}
    </div>
  );
}

interface OfficialFormProps {
  onGenerated: (url: string) => void;
}

export default function OfficialForm({ onGenerated }: OfficialFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues,
  });

  const onSubmitValid = useCallback(
    async (data: FormValues) => {
      const bytes = await generatePdf(data);
      const url = URL.createObjectURL(
        new Blob([bytes], { type: "application/pdf" }),
      );
      onGenerated(url);
    },
    [onGenerated],
  );

  const handleFormSubmit = handleSubmit(onSubmitValid);

  function inputClass(field: keyof FormValues) {
    if (errors[field]) return "field-input field-input--error";
    if (dirtyFields[field]) return "field-input field-input--valid";
    return "field-input";
  }

  return (
    <>
      <form onSubmit={handleFormSubmit} noValidate>
        <p className="form-section-title">Dane osobowe</p>

        <div className="field-row">
          <Field label="Imię" error={errors.firstName?.message}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  autoComplete="given-name"
                  placeholder="Jan"
                  className={inputClass("firstName")}
                />
              )}
            />
          </Field>
          <Field label="Nazwisko" error={errors.lastName?.message}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  autoComplete="family-name"
                  placeholder="Kowalski"
                  className={inputClass("lastName")}
                />
              )}
            />
          </Field>
        </div>

        <div className="field-divider" />

        <p className="form-section-title">Dane kontaktowe</p>

        <Field label="Adres e-mail" error={errors.email?.message}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                autoComplete="email"
                placeholder="jan.kowalski@example.com"
                className={inputClass("email")}
              />
            )}
          />
        </Field>

        <Field
          label="Numer telefonu"
          error={errors.phone?.message}
          hint="Format: 123 456 789 lub +48 123 456 789"
        >
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="tel"
                autoComplete="tel"
                placeholder="123 456 789"
                className={`${inputClass("phone")} mono`}
              />
            )}
          />
        </Field>

        <div className="field-divider" />

        <p className="form-section-title">Adres zamieszkania</p>

        <Field label="Kraj" error={errors.kraj?.message}>
          <Controller
            name="kraj"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                autoComplete="country-name"
                placeholder="Polska"
                className={inputClass("kraj")}
              />
            )}
          />
        </Field>

        <div className="field-row">
          <Field label="Województwo" error={errors.wojewodztwo?.message}>
            <Controller
              name="wojewodztwo"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Mazowieckie"
                  className={inputClass("wojewodztwo")}
                />
              )}
            />
          </Field>
          <Field label="Powiat" error={errors.powiat?.message}>
            <Controller
              name="powiat"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Warszawski"
                  className={inputClass("powiat")}
                />
              )}
            />
          </Field>
        </div>

        <Field label="Gmina" error={errors.gmina?.message}>
          <Controller
            name="gmina"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Warszawa"
                className={inputClass("gmina")}
              />
            )}
          />
        </Field>

        <Field label="Ulica" error={errors.ulica?.message}>
          <Controller
            name="ulica"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                autoComplete="street-address"
                placeholder="ul. Marszałkowska"
                className={inputClass("ulica")}
              />
            )}
          />
        </Field>

        <div className="field-row">
          <Field label="Nr domu" error={errors.nrDomu?.message}>
            <Controller
              name="nrDomu"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  autoComplete="address-line2"
                  placeholder="12"
                  className={inputClass("nrDomu")}
                />
              )}
            />
          </Field>
          <Field label="Nr lokalu" error={errors.nrLokalu?.message}>
            <Controller
              name="nrLokalu"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="5"
                  className={inputClass("nrLokalu")}
                />
              )}
            />
          </Field>
        </div>

        <div className="field-row">
          <Field label="Miejscowość" error={errors.miejscowosc?.message}>
            <Controller
              name="miejscowosc"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  autoComplete="address-level2"
                  placeholder="Warszawa"
                  className={inputClass("miejscowosc")}
                />
              )}
            />
          </Field>
          <Field
            label="Kod pocztowy"
            error={errors.kodPocztowy?.message}
            hint="Format: 00-000"
          >
            <Controller
              name="kodPocztowy"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  autoComplete="postal-code"
                  placeholder="00-001"
                  className={`${inputClass("kodPocztowy")} mono`}
                />
              )}
            />
          </Field>
        </div>

        <div style={{ marginTop: "28px" }}>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Generowanie…" : "Generuj PDF"}
          </button>
        </div>
      </form>
    </>
  );
}
