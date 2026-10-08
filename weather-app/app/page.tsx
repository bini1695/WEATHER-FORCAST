import SearchBar from '@/components/SearchBar';

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Weather Forecast
        </h1>
        <p className="text-white/80 mb-8 text-lg">
          Search any city to get real-time weather and 5-day forecast
        </p>
        {error ? (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-100/90 px-4 py-3 text-left text-sm text-red-800 shadow-md">
            {decodeURIComponent(error)}
          </div>
        ) : null}
        <SearchBar />
      </div>
    </main>
  );
}