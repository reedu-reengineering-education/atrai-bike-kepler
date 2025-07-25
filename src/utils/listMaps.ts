import { supabase } from "@/supbase-client";

export async function listMapsFromSupabase(userId: string) {
  try {
    const { data, error } = await supabase
      .from("maps")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching maps:", error);
    return [];
  }
}
