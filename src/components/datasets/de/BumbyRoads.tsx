export function BumpyRoadsDE() {
  return (
    <div className="space-y-4">
      <p className="text-base">
        Der <strong>Holprige Straßen</strong>-Datensatz identifiziert und
        kategorisiert Straßenabschnitte basierend auf der Oberflächenqualität,
        um Radfahrern zu helfen, unangenehme oder potenziell gefährliche Routen
        zu vermeiden. Diese Daten sind entscheidend für die Routenplanung und
        die Verbesserung der städtischen Infrastruktur.
      </p>

      <h3 className="text-lg font-semibold mt-6">📊 Datensatz Übersicht</h3>

      <h4 className="font-medium mt-4">Datensammlung</h4>
      <p>
        Das System analysiert verschiedene Straßenoberflächen, die von
        Fahrradsensoren erkannt werden:
      </p>

      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          🚲 <strong>Oberflächentypen und Basiswerte</strong>:
          <ul className="list-circle list-inside space-y-1 ml-6">
            <li>Asphalt (Score: 1) - Glatteste Oberfläche</li>
            <li>Pflaster (Score: 2) - Mittlere Rauheit</li>
            <li>Verdichtet (Score: 3) - Höhere Rauheit</li>
            <li>Setzstein (Score: 4) - Höchste Rauheit</li>
          </ul>
        </li>
      </ul>

      <h4 className="font-medium mt-4">Rauheitsberechnung</h4>
      <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
        <code>
          {`Rauheitswert = (1 × Asphalt%) + (2 × Pflaster%) +
(3 × Verdichtet%) + (4 × Setzstein%)

# Normalisiert auf Skala 0-100
Normalisierter Wert = (Rauheit / Max_Rauheit) × 100`}
        </code>
      </pre>

      <h4 className="font-medium mt-4">Straßenklassifikation</h4>
      <p>
        Straßen werden basierend auf dem normalisierten Rauheitswert in fünf
        Kategorien eingeteilt:
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Scorebereich
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Farbcode
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Straßenqualität
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">0-20</td>
              <td className="border border-gray-300 px-4 py-2">🟢 Grün</td>
              <td className="border border-gray-300 px-4 py-2">Sehr glatt</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">21-40</td>
              <td className="border border-gray-300 px-4 py-2">🟩 Hellgrün</td>
              <td className="border border-gray-300 px-4 py-2">Glatt</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">41-60</td>
              <td className="border border-gray-300 px-4 py-2">🟡 Gelb</td>
              <td className="border border-gray-300 px-4 py-2">Mittel</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">61-80</td>
              <td className="border border-gray-300 px-4 py-2">🟧 Orange</td>
              <td className="border border-gray-300 px-4 py-2">Rau</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">81-100</td>
              <td className="border border-gray-300 px-4 py-2">🔴 Rot</td>
              <td className="border border-gray-300 px-4 py-2">Sehr rau</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold mt-6">🔍 Datenverarbeitung</h3>

      <h4 className="font-medium mt-4">Datenbereinigung</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>Entfernt Einträge mit fehlenden Oberflächentyp-Daten</li>
        <li>
          Filtert irrelevante Messwerte aus (Temperatur, Luftfeuchtigkeit, etc.)
        </li>
        <li>
          Stellt vollständige Oberflächentyp-Informationen für genaue
          Bewertungen sicher
        </li>
      </ul>

      <h4 className="font-medium mt-4">Kartierungsprozess</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>Ordnet Punktmessungen bestimmten Straßenabschnitten zu</li>
        <li>
          Aggregiert mehrere Messungen pro Straßenabschnitt für Zuverlässigkeit
        </li>
        <li>Berechnet durchschnittlichen Rauheitswert für jeden Abschnitt</li>
        <li>Behandelt Randfälle und fehlende Daten durch Interpolation</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🗺️ Ausgabeformat</h3>
      <p>
        Die <code>bumpy_roads</code>-Sammlung enthält folgende Felder:
      </p>

      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>segment_id</strong> - Eindeutige Kennung für jeden
          Straßenabschnitt
        </li>
        <li>
          <strong>geometry</strong> - Geografische Daten (LineString) des
          Straßenabschnitts
        </li>
        <li>
          <strong>raw_roughness_score</strong> - Berechnete Rauheit vor der
          Normalisierung
        </li>
        <li>
          <strong>normalized_score</strong> - Endwert normalisiert auf 0-100
          Skala
        </li>
        <li>
          <strong>road_quality</strong> - Textklassifikation (Sehr glatt, Glatt,
          etc.)
        </li>
        <li>
          <strong>surface_breakdown</strong> - Prozentuale Zusammensetzung jedes
          Oberflächentyps
        </li>
        <li>
          <strong>measurement_count</strong> - Anzahl der für die Berechnung
          verwendeten Datenpunkte
        </li>
        <li>
          <strong>last_updated</strong> - Zeitstempel der letzten
          Datenverarbeitung
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🎯 Anwendungsfälle</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          <strong>Routenplanung</strong> - Radfahrer können holprige Straßen
          vermeiden und glattere Alternativen wählen
        </li>
        <li>
          <strong>Stadtplanung</strong> - Stadtbeamte können Straßen
          identifizieren, die Wartung oder Neupflasterung benötigen
        </li>
        <li>
          <strong>Infrastrukturanalyse</strong> - Vergleich der Straßenqualität
          in verschiedenen Stadtteilen und Bezirken
        </li>
        <li>
          <strong>Historische Verfolgung</strong> - Überwachung der Veränderung
          der Straßenbedingungen nach Wartungsarbeiten
        </li>
        <li>
          <strong>Barrierefreie Planung</strong> - Identifizierung von Routen,
          die für Radfahrer mit unterschiedlichen Komfortniveaus und
          Fahrradtypen geeignet sind
        </li>
      </ul>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
        <p className="text-blue-700">
          💡 <strong>Profi-Tipp:</strong> Kombinieren Sie diesen Datensatz mit
          Verkehrsmustern, um die optimale Balance zwischen glatten Straßen und
          sicheren Fahrradbedingungen zu finden.
        </p>
      </div>
    </div>
  );
}
