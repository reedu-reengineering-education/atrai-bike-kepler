export function RoadNetworkDE() {
  return (
    <div className="space-y-4">
      <p className="text-base">
        Der <strong>RoadNetwork</strong>-Prozessor berechnet und importiert
        Straßennetzdaten mit Fokus auf Fahrrad-Infrastruktur. Er extrahiert
        OpenStreetMap-Daten, wendet Filter an und speichert die Ergebnisse in
        einer Datenbank zur weiteren Analyse.
      </p>

      <h3 className="text-lg font-semibold mt-6">📊 Metadaten</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>ID:</strong> road_network
        </li>
        <li>
          <strong>Version:</strong> 0.2.0
        </li>
        <li>
          <strong>Beschreibung:</strong> Prozess zur Berechnung von
          Straßennetzen
        </li>
        <li>
          <strong>Job-Control-Optionen:</strong> sync-execute, async-execute
        </li>
        <li>
          <strong>Schlüsselwörter:</strong> Prozess
        </li>
        <li>
          <strong>Mehr Info:</strong>{" "}
          <a href="https://example.org/process" target="_blank">
            Prozess-Dokumentation
          </a>
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🛠️ Eingaben</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>token:</strong> Geheimer Token zur Authentifizierung
        </li>
        <li>
          <strong>location:</strong> Ort (Stadt, Landkreis, Land) zur
          Netzwerkanalyse
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📤 Ausgaben</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>id:</strong> ID der Prozessa usführung
        </li>
        <li>
          <strong>status:</strong> Statusmeldung mit Anzahl importierter Kanten
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📈 Ablauf</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Überprüfung der Parameter (location, token)</li>
        <li>
          Download des Straßennetzes aus OpenStreetMap mit Fahrrad-Filtern
        </li>
        <li>Zusammenführung mehrerer Orte zu einem Netz</li>
        <li>Extraktion der Kanten (osmid, name, surface, geometry)</li>
        <li>Speicherung im PostGIS (Straßennetz und Fahrradnetz)</li>
        <li>Aktualisierung der Konfiguration bei neuen Collections</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🎯 Anwendungsfälle</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Analyse der Fahrradinfrastruktur in Städten</li>
        <li>Planung nachhaltiger Mobilität</li>
        <li>Kombination mit Luftverschmutzungsdaten</li>
        <li>Erstellung von Karten und Routing-Modellen für Radfahrer</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">⚠️ Hinweise</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Authentifizierung per Token erforderlich</li>
        <li>Unterstützt mehrere Orte in einer Anfrage</li>
        <li>Ergebnisse werden in PostGIS gespeichert</li>
      </ul>
    </div>
  );
}
