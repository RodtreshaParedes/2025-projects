import type { ForecastData } from '@/api/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { format } from 'date-fns';

interface HourlyTemperatureProps {
  data: ForecastData;
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), 'h a'),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  const tempValues = chartData.map((item) => item.temp);
  const feelsLikeValues = chartData.map((item) => item.feels_like);
  const minTemp = Math.min(...tempValues, ...feelsLikeValues);
  const maxTemp = Math.max(...tempValues, ...feelsLikeValues);
  const padding = 5; // Add some padding to the min and max values

  const yAxisDomain = [
    Math.floor(minTemp / 5) * 5 - padding,
    Math.ceil(maxTemp / 5) * 5 + padding,
  ];

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Today's Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width={'100%'} height={'100%'}>
            <LineChart data={chartData}>
              <XAxis
                dataKey={'time'}
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                dataKey={'feels_like'}
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
                domain={yAxisDomain}
              />

              {/* Tooltip */}
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-gray-400 p-2 backdrop-filter backdrop-blur-sm bg-opacity-10 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Temperature
                            </span>
                            <span className="font-bold">
                              {' '}
                              {payload[0].value}°
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Feels like
                            </span>
                            <span className="font-bold">
                              {' '}
                              {payload[1].value}°
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Line
                type="monotone"
                dataKey="temp"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#F87171"
                strokeWidth={2}
                dot={false}
                strokeDasharray={'3 3'}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemperature;
