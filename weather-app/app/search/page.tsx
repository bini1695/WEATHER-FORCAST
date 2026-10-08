import Link from 'next/link';
import { getCurrentWeather, getForecast, groupForecastByDay } from '@/lib/weather';
import CurrentWeather from '@/components/CurrentWeather';
import ForecastList from '@/components/ForecastList';

interface Props {
  searchParams: Promise<{ name?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { name } = await searchParams;
  const city = typeof name === 'string' ? decodeURIComponent(name).trim() : '';

  if (!city) {
    return (
      <main className="min-h-screen px-4 py-10 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white/20 backdrop-blur-md rounded-3xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">No city provided</h2>
          <Link href="/" className="inline-block px-5 py-3 bg-white/20 rounded-xl hover:bg-white/30">
            ← Back to search
          </Link>
        </div>
      </main>
    );
  }

  try {
    const [current, forecast] = await Promise.all([
      getCurrentWeather(city),
      getForecast(city),
    ]);
    const daily = groupForecastByDay(forecast.list);

    return (
      <main className="min-h-screen px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-white mb-6 hover:underline">
            ← Back to search
          </Link>
          <CurrentWeather data={current} />
          <ForecastList items={daily} />
        </div>
      </main>
    );
  } catch (error: any) {
    const status = error?.response?.status ?? 'no response';
    const apiMessage = error?.response?.data?.message || error?.message || 'Unknown error';
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const keyPreview = apiKey ? `${apiKey.slice(0, 6)}...${apiKey.slice(-4)}` : 'MISSING';

    return (
      <main className="min-h-screen px-4 py-10 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white/20 backdrop-blur-md rounded-3xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Weather lookup failed 🌧️</h2>
          <p className="mb-4">
            Lookup for <strong>{city}</strong> failed.
          </p>
          <div className="bg-black/30 rounded-xl p-4 mb-4 font-mono text-sm space-y-2">
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Message:</strong> {apiMessage}</p>
            <p><strong>Key (partial):</strong> {keyPreview}</p>
            <p><strong>Key length:</strong> {apiKey?.length ?? 0}</p>
          </div>
          <Link href="/" className="inline-block px-5 py-3 bg-white/20 rounded-xl hover:bg-white/30">
            ← Back to search
          </Link>
        </div>
      </main>
    );
  }
}
