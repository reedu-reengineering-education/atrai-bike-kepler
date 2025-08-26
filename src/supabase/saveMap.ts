import { exportKeplerDatasetAndConfig } from "@/supabase/exportKeplerMap";
import { supabase } from "@/supbase-client";
import type { Session } from "@supabase/supabase-js";

export async function saveMapToSupabase(name: string, session: Session | null) {
  if (!session?.user) {
    console.error("No session found. User must be authenticated to save maps.");
    return;
  }
  if (!name) {
    throw new Error("Map name is required.");
  }
  const { dataset, config } = exportKeplerDatasetAndConfig();

  const user = session?.user;

  const { data, error } = await supabase
    .from("maps")
    .upsert({
      dataset,
      config,
      user_id: user?.id,
      title: name,
    })
    .select();

  if (error) {
    console.error("Failed to save map:", error);
    throw error;
  }

  return data[0];
}
