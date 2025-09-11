export function RoadNetwork() {
  return (
    <div className="space-y-4">
      <p className="text-base">
        The <strong>RoadNetwork</strong> processor calculates and imports{" "}
        <strong>road network data</strong> (with bicycle-relevant filters) into
        the database. It uses{" "}
        <a
          href="https://osmnx.readthedocs.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          OSMnx
        </a>{" "}
        and <strong>NetworkX</strong> to build directed graphs of road
        infrastructure from OpenStreetMap.
      </p>

      <h3 className="text-lg font-semibold mt-6">📊 Metadata</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>ID:</strong> road_network
        </li>
        <li>
          <strong>Version:</strong> 0.2.0
        </li>
        <li>
          <strong>Description:</strong> Processes to calculate road network
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
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>
          <strong>token:</strong> Secret token to authenticate the request.
        </li>
        <li>
          <strong>location:</strong> Location string or structured place
          (city/county/country) to fetch the road network from.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📤 Outputs</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>
          <strong>id:</strong> ID of the process execution
        </li>
        <li>
          <strong>status:</strong> Message describing road network import and
          number of edges processed
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📈 Processing Workflow</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Validate input parameters and token</li>
        <li>Download road network data from OpenStreetMap via OSMnx</li>
        <li>
          Apply filters to select cycling-relevant roads, paths, and lanes
        </li>
        <li>Build a directed multi-graph of the road network using NetworkX</li>
        <li>
          Convert graph to GeoDataFrame of edges (osmid, name, surface,
          geometry)
        </li>
        <li>
          Import processed road network into PostGIS (full table + simplified
          bike road table)
        </li>
        <li>Register dataset as a new collection in the configuration</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">
        📂 Generated Database Tables
      </h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>road_network_[campaign]</strong> — Complete road network with
          attributes
        </li>
        <li>
          <strong>bike_road_network_[campaign]</strong> — Simplified bike road
          network
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🎯 Use Cases</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Build bicycle routing and navigation services</li>
        <li>Analyze cycling infrastructure coverage</li>
        <li>
          Support traffic flow or safety processes with network connectivity
          data
        </li>
        <li>Enable spatial analysis of bike-friendly roads</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">⚠️ Notes</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>
          Requires a valid <strong>API token</strong> for execution
        </li>
        <li>
          Road network filters are focused on{" "}
          <strong>bicycle-relevant infrastructure</strong>
        </li>
        <li>Data is stored in PostGIS for further processing</li>
      </ul>
    </div>
  );
}
