import { NextRequest, NextResponse } from 'next/server';
import { getCurrentWeather, getForecast, groupForecastByDay } from '@/lib/weather';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json({ error: 'City is required' }, { status: 400 });
  }

  try {
    const [current, forecast] = await Promise.all([
      getCurrentWeather(city),
      getForecast(city),
    ]);

    const daily = groupForecastByDay(forecast.list);

    return NextResponse.json({
      current,
      forecast: daily,
      city: forecast.city,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data?.message || 'Failed to fetch weather' },
      { status: error.response?.status || 500 }
    );
  }
}