import { supabase } from "@/supbase-client";

export async function updateMapById(mapId: string, data: any) {
  const { error } = await supabase.from("maps").update(data).eq("id", mapId);

  if (error) throw new Error(error.message);
}
