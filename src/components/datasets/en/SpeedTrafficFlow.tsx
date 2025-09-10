export function SpeedTrafficFlow() {
  return (
    <div className="space-y-4">
      <p className="text-base">
        The <strong>SpeedTrafficFlow</strong> processor analyzes speed and
        traffic flow collected from bicycle sensors. It aggregates the data by
        road segments and generates statistical summaries and visualizations to
        better understand traffic dynamics.
      </p>

      <h3 className="text-lg font-semibold mt-6">📊 Metadata</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>ID:</strong> speed_traffic_flow
        </li>
        <li>
          <strong>Version:</strong> 0.2.0
        </li>
        <li>
          <strong>Description:</strong> Evaluates speed and traffic flow
        </li>
        <li>
          <strong>Job Control Options:</strong> sync-execute, async-execute
        </li>
        <li>
          <strong>Keywords:</strong> process
        </li>
        <li>
          <strong>More information:</strong>{" "}
          <a href="https://example.org/process" target="_blank">
            process documentation
          </a>
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🛠️ Inputs</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>id (boxId):</strong> Device identifier for retrieving data
        </li>
        <li>
          <strong>token:</strong> Secret token for authentication
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📤 Outputs</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>id:</strong> The ID of the process execution
        </li>
        <li>
          <strong>status:</strong> Process status message
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📈 Workflow</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>
          Filters bicycle movement data (minimum 10 measurements per device)
        </li>
        <li>Computes normalized speed (0–1 scale)</li>
        <li>
          Matches bicycle data to road segments using nearest neighbor search
        </li>
        <li>Aggregates speed and traffic flow per road segment</li>
        <li>Generates GeoDataFrames and stores them in PostGIS</li>
        <li>
          Handles stationary vehicles and filters segments for traffic flow
          analysis
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🎯 Use Cases</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Analyze bicycle speeds across different road segments</li>
        <li>Evaluate traffic flow along cycling routes</li>
        <li>Identify bottlenecks or slow segments</li>
        <li>Support traffic planning and infrastructure decisions</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">⚠️ Notes</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Devices with fewer than 10 measurements are excluded</li>
        <li>Negative speed values are ignored</li>
        <li>An authentication token is required</li>
      </ul>
    </div>
  );
}
