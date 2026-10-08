import { ForecastItem } from '@/lib/types';
import ForecastCard from './ForecastCard';

interface Props {
  items: ForecastItem[];
}

export default function ForecastList({ items }: Props) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {items.map((item) => (
          <ForecastCard key={item.dt} item={item} />
        ))}
      </div>
    </div>
  );
}