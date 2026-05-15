const steps = [
  { number: 1, label: "Formularz" },
  { number: 2, label: "Podgląd" },
  { number: 3, label: "Pobierz" },
];

interface ProgressIndicatorProps {
  currentStep?: number;
}

export default function ProgressIndicator({ currentStep = 1 }: ProgressIndicatorProps) {
  return (
    <nav aria-label="Kroki procesu" className="flex items-center justify-center gap-0">
      {steps.map((step, index) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={[
                  "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                  isCompleted
                    ? "border-blue-600 bg-blue-600 text-white"
                    : isActive
                      ? "border-blue-600 bg-white text-blue-600"
                      : "border-gray-300 bg-white text-gray-400",
                ].join(" ")}
                aria-current={isActive ? "step" : undefined}
              >
                {isCompleted ? (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={[
                  "text-xs font-medium",
                  isActive ? "text-blue-600" : isCompleted ? "text-blue-600" : "text-gray-400",
                ].join(" ")}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={[
                  "mb-5 h-0.5 w-16 transition-colors",
                  isCompleted ? "bg-blue-600" : "bg-gray-200",
                ].join(" ")}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
