export function OvertakingDistanceDE() {
  return (
    <div className="space-y-4">
      <p className="text-base">
        Der <strong>Überholabstände</strong>-Datensatz analysiert und kartiert
        Überholmanöver zwischen Fahrzeugen und Radfahrern auf dem Straßennetz.
        Dieser Datensatz liefert Einblicke, wo und wie eng Fahrzeuge an
        Radfahrern vorbeifahren, und hilft dabei, gefährliche Straßenabschnitte
        zu identifizieren.
      </p>

      <h3 className="text-lg font-semibold mt-6">📊 Datensatz-Übersicht</h3>

      <h4 className="font-medium mt-4">Hauptzweck</h4>
      <p>
        Dieser Prozess transformiert einzelne Datenpunkte von Überholereignissen
        in aggregierte Straßenabschnittsinformationen und erstellt eine
        Flusskarte der Fahrzeug-Radfahrer-Interaktionen im gesamten
        Verkehrsnetz.
      </p>

      <h4 className="font-medium mt-4">Wichtige Kennzahlen</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          📏 <strong>Überholabstand</strong>: Tatsächlicher Abstand zwischen
          Fahrzeugen und Radfahrern (Zentimeter)
        </li>
        <li>
          🚗 <strong>Überholmanöver</strong>: Konfidenzscore von erkannten
          Überholereignissen
        </li>
        <li>
          📊 <strong>Normalisierter Überholabstand</strong>: Skalierte
          Abstandsmetrik (0-1-Skala)
        </li>
        <li>
          🛣️ <strong>Straßenabschnitts-Aggregationen</strong>: Statistische
          Zusammenfassungen pro Straßenabschnitt
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">
        🛠️ Datenverarbeitungspipeline
      </h3>

      <h4 className="font-medium mt-4">Datenladung & Vorbereitung</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>Lädt Fahrrad-Sensordaten aus Datenbankquellen</li>
        <li>Ruft Straßennetzdaten für die räumliche Zuordnung ab</li>
        <li>
          Stellt konsistente Koordinatenreferenzsysteme sicher (CRS EPSG:4326)
        </li>
        <li>
          Behandelt die CRS-Ausrichtung zwischen Fahrraddaten und Straßennetzen
        </li>
      </ul>

      <h4 className="font-medium mt-4">Datenfilterung & Bereinigung</h4>
      <p>Das System wendet strenge Qualitätskontrollen an:</p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>Entfernt Einträge mit fehlenden Überholabstandsdaten</li>
        <li>Filtert Überholmanöver mit Konfidenzscores &gt; 5%</li>
        <li>Schließt physikalisch unmögliche Abstände aus (Werte ≤ 0)</li>
        <li>Konvertiert Zeitstempel in standardisiertes Datums-/Zeitformat</li>
      </ul>

      <h4 className="font-medium mt-4">Normalisierungsprozess</h4>
      <p>Überholabstände werden für eine konsistente Analyse normalisiert:</p>
      <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
        <code>
          {`# Normalisiere Abstand auf 0-1-Skala (näher = höherer Wert)
Normalized Distance = Overtaking Distance / 200

# Begrenze Werte auf Maximum von 1.0
Normalized Distance = min(Normalized Distance, 1.0)`}
        </code>
      </pre>
      <p className="text-sm text-muted-foreground">
        Hinweis: Abstände über 200 cm werden auf 1.0 gedeckelt, wodurch nähere
        Überholvorgänge (gefährlicher) höhere normalisierte Werte erhalten.
      </p>

      <h3 className="text-lg font-semibold mt-6">🗺️ Räumliche Zuordnung</h3>

      <h4 className="font-medium mt-4">Punkt-zu-Straßennetz-Zuordnung</h4>
      <p>
        Einzelne Überholereignisse werden unter Verwendung fortschrittlicher
        räumlicher Analyse den entsprechenden Straßenabschnitten zugeordnet:
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>Verwendet geometrische Näherungsalgorithmen</li>
        <li>Ordnet GPS-Punkte dem nächstgelegenen Straßenabschnitt zu</li>
        <li>Bewältigt komplexe Straßennetzgeometrien</li>
        <li>Handhabt Koordinatensystemtransformationen</li>
      </ul>

      <h4 className="font-medium mt-4">Aggregationsprozess</h4>
      <p>Daten werden auf der Ebene der Straßenabschnitte aggregiert mit:</p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          Statistischen Zusammenfassungen (Anzahl, Mittelwert, Median etc.)
        </li>
        <li>Räumlicher Aggregation nach Straßenabschnittsgeometrie</li>
        <li>Bewahrung der ursprünglichen Messverteilungen</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">💾 Ausgabedatenstruktur</h3>

      <h4 className="font-medium mt-4">Sammlung: overtaking_distance</h4>
      <p>Die verarbeiteten Daten enthalten diese Schlüsselfelder:</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2 text-left">
                Feldname
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left">
                Beschreibung
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left">
                Datentyp
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-mono">
                segment_id
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Eindeutiger Straßenabschnitts-Identifikator
              </td>
              <td className="border border-gray-300 px-3 py-2">String</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 font-mono">
                geometry
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Straßenabschnittsgeometrie (LineString)
              </td>
              <td className="border border-gray-300 px-3 py-2">Geometrie</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-mono">
                overtaking_count
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Anzahl der Überholereignisse
              </td>
              <td className="border border-gray-300 px-3 py-2">Integer</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 font-mono">
                avg_distance
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Durchschnittlicher Überholabstand (cm)
              </td>
              <td className="border border-gray-300 px-3 py-2">Float</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-mono">
                avg_manoeuvre
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Durchschnittlicher Konfidenzscore
              </td>
              <td className="border border-gray-300 px-3 py-2">Float</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 font-mono">
                avg_normalized
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Durchschnittlicher normalisierter Abstand
              </td>
              <td className="border border-gray-300 px-3 py-2">Float</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-mono">
                min_distance
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Minimal beobachteter Abstand
              </td>
              <td className="border border-gray-300 px-3 py-2">Float</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 font-mono">
                max_distance
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Maximal beobachteter Abstand
              </td>
              <td className="border border-gray-300 px-3 py-2">Float</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold mt-6">
        🎯 Anwendungsfälle & Anwendungen
      </h3>

      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          <strong>Infrastrukturplanung</strong>: Identifizierung von
          Straßenabschnitten, die geschützte Radwege oder verkehrsberuhigende
          Maßnahmen benötigen
        </li>
        <li>
          <strong>Sicherheitsanalyse</strong>: Gefährliche Korridore mit
          häufigen engpassierenden Ereignissen lokalisieren
        </li>
        <li>
          <strong>Verkehrstechnik</strong>: Straßenplanungsentscheidungen auf
          Basis tatsächlicher Fahrzeug-Radfahrer-Interaktionen informieren
        </li>
        <li>
          <strong>Politikentwicklung</strong>: Unterstützung datengestützter
          Entscheidungen für Radverkehrssicherheitsinitiativen
        </li>
        <li>
          <strong>Forschungsstudien</strong>: Ermöglichung akademischer
          Forschung zu Radverkehrssicherheit und Verkehrsmustern
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">
        ⚙️ Technische Implementierung
      </h3>

      <h4 className="font-medium mt-4">Verarbeitungsframework</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>Basiert auf dem pygeoapi-Verarbeitungsframework</li>
        <li>Unterstützt sowohl synchrone als auch asynchrone Ausführung</li>
        <li>Verwendet PostgreSQL/PostGIS zur Speicherung räumlicher Daten</li>
        <li>
          Implementiert ordnungsgemäßes Verbindungsmanagement und Bereinigung
        </li>
      </ul>

      <h4 className="font-medium mt-4">Eingabeanforderungen</h4>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <p className="text-blue-700 text-sm">
          🔑 <strong>Authentifizierung erforderlich</strong>: Gültiges Token für
          die Prozessausführung benötigt
          <br />
          📋 <strong>Optionale Filterung</strong>: Spezifisches Gerät (boxId)
          kann für gezielte Analyse angegeben werden
        </p>
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-4">
        <p className="text-green-700">
          💡 <strong>Profi-Tipp</strong>: Kombinieren Sie diesen Datensatz mit
          Verkehrsaufkommensdaten, um Überholereignisraten pro Fahrzeug zu
          berechnen, was noch aufschlussreichere Sicherheitsmetriken liefert.
        </p>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
        <p className="text-amber-700 text-sm">
          ⚠️ <strong>Hinweis</strong>: Die Analyse konzentriert sich auf
          Ereignisse, bei denen Überholvorgänge mit angemessener Konfidenz
          (&gt;5%) erkannt wurden. Sehr seltene oder mehrdeutige Ereignisse
          werden ausgeschlossen, um die Datenqualität zu erhalten.
        </p>
      </div>
    </div>
  );
}
