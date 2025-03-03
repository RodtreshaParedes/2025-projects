import type { WeatherData } from '@/api/types';
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys } = data;

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), 'h:mm a');
  };

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

    const index =
      Math.round(((degrees %= 360) < 0 ? degrees + 360 : degrees) / 45) % 8;
    return index < 0 ? directions[8 + index] : directions[index];
  };

  const details = [
    {
      title: 'Sunrise',
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: 'text-orange-500',
    },
    {
      title: 'Sunset',
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: 'text-blue-500',
    },
    {
      title: 'Wind Direction',
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: 'text-green-500',
    },
    {
      title: 'Pressure',
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: 'text-purple-500',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => {
            return (
              <div
                key={detail.title}
                className="flex items-center gap-3 rounded-lg p-4 bg-white/30 dark:bg-gray-800/30 shadow-[inset_-14px_14px_28px_rgba(197,197,197,0.5),inset_14px_-14px_28px_rgba(251,251,251,0.5)] dark:shadow-[inset_-14px_14px_28px_rgba(26,26,26,0.5),inset_14px_-14px_28px_rgba(51,51,51,0.5)] backdrop-blur-md border-gray-200 dark:border-gray-700"
              >
                <detail.icon className={`${detail.color} w-6 h-6`} />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {detail.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {detail.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
