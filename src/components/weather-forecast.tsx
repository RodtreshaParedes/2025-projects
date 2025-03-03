import { ForecastData } from '@/api/types';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowDown, ArrowUp, Droplets, Wind } from 'lucide-react';

interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const dailyForecast = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), 'yyyy-MM-dd');

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        weather: forecast.weather[0],
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }

    return acc;
  }, {} as Record<string, DailyForecast>);

  const nextDays = Object.values(dailyForecast).slice(0, 6);

  const formatTemperature = (temp: number) => {
    return `${Math.round(temp)}°`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {nextDays.map((day, index) => {
            return (
              <div
                key={`${day.date}-${index}`}
                className="grid grid-cols-3 gap-4 items-center rounded-lg p-4 bg-white/30 dark:bg-gray-800/30 shadow-[inset_-14px_14px_28px_rgba(197,197,197,0.5),inset_14px_-14px_28px_rgba(251,251,251,0.5)] dark:shadow-[inset_-14px_14px_28px_rgba(26,26,26,0.5),inset_14px_-14px_28px_rgba(51,51,51,0.5)] backdrop-blur-md border-gray-200 dark:border-gray-700 text-black dark:text-white"
              >
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  <p>{format(new Date(day.date * 1000), 'EEE, MMM d')}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                    {day.weather.description}
                  </p>
                </div>
                <div className="flex flex-col xl:flex-row gap-4 justify-center">
                  <span className="flex items-center text-blue-500">
                    <ArrowDown className="mr-1 h-4 w-4" />
                    {formatTemperature(day.temp_min)}
                  </span>
                  <span className="flex items-center text-red-500">
                    <ArrowUp className="mr-1 h-4 w-4" />
                    {formatTemperature(day.temp_max)}
                  </span>
                </div>
                <div className="flex flex-col xl:flex-row justify-end gap-4">
                  <span className="flex items-center gap-1">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{day.humidity}%</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{day.wind} m/s</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
