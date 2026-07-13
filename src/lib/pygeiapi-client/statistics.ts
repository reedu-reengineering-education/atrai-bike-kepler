export async function getAllStatistics() {
  const url = `${import.meta.env.VITE_API_URL}/campaigns`;
  const response: Response = await fetch(url);
  const data = await response.json();

  console.log("data", data);

  return data;
}

export async function getStatistics(tag: string) {
  const url = `${import.meta.env.VITE_API_URL}/campaigns/${tag}`;
  const response: Response = await fetch(url);
  const data = await response.json();
  
  if (!data) {
    throw new Error(`No campaign stats found for tag: ${tag}`);
  }
  
  return data;
}
