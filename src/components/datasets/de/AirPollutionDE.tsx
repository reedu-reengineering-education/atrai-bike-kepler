export function AirPollutionDE() {
  return (
    <div className="space-y-4">
      <p className="text-base">
        Der <strong>PMAnalysis </strong> Prozessor bewertet die
        Feinstaubkonzentrationen (PM), die von Fahrradsensoren gesammelt werden.
        Er erstellt Visualisierungen und Heatmaps, um räumliche, zeitliche und
        saisonale Variationen der PM-Werte zu analysieren.
      </p>

      <h3 className="text-lg font-semibold mt-6">📊 Metadaten</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>ID:</strong> pm_analysis
        </li>
        <li>
          <strong>Version:</strong> 0.2.0
        </li>
        <li>
          <strong>Beschreibung:</strong> Prozesse zur Bewertung von
          PM-Konzentrationen
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
          <strong>id (boxId):</strong> Geräte-ID, um die Daten abzurufen.
        </li>
        <li>
          <strong>token:</strong> Geheimer Token zur Authentifizierung.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📤 Ausgaben</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>id:</strong> ID der Prozessaussführung
        </li>
        <li>
          <strong>status:</strong> Beschreibung des Prozesses und der erzeugten
          Dateien
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📈 Arbeitsablauf</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>
          Laden der Fahrradsensordaten und Berechnung von Breiten- und
          Längengrad aus der Geometrie
        </li>
        <li>Filterung von Geräten mit mindestens 10 Messungen</li>
        <li>
          Entfernung von Ausreißern und Messungen mit hoher Luftfeuchtigkeit
          (&gt; 75%)
        </li>
        <li>Erstellung von Boxplots für PM1, PM2.5, PM4 und PM10</li>
        <li>
          Berechnung und Visualisierung des täglichen und monatlichen
          Mittelwerts von PM2.5
        </li>
        <li>
          Erstellung von Heatmaps für PM2.5, einschließlich saisonaler und
          zeitbasierter Filterung
        </li>
        <li>Speichern aller Visualisierungen als PNG- und HTML-Dateien</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📂 Erzeugte Dateien</h3>
      <ul className="list-disc list-inside ml-4">
        <li>pm_boxplots.png — Boxplots der PM-Konzentrationen</li>
        <li>pm_diurnal_cycle.png — Diurnal Cycle Plot von PM2.5</li>
        <li>pm_monthly_avg.png — Monatlicher Mittelwert von PM2.5</li>
        <li>PM_25_heatmap.html — Heatmap der PM2.5-Konzentrationen</li>
        <li>PM_25_timeframe_heatmap.html — Saisonale/zeitliche Heatmap</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🎯 Anwendungsfälle</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Überwachung der Luftqualität in städtischen Gebieten</li>
        <li>Analyse zeitlicher Trends von PM-Verschmutzung</li>
        <li>Identifikation von Hotspots hoher PM-Konzentrationen</li>
        <li>
          Unterstützung von Forschung und Politikentscheidungen im Bereich
          Umweltgesundheit
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">⚠️ Hinweise</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Geräte mit weniger als 10 Messungen werden ausgeschlossen</li>
        <li>Messungen mit Luftfeuchtigkeit &gt; 75% werden gefiltert</li>
        <li>Ein Authentifizierungstoken ist erforderlich</li>
      </ul>
    </div>
  );
}
