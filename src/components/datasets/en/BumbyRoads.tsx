export function BumpyRoads() {
  return (
    <div className="space-y-4">
      <p className="text-base">
        The <strong>Bumpy Roads</strong> dataset identifies and categorizes road
        segments based on surface quality to help cyclists avoid uncomfortable
        or potentially dangerous routes. This data is essential for route
        planning and urban infrastructure improvement.
      </p>

      <h3 className="text-lg font-semibold mt-6">📊 Dataset Overview</h3>

      <h4 className="font-medium mt-4">Data Collection</h4>
      <p>
        The system analyzes various road surface types detected by bicycle
        sensors:
      </p>

      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          🚲 <strong>Surface Types and Base Scores</strong>:
          <ul className="list-circle list-inside space-y-1 ml-6">
            <li>Asphalt (Score: 1) - Smoothest surface</li>
            <li>Paving (Score: 2) - Moderate roughness</li>
            <li>Compacted (Score: 3) - Higher roughness</li>
            <li>Sett (Score: 4) - Highest roughness</li>
          </ul>
        </li>
      </ul>

      <h4 className="font-medium mt-4">Roughness Calculation</h4>
      <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
        <code>
          {`Roughness Score = (1 × Asphalt%) + (2 × Paving%) +
                (3 × Compacted%) + (4 × Sett%)

# Normalized to 0-100 scale
Normalized Score = (Roughness / Max_Roughness) × 100`}
        </code>
      </pre>

      <h4 className="font-medium mt-4">Road Classification</h4>
      <p>
        Roads are classified into five categories based on their normalized
        roughness score:
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Score Range
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Color Code
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Road Quality
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">0-20</td>
              <td className="border border-gray-300 px-4 py-2">🟢 Green</td>
              <td className="border border-gray-300 px-4 py-2">Very Smooth</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">21-40</td>
              <td className="border border-gray-300 px-4 py-2">
                🟩 Light Green
              </td>
              <td className="border border-gray-300 px-4 py-2">Smooth</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">41-60</td>
              <td className="border border-gray-300 px-4 py-2">🟡 Yellow</td>
              <td className="border border-gray-300 px-4 py-2">Moderate</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">61-80</td>
              <td className="border border-gray-300 px-4 py-2">🟧 Orange</td>
              <td className="border border-gray-300 px-4 py-2">Rough</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">81-100</td>
              <td className="border border-gray-300 px-4 py-2">🔴 Red</td>
              <td className="border border-gray-300 px-4 py-2">Very Rough</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold mt-6">🔍 Data Processing</h3>

      <h4 className="font-medium mt-4">Data Cleaning</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>Removes entries with missing surface type data</li>
        <li>
          Filters out irrelevant measurements (temperature, humidity, etc.)
        </li>
        <li>Ensures complete surface type information for accurate scoring</li>
      </ul>

      <h4 className="font-medium mt-4">Mapping Process</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>Maps point measurements to specific road segments</li>
        <li>
          Aggregates multiple measurements per road segment for reliability
        </li>
        <li>Calculates average roughness score for each segment</li>
        <li>Handles edge cases and missing data through interpolation</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🗺️ Output Format</h3>
      <p>
        The <code>bumpy_roads</code> collection contains the following fields:
      </p>

      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>segment_id</strong> - Unique identifier for each road segment
        </li>
        <li>
          <strong>geometry</strong> - Geographic data (LineString) of the road
          segment
        </li>
        <li>
          <strong>raw_roughness_score</strong> - Calculated roughness before
          normalization
        </li>
        <li>
          <strong>normalized_score</strong> - Final score normalized to 0-100
          scale
        </li>
        <li>
          <strong>road_quality</strong> - Text classification (Very Smooth,
          Smooth, etc.)
        </li>
        <li>
          <strong>surface_breakdown</strong> - Percentage composition of each
          surface type
        </li>
        <li>
          <strong>measurement_count</strong> - Number of data points used for
          calculation
        </li>
        <li>
          <strong>last_updated</strong> - Timestamp of the most recent data
          processing
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🎯 Use Cases</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          <strong>Route Planning</strong> - Cyclists can avoid rough roads and
          choose smoother alternatives
        </li>
        <li>
          <strong>Urban Planning</strong> - City officials can identify roads
          needing maintenance or repaving
        </li>
        <li>
          <strong>Infrastructure Analysis</strong> - Compare road quality across
          different neighborhoods and districts
        </li>
        <li>
          <strong>Historical Tracking</strong> - Monitor how road conditions
          change over time after maintenance work
        </li>
        <li>
          <strong>Accessibility Planning</strong> - Identify routes suitable for
          cyclists with different comfort levels and bike types
        </li>
      </ul>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
        <p className="text-blue-700">
          💡 <strong>Pro Tip:</strong> Combine this dataset with traffic
          patterns to find the optimal balance between smooth roads and safe
          cycling conditions.
        </p>
      </div>
    </div>
  );
}
