import { CurrentWeather as CurrentWeatherType } from '@/lib/types';
import WeatherIcon from './WeatherIcon';

interface Props {
  data: CurrentWeatherType;
}

export default function CurrentWeather({ data }: Props) {
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl text-white mb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-4xl font-bold">
            {data.name}, {data.sys.country}
          </h2>
          <p className="text-white/80 capitalize text-lg mt-1">
            {data.weather[0].description}
          </p>
        </div>
        <WeatherIcon code={data.weather[0].icon} size={100} />
      </div>

      <div className="mt-6 flex items-end gap-2">
        <span className="text-7xl font-bold">{Math.round(data.main.temp)}°</span>
        <span className="text-2xl mb-3">C</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <InfoBox label="Feels Like" value={`${Math.round(data.main.feels_like)}°C`} />
        <InfoBox label="Humidity" value={`${data.main.humidity}%`} />
        <InfoBox label="Wind" value={`${data.wind.speed} m/s`} />
        <InfoBox label="Pressure" value={`${data.main.pressure} hPa`} />
        <InfoBox label="Sunrise" value={sunrise} />
        <InfoBox label="Sunset" value={sunset} />
      </div>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/10 rounded-xl p-3">
      <p className="text-white/70 text-sm">{label}</p>
      <p className="text-white font-semibold text-lg">{value}</p>
    </div>
  );
}