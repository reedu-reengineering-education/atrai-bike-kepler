import { supabase } from "@/supbase-client";

export async function deleteMapById(mapId: string) {
  const { error } = await supabase.from("maps").delete().eq("id", mapId);

  if (error) throw new Error(error.message);
}
