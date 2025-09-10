export function DangerZones() {
  return (
    <div className="space-y-4">
      <p className="text-base">
        The <strong>Danger Zones</strong> dataset provides comprehensive risk
        assessment for cyclists by analyzing both traffic behavior and
        environmental conditions. The data is visualized as heatmaps to identify
        high-risk areas.
      </p>

      <h3 className="text-lg font-semibold mt-6">📊 Dataset Overview</h3>

      <h4 className="font-medium mt-4">Data Collections</h4>
      <p>
        The system generates <strong>two separate collections</strong>:
      </p>
      <ol className="list-decimal list-inside space-y-1 ml-4">
        <li>
          <code>danger_zones</code>: Focused on traffic safety (overtaking
          behavior)
        </li>
        <li>
          <code>danger_zones_PM</code>: Combined assessment of traffic safety
          and air quality
        </li>
      </ol>

      <h4 className="font-medium mt-4">Key Indicators</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          🚗 <strong>Traffic Safety</strong>: Overtaking distances and maneuvers
        </li>
        <li>
          💨 <strong>Air Quality</strong>: Multiple particulate matter
          measurements
        </li>
        <li>
          📍 <strong>Location Data</strong>: Precise GPS coordinates for mapping
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🛠️ Data Collection</h3>
      <p>Sensor-equipped bicycles collect the following data:</p>

      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          📏 <strong>Overtaking Data</strong>
          <ul className="list-circle list-inside space-y-1 ml-6">
            <li>Distance between cyclist and passing vehicle (centimeters)</li>
            <li>Frequency and timing of overtaking maneuvers</li>
            <li>Confidence score for each overtaking event detection</li>
          </ul>
        </li>
        <li>
          🌡️ <strong>Environmental Data</strong>
          <ul className="list-circle list-inside space-y-1 ml-6">
            <li>Fine dust particles: PM1, PM2.5, PM4, PM10 (μg/m³)</li>
            <li>Relative humidity (%) - used for data quality control</li>
            <li>Temperature and other ambient conditions</li>
          </ul>
        </li>
        <li>
          📍 <strong>Location & Metadata</strong>
          <ul className="list-circle list-inside space-y-1 ml-6">
            <li>High-precision GPS coordinates (latitude/longitude)</li>
            <li>Device identifier (boxId) for data source tracking</li>
            <li>Timestamp for temporal analysis</li>
            <li>Geometric coordinates for spatial mapping</li>
          </ul>
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🔍 Data Quality Controls</h3>

      <h4 className="font-medium mt-4">Filtering Criteria</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>Minimum Data Points</strong>: ≥ 10 records per device (boxId)
          to ensure statistical significance
        </li>
        <li>
          <strong>Humidity Filter</strong>: Excludes air quality readings with
          humidity greater than 75% for accuracy
        </li>
        <li>
          <strong>Outlier Removal</strong>: Automated per-device outlier
          detection using statistical methods
        </li>
        <li>
          <strong>Distance Normalization</strong>: All overtaking distances
          capped at 400m maximum for consistency
        </li>
        <li>
          <strong>Confidence Threshold</strong>: Overtaking events filtered for
          confidence score greater than 5%
        </li>
      </ul>

      <h4 className="font-medium mt-4">Data Processing Steps</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          Outliers in PM measurements replaced with NaN values to prevent
          skewing
        </li>
        <li>
          PM measurements normalized against their maximum values in the dataset
          (0-1 scale)
        </li>
        <li>
          Overtaking distance normalized: closer distances = higher risk (0-1
          scale)
        </li>
        <li>Geographic data converted to standard coordinate systems</li>
        <li>Timestamp synchronization across all data sources</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📈 Risk Index Calculations</h3>

      <h4 className="font-medium mt-4">
        1️⃣ Overtaking Risk Index (danger_zones)
      </h4>
      <p>Focused purely on traffic safety aspects from vehicle interactions.</p>

      <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
        <code>
          {`# Normalize distance (0-1 scale, closer = more dangerous)
Normalized Distance = 1 - (Overtaking Distance / 400)
Normalized Distance = clip(Normalized Distance, 0, 1)

# Calculate risk (only for overtaking confidence > 5%)
Risk Index = (0.3 × Overtaking Manoeuvre) +
             (0.7 × Normalized Distance)`}
        </code>
      </pre>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <p className="text-blue-700">
          🚗 <strong>Traffic Focus:</strong> This index helps identify dangerous
          traffic corridors where vehicles frequently pass too closely to
          cyclists.
        </p>
      </div>

      <h4 className="font-medium mt-6">
        2️⃣ Comprehensive PM Risk Index (danger_zones_PM)
      </h4>
      <p>
        Combines traffic safety with environmental air quality measurements for
        holistic risk assessment.
      </p>

      <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
        <code>
          {`# Normalize all PM values (0-1 scale)
Normalized PM = PM Value / max(PM Value in dataset)

# Comprehensive risk calculation with weighted factors
Risk Index = (0.15 × Overtaking Manoeuvre) +      # Traffic safety
             (0.35 × Normalized Distance) +        # Proximity risk
             (0.20 × Normalized PM1) +            # Ultra-fine particles
             (0.15 × Normalized PM2.5) +          # Respirable particles
             (0.10 × Normalized PM4) +            # Coarse particles
             (0.05 × Normalized PM10)             # Inhalable particles`}
        </code>
      </pre>

      <div className="bg-green-50 border-l-4 border-green-500 p-4">
        <p className="text-green-700">
          🌿 <strong>Environmental Health:</strong> This index identifies areas
          where poor air quality compounds traffic dangers, creating
          particularly hazardous conditions for cyclists.
        </p>
      </div>

      <h3 className="text-lg font-semibold mt-6">🗺️ Output Format</h3>
      <p>
        Each collection contains geospatial point data with the following
        fields:
      </p>

      <h4 className="font-medium mt-4">Common Fields (both collections)</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>id</strong> - Unique identifier for each data point
        </li>
        <li>
          <strong>lat</strong> - Latitude coordinate
        </li>
        <li>
          <strong>lng</strong> - Longitude coordinate
        </li>
        <li>
          <strong>geometry</strong> - Geographic point data for spatial analysis
        </li>
        <li>
          <strong>createdAt</strong> - Timestamp of the original measurement
        </li>
        <li>
          <strong>boxId</strong> - Source device identifier
        </li>
      </ul>

      <h4 className="font-medium mt-4">danger_zones Specific Fields</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>Risk Index Overtaking</strong> - Calculated traffic risk score
          (0-1)
        </li>
        <li>
          <strong>Overtaking Manoeuvre</strong> - Original maneuver detection
          score
        </li>
        <li>
          <strong>Overtaking Distance</strong> - Original distance measurement
          (cm)
        </li>
        <li>
          <strong>Normalized Distance</strong> - Normalized distance score (0-1)
        </li>
      </ul>

      <h4 className="font-medium mt-4">danger_zones_PM Specific Fields</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>Risk Index</strong> - Comprehensive risk score (0-1)
        </li>
        <li>
          <strong>Finedust PM1</strong> - Original PM1 measurement (μg/m³)
        </li>
        <li>
          <strong>Finedust PM2.5</strong> - Original PM2.5 measurement (μg/m³)
        </li>
        <li>
          <strong>Finedust PM4</strong> - Original PM4 measurement (μg/m³)
        </li>
        <li>
          <strong>Finedust PM10</strong> - Original PM10 measurement (μg/m³)
        </li>
        <li>
          <strong>Normalized PM1/PM2.5/PM4/PM10</strong> - Normalized values
          (0-1)
        </li>
        <li>
          <strong>Rel. Humidity</strong> - Humidity reading used for filtering
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🎯 Practical Applications</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          <strong>Safe Route Planning</strong> - Avoid high-risk areas when
          choosing cycling routes
        </li>
        <li>
          <strong>Urban Infrastructure Planning</strong> - Identify locations
          needing protected bike lanes or traffic calming measures
        </li>
        <li>
          <strong>Environmental Health Monitoring</strong> - Track air quality
          hotspots and their impact on cycling safety
        </li>
        <li>
          <strong>Policy Development</strong> - Data-driven decisions for
          cycling infrastructure investments
        </li>
        <li>
          <strong>Real-time Safety Alerts</strong> - Warn cyclists when entering
          high-risk zones
        </li>
        <li>
          <strong>Academic Research</strong> - Study correlations between
          traffic patterns, air quality, and cycling safety
        </li>
      </ul>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-6">
        <p className="text-amber-700">
          ⚠️ <strong>Note:</strong> Risk indices are relative scores within the
          dataset. A score of 0.8 indicates higher risk relative to other
          measured locations, not an absolute danger level. Always exercise
          caution and follow local traffic regulations.
        </p>
      </div>
    </div>
  );
}
