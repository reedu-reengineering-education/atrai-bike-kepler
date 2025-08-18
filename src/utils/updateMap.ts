import { supabase } from "@/supbase-client";

export async function updateMapById(mapId: string, data: any) {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  console.log("Session data:", session);
  if (sessionError) {
    throw new Error("Failed to get session: " + sessionError.message);
  }
  if (!session || !session.user) {
    throw new Error("Unauthorized: User not logged in.");
  }
  const { error } = await supabase.from("maps").update(data).eq("id", mapId);

  if (error) throw new Error(error.message);
}
