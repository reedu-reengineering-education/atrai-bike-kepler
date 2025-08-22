"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button } from "../ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";

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
  const { t } = useTranslation();

  // Properties available for toggling
  const chartProperties = [
    {
      key: "trip_count",
      label: t("charts.tripCount"),
      color: "#8884d8",
    },
    {
      key: "average_speed_kmh",
      label: t("charts.avgSpeed"),
      color: "#82ca9d",
    },
    {
      key: "total_kcal",
      label: t("charts.totalKcal"),
      color: "#ff7300",
    },
  ];

  // State for selected property
  const [selectedProperty, setSelectedProperty] = useState(
    chartProperties[0].key,
  );

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
              <Table className="min-w-full text-sm text-left">
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead className="p-2 font-semibold">
                      {t("charts.week")}
                    </TableHead>
                    <TableHead className="p-2 font-semibold">
                      {t("charts.tripCount")}
                    </TableHead>
                    <TableHead className="p-2 font-semibold">
                      {t("charts.avgDuration")}
                    </TableHead>
                    <TableHead className="p-2 font-semibold">
                      {t("charts.avgSpeed")}
                    </TableHead>
                    <TableHead className="p-2 font-semibold">
                      {t("charts.totalKcal")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {region.weekly_stats.map((weekStat) => (
                    <TableRow key={weekStat.week}>
                      <TableCell className="font-medium">
                        {new Date(weekStat.week).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{weekStat.trip_count}</TableCell>
                      <TableCell>
                        {weekStat.average_duration_s.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {weekStat.average_speed_kmh.toFixed(2)}
                      </TableCell>
                      <TableCell>{weekStat.total_kcal.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Toggle for chart property */}
            <div className="mb-4 flex gap-2">
              {chartProperties.map((prop) => (
                <Button
                  key={prop.key}
                  onClick={() => setSelectedProperty(prop.key)}
                >
                  {prop.label}
                </Button>
              ))}
            </div>

            {/* Fancy chart */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={region.weekly_stats}>
                <XAxis
                  dataKey="week"
                  tickFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(label) =>
                    `${t("charts.weekOf")} ${new Date(label).toLocaleDateString()}`
                  }
                />
                <Legend />
                {chartProperties
                  .filter((prop) => prop.key === selectedProperty)
                  .map((prop) => (
                    <Bar
                      key={prop.key}
                      dataKey={prop.key}
                      fill={prop.color}
                      name={prop.label}
                      radius={4}
                    />
                  ))}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
