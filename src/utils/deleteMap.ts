import { supabase } from "@/supbase-client";

export async function deleteMapById(mapId: string) {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError) {
    throw new Error("Failed to get session: " + sessionError.message);
  }
  if (!session || !session.user) {
    throw new Error("Unauthorized: User not logged in.");
  }
  const { error } = await supabase.from("maps").delete().eq("id", mapId);

  if (error) throw new Error(error.message);
}
