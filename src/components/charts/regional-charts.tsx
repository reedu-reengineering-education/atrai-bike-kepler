"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
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
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export function RegionStatsWithChart({
  activeRegion: activeRegion,
}: {
  activeRegion: RegionStats;
}) {
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

  // State for selected property and pagination
  const [selectedProperty, setSelectedProperty] = useState(
    chartProperties[0].key,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination logic
  const paginatedData = useMemo(() => {
    if (!activeRegion?.weekly_stats) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return activeRegion.weekly_stats.slice(startIndex, endIndex);
  }, [activeRegion?.weekly_stats, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(
    (activeRegion?.weekly_stats?.length || 0) / itemsPerPage,
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="space-y-12 pt-6 px-6">
      <h2 className="text-2xl font-bold capitalize">{activeRegion?.region}</h2>

      {/* Table summary with pagination */}
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <Table className="min-w-full text-sm text-left">
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="p-2 font-semibold">Week</TableHead>
                <TableHead className="p-2 font-semibold">Trip Count</TableHead>
                <TableHead className="p-2 font-semibold">
                  Avg Duration (s)
                </TableHead>
                <TableHead className="p-2 font-semibold">
                  Avg Speed (km/h)
                </TableHead>
                <TableHead className="p-2 font-semibold">Total kcal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((weekStat) => (
                <TableRow key={weekStat.week}>
                  <TableCell className="font-medium">
                    {new Date(weekStat.week).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{weekStat.trip_count}</TableCell>
                  <TableCell>
                    {weekStat.average_duration_s.toFixed(2)}
                  </TableCell>
                  <TableCell>{weekStat.average_speed_kmh.toFixed(2)}</TableCell>
                  <TableCell>{weekStat.total_kcal.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(
                currentPage * itemsPerPage,
                activeRegion?.weekly_stats?.length || 0,
              )}{" "}
              of {activeRegion?.weekly_stats?.length || 0} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Toggle for chart property */}
      <div className="flex gap-2 pt-8">
        {chartProperties.map((prop) => (
          <Button
            key={prop.key}
            variant={selectedProperty === prop.key ? "default" : "outline"}
            onClick={() => setSelectedProperty(prop.key)}
          >
            {prop.label}
          </Button>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={activeRegion?.weekly_stats}>
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
    </div>
  );
}
