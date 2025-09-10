export function OvertakingDistance() {
  return (
    <div className="space-y-4">
      <p className="text-base">
        The <strong>Overtaking Distance </strong> dataset analyzes and maps
        overtaking maneuvers between vehicles and cyclists onto the road
        network. This dataset provides insights into where and how closely
        vehicles pass cyclists, helping identify dangerous road segments.
      </p>

      <h3 className="text-lg font-semibold mt-6">📊 Dataset Overview</h3>

      <h4 className="font-medium mt-4">Primary Purpose</h4>
      <p>
        This process transforms individual overtaking event data points into
        aggregated road segment information, creating a flowmap of
        vehicle-cyclist interactions across the transportation network.
      </p>

      <h4 className="font-medium mt-4">Key Metrics</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          📏 <strong>Overtaking Distance</strong>: Actual distance between
          vehicles and cyclists (centimeters)
        </li>
        <li>
          🚗 <strong>Overtaking Manoeuvre</strong>: Confidence score of
          overtaking detection events
        </li>
        <li>
          📊 <strong>Normalized Overtaking Distance</strong>: Scaled distance
          metric (0-1 scale)
        </li>
        <li>
          🛣️ <strong>Road Segment Aggregations</strong>: Statistical summaries
          per road segment
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">
        🛠️ Data Processing Pipeline
      </h3>

      <h4 className="font-medium mt-4">Data Loading & Preparation</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>Loads bicycle sensor data from database sources</li>
        <li>Retrieves road network data for spatial mapping</li>
        <li>Ensures consistent coordinate reference systems (CRS EPSG:4326)</li>
        <li>Handles CRS alignment between bike data and road networks</li>
      </ul>

      <h4 className="font-medium mt-4">Data Filtering & Cleaning</h4>
      <p>The system applies rigorous quality controls:</p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>Removes entries with missing overtaking distance data</li>
        <li>Filters for overtaking maneuvers with confidence scores &gt; 5%</li>
        <li>Excludes physically impossible distances (values ≤ 0)</li>
        <li>Converts timestamps to standardized datetime format</li>
      </ul>

      <h4 className="font-medium mt-4">Normalization Process</h4>
      <p>Overtaking distances are normalized for consistent analysis:</p>
      <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
        <code>
          {`# Normalize distance to 0-1 scale (closer = higher value)
Normalized Distance = Overtaking Distance / 200

# Clip values to maximum of 1.0
Normalized Distance = min(Normalized Distance, 1.0)`}
        </code>
      </pre>
      <p className="text-sm text-muted-foreground">
        Note: Distances beyond 200cm are capped at 1.0, making closer passes
        (more dangerous) have higher normalized values.
      </p>

      <h3 className="text-lg font-semibold mt-6">🗺️ Spatial Mapping</h3>

      <h4 className="font-medium mt-4">Point-to-Road Network Mapping</h4>
      <p>
        Individual overtaking events are mapped to the corresponding road
        segments using advanced spatial analysis:
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>Uses geometric proximity algorithms</li>
        <li>Matches GPS points to nearest road segment</li>
        <li>Handles complex road network geometries</li>
        <li>Manages coordinate system transformations</li>
      </ul>

      <h4 className="font-medium mt-4">Aggregation Process</h4>
      <p>Data is aggregated at the road segment level with:</p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>Statistical summaries (count, mean, median, etc.)</li>
        <li>Spatial aggregation by road segment geometry</li>
        <li>Preservation of original measurement distributions</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">💾 Output Data Structure</h3>

      <h4 className="font-medium mt-4">Collection: overtaking_distance</h4>
      <p>The processed data includes these key fields:</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2 text-left">
                Field Name
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left">
                Description
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left">
                Data Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-mono">
                segment_id
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Unique road segment identifier
              </td>
              <td className="border border-gray-300 px-3 py-2">String</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 font-mono">
                geometry
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Road segment geometry (LineString)
              </td>
              <td className="border border-gray-300 px-3 py-2">Geometry</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-mono">
                overtaking_count
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Number of overtaking events
              </td>
              <td className="border border-gray-300 px-3 py-2">Integer</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 font-mono">
                avg_distance
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Average overtaking distance (cm)
              </td>
              <td className="border border-gray-300 px-3 py-2">Float</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-mono">
                avg_manoeuvre
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Average confidence score
              </td>
              <td className="border border-gray-300 px-3 py-2">Float</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 font-mono">
                avg_normalized
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Average normalized distance
              </td>
              <td className="border border-gray-300 px-3 py-2">Float</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-mono">
                min_distance
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Minimum observed distance
              </td>
              <td className="border border-gray-300 px-3 py-2">Float</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 font-mono">
                max_distance
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Maximum observed distance
              </td>
              <td className="border border-gray-300 px-3 py-2">Float</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold mt-6">
        🎯 Use Cases & Applications
      </h3>

      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          <strong>Infrastructure Planning</strong>: Identify road segments
          needing protected bike lanes or traffic calming measures
        </li>
        <li>
          <strong>Safety Analysis</strong>: Pinpoint dangerous corridors with
          frequent close-pass events
        </li>
        <li>
          <strong>Traffic Engineering</strong>: Inform road design decisions
          based on actual vehicle-cyclist interactions
        </li>
        <li>
          <strong>Policy Development</strong>: Support data-driven decisions for
          cycling safety initiatives
        </li>
        <li>
          <strong>Research Studies</strong>: Enable academic research on cycling
          safety and traffic patterns
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">
        ⚙️ Technical Implementation
      </h3>

      <h4 className="font-medium mt-4">Processing Framework</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>Built on pygeoapi processing framework</li>
        <li>Supports both synchronous and asynchronous execution</li>
        <li>Uses PostgreSQL/PostGIS for spatial data storage</li>
        <li>Implements proper connection management and cleanup</li>
      </ul>

      <h4 className="font-medium mt-4">Input Requirements</h4>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <p className="text-blue-700 text-sm">
          🔑 <strong>Authentication Required</strong>: Valid token required for
          process execution
          <br />
          📋 <strong>Optional Filtering</strong>: Specific device (boxId) can be
          specified for targeted analysis
        </p>
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-4">
        <p className="text-green-700">
          💡 <strong>Pro Tip</strong>: Combine this dataset with traffic volume
          data to calculate overtaking event rates per vehicle, providing even
          more insightful safety metrics.
        </p>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
        <p className="text-amber-700 text-sm">
          ⚠️ <strong>Note</strong>: The analysis focuses on events where
          overtaking was detected with reasonable confidence (&gt;5%). Very rare
          or ambiguous events are excluded to maintain data quality.
        </p>
      </div>
    </div>
  );
}
