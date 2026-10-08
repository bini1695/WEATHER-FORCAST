import { ForecastItem } from '@/lib/types';
import WeatherIcon from './WeatherIcon';

interface Props {
  item: ForecastItem;
}

export default function ForecastCard({ item }: Props) {
  const date = new Date(item.dt * 1000);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dayDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-white text-center shadow-lg hover:bg-white/30 transition">
      <p className="font-semibold">{dayName}</p>
      <p className="text-xs text-white/70">{dayDate}</p>
      <div className="flex justify-center my-2">
        <WeatherIcon code={item.weather[0].icon} size={60} />
      </div>
      <p className="text-2xl font-bold">{Math.round(item.main.temp)}°C</p>
      <p className="text-xs capitalize text-white/80 mt-1">
        {item.weather[0].description}
      </p>
    </div>
  );
}