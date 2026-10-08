import Image from 'next/image';

interface Props {
  code: string;
  size?: number;
}

export default function WeatherIcon({ code, size = 64 }: Props) {
  return (
    <Image
      src={`https://openweathermap.org/img/wn/${code}@2x.png`}
      alt="weather icon"
      width={size}
      height={size}
      className="drop-shadow-lg"
    />
  );
}