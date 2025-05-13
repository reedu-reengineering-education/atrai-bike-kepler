"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export type WeeklyStat = {
  week: string;
  trip_count: number;
  average_duration_s: number;
  average_speed_kmh: number;
  total_kcal: number;
};

export type RegionStats = {
  region: string;
  weekly_stats: WeeklyStat[];
};

interface RegionStatsWithChartProps {
  data: RegionStats[];
}

export function RegionStatsWithChart({ data }: RegionStatsWithChartProps) {
  console.log("RegionStatsWithChart data", data);
  return (
    <div className="space-y-10">
      {data.map((region) => (
        <Card key={region.region}>
          <CardHeader>
            <CardTitle className="capitalize">{region.region}</CardTitle>
          </CardHeader>

          <CardContent>
            {/* Table summary */}
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 font-semibold">Week</th>
                    <th className="p-2 font-semibold">Trip Count</th>
                    <th className="p-2 font-semibold">Avg Duration (s)</th>
                    <th className="p-2 font-semibold">Avg Speed (km/h)</th>
                    <th className="p-2 font-semibold">Total kcal</th>
                  </tr>
                </thead>
                <tbody>
                  {region.weekly_stats.map((weekStat) => (
                    <tr key={weekStat.week} className="border-b">
                      <td className="p-2">
                        {new Date(weekStat.week).toLocaleDateString()}
                      </td>
                      <td className="p-2">{weekStat.trip_count}</td>
                      <td className="p-2">
                        {weekStat.average_duration_s.toFixed(2)}
                      </td>
                      <td className="p-2">
                        {weekStat.average_speed_kmh.toFixed(2)}
                      </td>
                      <td className="p-2">{weekStat.total_kcal.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Fancy chart */}
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={region.weekly_stats}>
                <XAxis
                  dataKey="week"
                  tickFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(label) =>
                    `Week of ${new Date(label).toLocaleDateString()}`
                  }
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="trip_count"
                  stroke="#8884d8"
                  name="Trip Count"
                />
                <Line
                  type="monotone"
                  dataKey="average_speed_kmh"
                  stroke="#82ca9d"
                  name="Avg Speed (km/h)"
                />
                <Line
                  type="monotone"
                  dataKey="total_kcal"
                  stroke="#ff7300"
                  name="Total kcal"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
