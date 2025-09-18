interface BoundingBox {
  minLng: number;
  minLat: number;
  maxLng: number;
  maxLat: number;
}

/**
 * Convert bbox to Kepler.gl viewport format
 */
export function bboxToViewport(bbox: BoundingBox, padding = 0.1) {
  const centerLng = (bbox.minLng + bbox.maxLng) / 2;
  const centerLat = (bbox.minLat + bbox.maxLat) / 2;

  const lngRange = bbox.maxLng - bbox.minLng;
  const latRange = bbox.maxLat - bbox.minLat;

  // Add padding
  const paddedLngRange = lngRange * (1 + padding);
  const paddedLatRange = latRange * (1 + padding);

  // Rough zoom calculation (this is a simplified approach)
  const zoom =
    Math.min(Math.log2(360 / paddedLngRange), Math.log2(180 / paddedLatRange)) -
    1;

  return {
    longitude: centerLng,
    latitude: centerLat,
    zoom: Math.max(zoom, 1), // Ensure minimum zoom level
    pitch: 0,
    bearing: 0,
  };
}

/**
 * Check if a point is within the bbox
 */
export function isPointInBbox(
  lng: number,
  lat: number,
  bbox: BoundingBox,
): boolean {
  return (
    lng >= bbox.minLng &&
    lng <= bbox.maxLng &&
    lat >= bbox.minLat &&
    lat <= bbox.maxLat
  );
}

/**
 * Expand bbox by a given factor
 */
export function expandBbox(bbox: BoundingBox, factor = 0.1): BoundingBox {
  const lngRange = bbox.maxLng - bbox.minLng;
  const latRange = bbox.maxLat - bbox.minLat;

  const lngExpansion = (lngRange * factor) / 2;
  const latExpansion = (latRange * factor) / 2;

  return {
    minLng: bbox.minLng - lngExpansion,
    minLat: bbox.minLat - latExpansion,
    maxLng: bbox.maxLng + lngExpansion,
    maxLat: bbox.maxLat + latExpansion,
  };
}
