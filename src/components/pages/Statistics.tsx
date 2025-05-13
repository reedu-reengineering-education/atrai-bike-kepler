import { PageContainer } from "@/components/layout/PageConatiner";
import { RegionStats, RegionStatsWithChart } from "../charts/regional-charts";
import { useEffect, useState } from "react";

export function formatGeoJSONToRegionStats(
  geojson: GeoJSON.FeatureCollection,
): RegionStats[] {
  const regionStatsArray: RegionStats[] = [];

  for (const feature of geojson.features) {
    const region = feature.id?.toString() ?? "unknown";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const statsStr = (feature.properties as any)?.statistics;
    if (!statsStr) continue;

    // Fix the improperly formatted JSON (single quotes to double quotes)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let parsedStats: any;
    try {
      parsedStats = JSON.parse(statsStr.replace(/'/g, '"'));
    } catch (error) {
      console.warn(`Failed to parse statistics for region ${region}:`, error);
      continue;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const weekly_stats = (parsedStats?.weekly_stats ?? []).map((s: any) => ({
      week: s.week,
      trip_count: Number(s.trip_count),
      average_duration_s: Number(s.average_duration_s),
      average_speed_kmh: Number(s.average_speed_kmh),
      total_kcal: Number(s.total_kcal),
    }));

    if (weekly_stats.length === 0) continue;

    regionStatsArray.push({
      region,
      weekly_stats: weekly_stats.sort(
        (
          a: { week: string | number | Date },
          b: { week: string | number | Date },
        ) => new Date(a.week).getTime() - new Date(b.week).getTime(),
      ),
    });
  }

  return regionStatsArray;
}

export default function StatisticsPage() {
  const [data, setData] = useState<RegionStats[]>([]);

  useEffect(() => {
    // Fetch data from the API or any other source
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.atrai.bike/collections/statistics_flowmap/items?f=json",
        );
        const result = await response.json();
        const geojson = result as GeoJSON.FeatureCollection;
        const formattedData = formatGeoJSONToRegionStats(geojson);

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <PageContainer>
      <RegionStatsWithChart data={data} />
    </PageContainer>
  );
}
