export type Campaign = {
  label: string;
  value: string;
  bbox?: [number, number, number, number];
};

const FALLBACK_CAMPAIGNS = "LAUDS,lauds_26,6.065,48.617,6.308,48.757; Heilbronn,heilbronn,9.15,49.12,9.25,49.16";

/**
 * Parse campaigns from a raw string format
 * Format: "Label,value,minLon,minLat,maxLon,maxLat; Label2,value2,..."
 */
function parseCampaignString(raw: string): Campaign[] {
  return raw
    .split(/;|\n/)
    .map((s: string) => s.trim())
    .filter(Boolean)
    .map((pair: string) => {
      const parts = pair.split(",").map((p) => p.trim());
      const label = parts[0] || "";
      const valueRaw = parts[1] || label || pair;
      const value = valueRaw.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_-]/gi, "");

      let bbox: Campaign['bbox'] | undefined = undefined;
      if (parts.length >= 6) {
        const nums = parts.slice(2, 6).map((n) => Number.parseFloat(n));
        if (nums.every((n) => Number.isFinite(n))) {
          bbox = [nums[0], nums[1], nums[2], nums[3]] as [number, number, number, number];
        }
      }

      return {
        label: label || value || pair,
        value,
        ...(bbox ? { bbox } : {}),
      };
    });
}

/**
 * Get campaigns from API if available, falling back to environment variable
 */
export async function getCampaignsAsync(): Promise<Campaign[]> {
  try {
    const response = await fetch("https://api.atrai.bike/campaigns");
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const data = await response.json() as { campaigns?: Array<{ grouptag?: string }> };
    const apiCampaigns = data.campaigns || [];
    
    if (apiCampaigns.length > 0) {
      // Build campaigns from API, using bbox from env var if available
      const envCampaigns = parseCampaignString(
        import.meta.env.VITE_CAMPAIGNS || FALLBACK_CAMPAIGNS
      );
      const envMap = new Map(envCampaigns.map(c => [c.value, c]));
      
      return apiCampaigns
        .filter((c) => c.grouptag)
        .map((c) => {
          const grouptag = c.grouptag!.toLowerCase().replace(/\s+/g, "_");
          const envCampaign = envMap.get(grouptag);
          
          return {
            label: envCampaign?.label || grouptag,
            value: grouptag,
            ...(envCampaign?.bbox ? { bbox: envCampaign.bbox } : {}),
          };
        });
    }
  } catch (error) {
    console.warn("Failed to fetch campaigns from API, using fallback:", error);
  }
  
  // Fallback to environment variable or hardcoded defaults
  return parseCampaignString(
    import.meta.env.VITE_CAMPAIGNS || FALLBACK_CAMPAIGNS
  );
}

/**
 * Synchronous version for backward compatibility
 * Use getCampaignsAsync() for fresh data from API
 */
export function getCampaigns(): Campaign[] {
  const raw = import.meta.env.VITE_CAMPAIGNS || FALLBACK_CAMPAIGNS;
  return parseCampaignString(raw);
}
