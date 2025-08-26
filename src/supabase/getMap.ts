import { supabase } from "@/supbase-client";

export const getMapById = async (mapId: string, userId: string) => {
  const { data, error } = await supabase
    .from("maps")
    .select("*")
    .eq("id", mapId)
    .eq("user_id", userId)
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Map not found");

  return data;
};
