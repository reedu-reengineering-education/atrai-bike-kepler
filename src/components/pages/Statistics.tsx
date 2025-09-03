import { PageContainer } from "@/components/layout/PageConatiner";
import { RegionStats, RegionStatsWithChart } from "../charts/regional-charts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function formatGeoJSONToRegionStats(
  feature: GeoJSON.Feature,
): RegionStats {
  const region = feature.id?.toString() ?? "unknown";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const statsStr = (feature.properties as any)?.statistics;

  // Fix the improperly formatted JSON (single quotes to double quotes)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let parsedStats: any;
  try {
    parsedStats = JSON.parse(statsStr.replace(/'/g, '"'));
  } catch (error) {
    console.warn(`Failed to parse statistics for region ${region}:`, error);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const weekly_stats = (parsedStats?.weekly_stats ?? []).map((s: any) => ({
    week: s.week,
    trip_count: Number(s.trip_count),
    average_duration_s: Number(s.average_duration_s),
    average_speed_kmh: Number(s.average_speed_kmh),
    total_kcal: Number(s.total_kcal),
  }));

  return {
    region,
    weekly_stats: weekly_stats.sort(
      (
        a: { week: string | number | Date },
        b: { week: string | number | Date },
      ) => new Date(a.week).getTime() - new Date(b.week).getTime(),
    ),
  };
}

export default function StatisticsPage() {
  const [data, setData] = useState<RegionStats>();

  const activeCampaign = useSelector(
    (state: any) => state.campaign.activeCampaign,
  );

  useEffect(() => {
    // Fetch data from the API or any other source
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.atrai.bike/collections/statistics_flowmap/items/${activeCampaign}?f=json`,
        );
        const result = await response.json();
        const geojson = result as GeoJSON.Feature;
        const formattedData = formatGeoJSONToRegionStats(geojson);

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!activeCampaign) return;

    fetchData();
  }, [activeCampaign]);

  return (
    <PageContainer>
      {data && <RegionStatsWithChart activeRegion={data} />}
    </PageContainer>
  );
}
