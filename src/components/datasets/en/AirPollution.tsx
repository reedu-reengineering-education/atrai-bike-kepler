export function AirPollution() {
  return (
    <div className="space-y-4">
      <p className="text-base">
        The <strong>PMAnalysis</strong> processor evaluates particulate matter
        (PM) concentrations collected from bicycle sensors. It generates
        visualizations and heatmaps to analyze spatial, temporal, and seasonal
        variations of PM levels.
      </p>

      <h3 className="text-lg font-semibold mt-6">📊 Metadata</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>ID:</strong> pm_analysis
        </li>
        <li>
          <strong>Version:</strong> 0.2.0
        </li>
        <li>
          <strong>Description:</strong> Processes to evaluate PM concentrations
        </li>
        <li>
          <strong>Job Control Options:</strong> sync-execute, async-execute
        </li>
        <li>
          <strong>Keywords:</strong> process
        </li>
        <li>
          <strong>More info:</strong>{" "}
          <a href="https://example.org/process" target="_blank">
            process documentation
          </a>
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🛠️ Inputs</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>id (boxId):</strong> String identifier for the device to
          retrieve data from.
        </li>
        <li>
          <strong>token:</strong> Secret token to authenticate the request.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📤 Outputs</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>id:</strong> ID of the process execution
        </li>
        <li>
          <strong>status:</strong> Describes the process and created files
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📈 Processing Workflow</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>
          Load bicycle sensor data and compute latitude/longitude from geometry
        </li>
        <li>Filter devices with at least 10 measurements</li>
        <li>Remove outliers and high-humidity measurements (&gt; 75%)</li>
        <li>
          Generate PM boxplots for PM1, PM2.5, PM4, and PM10 concentrations
        </li>
        <li>
          Compute diurnal and monthly average PM2.5 concentrations and visualize
          with plots
        </li>
        <li>
          Create geospatial heatmaps for PM2.5, including seasonal and
          time-based filtering
        </li>
        <li>Save all visualizations as PNG and HTML files</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📂 Generated Files</h3>
      <ul className="list-disc list-inside ml-4">
        <li>pm_boxplots.png — Boxplots of PM concentrations</li>
        <li>pm_diurnal_cycle.png — PM2.5 diurnal cycle plot</li>
        <li>pm_monthly_avg.png — PM2.5 monthly averages plot</li>
        <li>PM_25_heatmap.html — Heatmap of PM2.5 concentrations</li>
        <li>
          PM_25_timeframe_heatmap.html — Seasonal/time-filtered PM2.5 heatmap
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🎯 Use Cases</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Monitor air quality variations in urban areas</li>
        <li>Analyze temporal trends (diurnal and monthly) of PM pollution</li>
        <li>Identify hotspots of high PM concentrations</li>
        <li>Support research and policy decisions on environmental health</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">⚠️ Notes</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>
          Devices with fewer than 10 measurements are excluded for statistical
          relevance
        </li>
        <li>Measurements with relative humidity &gt; 75% are filtered out</li>
        <li>Authentication token is required for execution</li>
      </ul>
    </div>
  );
}
