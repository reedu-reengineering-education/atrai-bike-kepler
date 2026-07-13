import { PageContainer } from "@/components/layout/PageConatiner";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getStatistics } from "@/lib/pygeiapi-client/statistics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { RegionStatsWithChart, type RegionStats, type WeeklyStat } from "../charts/regional-charts";

// Campaign Stats type based on OpenAPI schema
export type CampaignStats = {
  grouptag?: string;
  total_tracks: number;
  total_distance_km: number;
  total_duration_hours: number;
  avg_track_distance_km: number;
  avg_track_duration_minutes: number;
  avg_speed_kmh: number;
  max_track_distance_km: number;
  num_riders: number;
  start_date?: string;
  end_date?: string;
};

async function getWeeklyStatistics(tag: string): Promise<WeeklyStat[]> {
  try {
    const query = new URLSearchParams({
      f: "json",
      campaign: tag,
    });
    const url = `${import.meta.env.VITE_API_URL}/collections/statistics/items?${query.toString()}`;
    const response: Response = await fetch(url);
    
    if (!response.ok) {
      console.warn(`Weekly statistics endpoint returned ${response.status}. Weekly stats visualization will not be available.`);
      return [];
    }
    
    const data: GeoJSON.FeatureCollection = await response.json();

    if (!data || !data.features || !Array.isArray(data.features)) {
      console.warn("Weekly statistics response is not a valid GeoJSON FeatureCollection");
      return [];
    }

    // Get the first feature and check if it matches the requested campaign
    const feature = data.features[0];
    
    if (!feature) {
      console.warn(`No features found for campaign: ${tag}`);
      return [];
    }

    // Check if the returned feature is for the requested campaign
    const featureTag = (feature.properties as any)?.tag;
    if (featureTag && featureTag !== tag) {
      console.warn(`Requested data for campaign '${tag}' but got data for '${featureTag}'. Weekly stats not available for this campaign.`);
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const statsStr = (feature.properties as any)?.statistics;
    
    if (!statsStr) {
      console.warn("No statistics property found in feature");
      return [];
    }

    // Fix the improperly formatted JSON (single quotes to double quotes, handle numpy types)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let parsedStats: any;
    try {
      let jsonStr = typeof statsStr === 'string' ? statsStr : JSON.stringify(statsStr);
      
      // Handle numpy types like np.float64(value), np.int64(value) - these need to become just value
      jsonStr = jsonStr.replace(/np\.float64\(([^)]*)\)/g, '$1');
      jsonStr = jsonStr.replace(/np\.int64\(([^)]*)\)/g, '$1');
      jsonStr = jsonStr.replace(/np\.float32\(([^)]*)\)/g, '$1');
      jsonStr = jsonStr.replace(/np\.int32\(([^)]*)\)/g, '$1');
      
      // Replace single quotes with double quotes
      jsonStr = jsonStr.replace(/'/g, '"');
      
      parsedStats = JSON.parse(jsonStr);
    } catch (error) {
      console.warn(`Failed to parse statistics for campaign ${tag}:`, error);
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const weekly_stats = (parsedStats?.weekly_stats ?? []).map((s: any) => ({
      week: s.week,
      trip_count: Number(s.trip_count),
      average_duration_s: Number(s.average_duration_s),
      average_speed_kmh: Number(s.average_speed_kmh),
      total_kcal: Number(s.total_kcal),
    }));

    return weekly_stats.sort(
      (a: { week: string }, b: { week: string }) => 
        new Date(a.week).getTime() - new Date(b.week).getTime(),
    );
  } catch (error) {
    console.error("Error fetching weekly statistics:", error);
    return [];
  }
}

export default function StatisticsPage() {
  const { t } = useTranslation();
  const [campaignData, setCampaignData] = useState<CampaignStats | null>(null);
  const [weeklyData, setWeeklyData] = useState<RegionStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeCampaign = useSelector(
    (state: any) => state.campaign.activeCampaign,
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!activeCampaign) {
        setCampaignData(null);
        setWeeklyData(null);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        // Fetch campaign stats
        const stats = await getStatistics(activeCampaign);
        setCampaignData(stats);

        // Fetch weekly stats
        const weekly = await getWeeklyStatistics(activeCampaign);
        setWeeklyData({
          region: stats.grouptag || activeCampaign,
          weekly_stats: weekly,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to fetch statistics";
        setError(message);
        console.error("Error fetching campaign statistics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeCampaign]);

  if (loading) {
    return (
      <PageContainer>
        <p>{t("common.loading") || "Loading..."}</p>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <div className="text-red-600">
          <p>{t("common.error") || "Error"}: {error}</p>
        </div>
      </PageContainer>
    );
  }

  if (!campaignData) {
    return (
      <PageContainer>
        <p>{t("common.noData") || "No data available"}</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{t("nav.statistics") || "Statistics"}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{t("stats.totalTracks") || "Total Tracks"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{campaignData.total_tracks.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{t("stats.totalDistance") || "Total Distance"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{campaignData.total_distance_km.toLocaleString(undefined, { maximumFractionDigits: 1 })} km</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{t("stats.totalDuration") || "Total Duration"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{campaignData.total_duration_hours.toLocaleString(undefined, { maximumFractionDigits: 1 })} h</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{t("stats.avgSpeed") || "Average Speed"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{campaignData.avg_speed_kmh.toLocaleString(undefined, { maximumFractionDigits: 1 })} km/h</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{t("stats.numRiders") || "Number of Riders"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{campaignData.num_riders.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{t("stats.maxDistance") || "Max Track Distance"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{campaignData.max_track_distance_km.toLocaleString(undefined, { maximumFractionDigits: 1 })} km</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{t("stats.avgDistance") || "Average Track Distance"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{campaignData.avg_track_distance_km.toLocaleString(undefined, { maximumFractionDigits: 2 })} km</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{t("stats.avgDuration") || "Average Track Duration"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{campaignData.avg_track_duration_minutes.toLocaleString(undefined, { maximumFractionDigits: 1 })} min</p>
            </CardContent>
          </Card>
        </div>

        {campaignData.start_date && campaignData.end_date && (
          <Card>
            <CardHeader>
              <CardTitle>{t("stats.dateRange") || "Date Range"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{campaignData.start_date} to {campaignData.end_date}</p>
            </CardContent>
          </Card>
        )}

        {/* Weekly Stats Visualization */}
        {weeklyData && weeklyData.weekly_stats.length > 0 && (
          <div className="mt-8">
            <RegionStatsWithChart activeRegion={weeklyData} />
          </div>
        )}
        
        {weeklyData && weeklyData.weekly_stats.length === 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{t("stats.dateRange") || "Weekly Statistics"}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>Weekly statistics data is not available for this campaign.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
