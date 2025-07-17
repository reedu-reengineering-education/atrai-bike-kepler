import { exportKeplerDatasetAndConfig } from "@/utils/exportKeplerMap";
import { supabase } from "@/supbase-client";
import type { Session } from "@supabase/supabase-js";

export async function saveMapToSupabase(session: Session | null) {
  if (!session?.user) {
    console.error("No session found. User must be authenticated to save maps.");
    return;
  }
  const mapName = prompt("Enter a name for your map:");
  if (!mapName) {
    alert("Map name is required.");
    return;
  }
  const { datasetId1, geojson, config } = exportKeplerDatasetAndConfig();
  console.log(
    "datasetId:",
    datasetId1,
    "Data:",
    geojson,
    "config files:",
    config,
  );

  const user = session?.user;

  const { data, error } = await supabase.from("maps").insert([
    {
      dataset_id: datasetId1,
      dataset: geojson,
      config: config,
      user_id: user?.id,
      title: mapName,
    },
  ]);

  if (error) {
    console.error("Failed to save map:", error);
  } else {
    console.log("Map saved:", data);
  }
}
