export function SpeedTrafficFlowDE() {
  return (
    <div className="space-y-4">
      <p className="text-base">
        Der <strong>SpeedTrafficFlow</strong> Prozessor analysiert die
        Geschwindigkeit und den Verkehrsfluss von Fahrradsensoren. Er aggregiert
        die Daten nach Straßenabschnitten und erstellt statistische
        Zusammenfassungen sowie Visualisierungen, um die Verkehrsdynamik zu
        verstehen.
      </p>

      <h3 className="text-lg font-semibold mt-6">📊 Metadaten</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>ID:</strong> speed_traffic_flow
        </li>
        <li>
          <strong>Version:</strong> 0.2.0
        </li>
        <li>
          <strong>Beschreibung:</strong> Analysiert Geschwindigkeit und
          Verkehrsfluss
        </li>
        <li>
          <strong>Job Control Options:</strong> sync-execute, async-execute
        </li>
        <li>
          <strong>Keywords:</strong> Prozess
        </li>
        <li>
          <strong>Weitere Infos:</strong>{" "}
          <a href="https://example.org/process" target="_blank">
            Prozessdokumentation
          </a>
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🛠️ Eingaben</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>id (boxId):</strong> Geräte-ID für Datenabfrage
        </li>
        <li>
          <strong>token:</strong> Geheimer Token zur Authentifizierung
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📤 Ausgaben</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>id:</strong> ID der Prozessaussführung
        </li>
        <li>
          <strong>status:</strong> Statusmeldung des Prozesses
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📈 Arbeitsablauf</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>
          Filtern der Fahrradbewegungsdaten (mindestens 10 Messungen pro Gerät)
        </li>
        <li>Berechnung der Normalisierten Geschwindigkeit (0–1 Skala)</li>
        <li>
          Zuordnung der Fahrraddaten zu Straßenabschnitten mittels nächster
          Nachbarn Suche
        </li>
        <li>
          Aggregation von Geschwindigkeit und Verkehrsfluss pro Straßenabschnitt
        </li>
        <li>Erzeugung von GeoDataFrames und Speicherung in PostGIS</li>
        <li>
          Behandlung stehender Fahrzeuge und Segmentfilterung für
          Verkehrsflussanalyse
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🎯 Anwendungsfälle</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Analyse der Fahrradgeschwindigkeit auf verschiedenen Straßen</li>
        <li>Bewertung des Verkehrsflusses entlang von Radwegen</li>
        <li>Identifikation von Engpässen oder langsamen Segmenten</li>
        <li>
          Unterstützung von Verkehrsplanung und Infrastrukturentscheidungen
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">⚠️ Hinweise</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Geräte mit weniger als 10 Messungen werden ausgeschlossen</li>
        <li>Negative Geschwindigkeitswerte werden ignoriert</li>
        <li>Ein Authentifizierungstoken ist erforderlich</li>
      </ul>
    </div>
  );
}
