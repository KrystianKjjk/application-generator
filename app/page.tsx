import ProgressIndicator from "./components/ProgressIndicator";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-gray-100 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto max-w-5xl">
          <ProgressIndicator currentStep={1} />
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center">
        <p className="text-gray-400">Treść strony</p>
      </main>
    </div>
  );
}
