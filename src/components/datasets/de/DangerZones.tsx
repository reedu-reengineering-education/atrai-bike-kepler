export function DangerZonesDE() {
  return (
    <div className="space-y-4">
      <p className="text-base">
        Der <strong>Gefahrenzonen</strong>-Datensatz bietet eine umfassende
        Risikobewertung für Radfahrer, indem sowohl das Verkehrsverhalten als
        auch die Umweltbedingungen analysiert werden. Die Daten werden als
        Heatmaps visualisiert, um risikoreiche Bereiche zu identifizieren.
      </p>

      <h3 className="text-lg font-semibold mt-6">📊 Datensatz Übersicht</h3>

      <h4 className="font-medium mt-4">Datensammlungen</h4>
      <p>
        Das System erzeugt <strong>zwei separate Sammlungen</strong>:
      </p>
      <ol className="list-decimal list-inside space-y-1 ml-4">
        <li>
          <code>danger_zones</code>: Fokus auf Verkehrssicherheit
          (Überholverhalten)
        </li>
        <li>
          <code>danger_zones_PM</code>: Kombination aus Verkehrssicherheit und
          Luftqualität
        </li>
      </ol>

      <h4 className="font-medium mt-4">Wichtige Indikatoren</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          🚗 <strong>Verkehrssicherheit</strong>: Überholabstände und Manöver
        </li>
        <li>
          💨 <strong>Luftqualität</strong>: Messungen verschiedener Partikel
        </li>
        <li>
          📍 <strong>Standortdaten</strong>: Präzise GPS-Koordinaten für Karten
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🛠️ Datenerhebung</h3>
      <p>Sensor-ausgerüstete Fahrräder sammeln folgende Daten:</p>

      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          📏 <strong>Überhol-Daten</strong>
          <ul className="list-circle list-inside space-y-1 ml-6">
            <li>Abstand zwischen Radfahrer und Fahrzeug (cm)</li>
            <li>Häufigkeit und Zeitpunkt von Überholmanövern</li>
            <li>Vertrauensscore für jedes Überholereignis</li>
          </ul>
        </li>
        <li>
          🌡️ <strong>Umweltdaten</strong>
          <ul className="list-circle list-inside space-y-1 ml-6">
            <li>Feinstaub: PM1, PM2.5, PM4, PM10 (μg/m³)</li>
            <li>Relative Luftfeuchtigkeit (%) - zur Qualitätskontrolle</li>
            <li>Temperatur und weitere Umgebungsbedingungen</li>
          </ul>
        </li>
        <li>
          📍 <strong>Standort & Metadaten</strong>
          <ul className="list-circle list-inside space-y-1 ml-6">
            <li>Hochpräzise GPS-Koordinaten (Latitude/Longitude)</li>
            <li>Geräte-ID (boxId) zur Datenquellenverfolgung</li>
            <li>Zeitstempel für zeitliche Analyse</li>
            <li>Geometrische Koordinaten für räumliche Abbildungen</li>
          </ul>
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">
        🔍 Datenqualitätskontrollen
      </h3>

      <h4 className="font-medium mt-4">Filterkriterien</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>Mindestdatensätze</strong>: ≥ 10 Aufzeichnungen pro Gerät
          (boxId) für statistische Signifikanz
        </li>
        <li>
          <strong>Luftfeuchtigkeitsfilter</strong>: Schließt
          Luftqualitätsmessungen mit Luftfeuchtigkeit über 75% aus
        </li>
        <li>
          <strong>Ausreißerentfernung</strong>: Automatische Ausreißererkennung
          pro Gerät mit statistischen Methoden
        </li>
        <li>
          <strong>Distanznormalisierung</strong>: Alle Überholabstände auf
          maximal 400m begrenzt
        </li>
        <li>
          <strong>Vertrauensschwelle</strong>: Überholereignisse mit
          Vertrauensscore über 5% gefiltert
        </li>
      </ul>

      <h4 className="font-medium mt-4">Datenverarbeitungsschritte</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>Ausreißer in PM-Messungen durch NaN-Werte ersetzt</li>
        <li>
          PM-Messungen gegen ihre Maximalwerte im Datensatz normalisiert (0-1
          Skala)
        </li>
        <li>
          Überholabstand normalisiert: geringere Abstände = höheres Risiko (0-1
          Skala)
        </li>
        <li>Geodaten in Standard-Koordinatensysteme konvertiert</li>
        <li>Zeitstempel-Synchronisation über alle Datenquellen</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">
        📈 Risikoindex-Berechnungen
      </h3>

      <h4 className="font-medium mt-4">
        1️⃣ Überhol-Risikoindex (danger_zones)
      </h4>
      <p>
        Fokussiert auf Verkehrssicherheitsaspekte von Fahrzeuginteraktionen.
      </p>

      <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
        <code>
          {`# Distanz normalisieren (0-1 Skala, näher = gefährlicher)
Normalisierte Distanz = 1 - (Überholabstand / 400)
Normalisierte Distanz = clip(Normalisierte Distanz, 0, 1)

# Risiko berechnen (nur bei Überholvertrauen > 5%)
Risikoindex = (0.3 × Überholmanöver) +
             (0.7 × Normalisierte Distanz)`}
        </code>
      </pre>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <p className="text-blue-700">
          🚗 <strong>Verkehrsfokus:</strong> Dieser Index hilft, gefährliche
          Verkehrskorridore zu identifizieren, wo Fahrzeuge zu nah an Radfahrern
          vorbeifahren.
        </p>
      </div>

      <h4 className="font-medium mt-6">
        2️⃣ Umfassender PM-Risikoindex (danger_zones_PM)
      </h4>
      <p>
        Kombiniert Verkehrssicherheit mit Umwelt-Luftqualitätsmessungen für
        ganzheitliche Risikobewertung.
      </p>

      <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
        <code>
          {`# Alle PM-Werte normalisieren (0-1 Skala)
Normalisierter PM = PM-Wert / max(PM-Wert im Datensatz)

# Umfassende Risikoberechnung mit gewichteten Faktoren
Risikoindex = (0.15 × Überholmanöver) +      # Verkehrssicherheit
             (0.35 × Normalisierte Distanz) + # Näherungsrisiko
             (0.20 × Normalisierter PM1) +    # Ultrafeine Partikel
             (0.15 × Normalisierter PM2.5) +  # Respirable Partikel
             (0.10 × Normalisierter PM4) +    # Grobe Partikel
             (0.05 × Normalisierter PM10)     # Einatembare Partikel`}
        </code>
      </pre>

      <div className="bg-green-50 border-l-4 border-green-500 p-4">
        <p className="text-green-700">
          🌿 <strong>Umweltgesundheit:</strong> Dieser Index identifiziert
          Bereiche, wo schlechte Luftqualität Verkehrsgefahren verstärkt und
          besonders gefährliche Bedingungen für Radfahrer schafft.
        </p>
      </div>

      <h3 className="text-lg font-semibold mt-6">🗺️ Ausgabeformat</h3>
      <p>
        Jede Sammlung enthält georäumliche Punktdaten mit folgenden Feldern:
      </p>

      <h4 className="font-medium mt-4">Gemeinsame Felder (beide Sammlungen)</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>id</strong> - Eindeutige Kennung für jeden Datenpunkt
        </li>
        <li>
          <strong>lat</strong> - Breitengrad-Koordinate
        </li>
        <li>
          <strong>lng</strong> - Längengrad-Koordinate
        </li>
        <li>
          <strong>geometry</strong> - Geografische Punktdaten für räumliche
          Analyse
        </li>
        <li>
          <strong>createdAt</strong> - Zeitstempel der ursprünglichen Messung
        </li>
        <li>
          <strong>boxId</strong> - Quellgeräte-Kennung
        </li>
      </ul>

      <h4 className="font-medium mt-4">danger_zones Spezifische Felder</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>Risk Index Overtaking</strong> - Berechneter
          Verkehrsrisiko-Score (0-1)
        </li>
        <li>
          <strong>Overtaking Manoeuvre</strong> - Ursprünglicher
          Manövererkennungs-Score
        </li>
        <li>
          <strong>Overtaking Distance</strong> - Ursprüngliche Abstandsmessung
          (cm)
        </li>
        <li>
          <strong>Normalized Distance</strong> - Normalisierter Abstands-Score
          (0-1)
        </li>
      </ul>

      <h4 className="font-medium mt-4">danger_zones_PM Spezifische Felder</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>Risk Index</strong> - Umfassender Risiko-Score (0-1)
        </li>
        <li>
          <strong>Finedust PM1</strong> - Ursprüngliche PM1-Messung (μg/m³)
        </li>
        <li>
          <strong>Finedust PM2.5</strong> - Ursprüngliche PM2.5-Messung (μg/m³)
        </li>
        <li>
          <strong>Finedust PM4</strong> - Ursprüngliche PM4-Messung (μg/m³)
        </li>
        <li>
          <strong>Finedust PM10</strong> - Ursprüngliche PM10-Messung (μg/m³)
        </li>
        <li>
          <strong>Normalized PM1/PM2.5/PM4/PM10</strong> - Normalisierte Werte
          (0-1)
        </li>
        <li>
          <strong>Rel. Humidity</strong> - Luftfeuchtigkeitsmessung für
          Filterung
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🎯 Praktische Anwendungen</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          <strong>Sichere Routenplanung</strong> - Hochrisikobereiche bei der
          Fahrradroutenwahl vermeiden
        </li>
        <li>
          <strong>Städtische Infrastrukturplanung</strong> - Orte
          identifizieren, die geschützte Fahrradwege oder Verkehrsberuhigung
          benötigen
        </li>
        <li>
          <strong>Umweltgesundheitsmonitoring</strong> - Luftqualitäts-Hotspots
          und deren Auswirkung auf Fahrradsicherheit verfolgen
        </li>
        <li>
          <strong>Politikentwicklung</strong> - Datengestützte Entscheidungen
          für Fahrradinfrastruktur-Investitionen
        </li>
        <li>
          <strong>Echtzeit-Sicherheitswarnungen</strong> - Radfahrer beim
          Betreten von Hochrisikozonen warnen
        </li>
        <li>
          <strong>Akademische Forschung</strong> - Korrelationen zwischen
          Verkehrsmustern, Luftqualität und Fahrradsicherheit studieren
        </li>
      </ul>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-6">
        <p className="text-amber-700">
          ⚠️ <strong>Hinweis:</strong> Risikoindizes sind relative Werte
          innerhalb des Datensatzes. Ein Score von 0,8 zeigt höheres Risiko
          relativ zu anderen gemessenen Standorten, kein absolutes
          Gefahrenniveau. Immer Vorsicht walten lassen und lokale Verkehrsregeln
          befolgen.
        </p>
      </div>
    </div>
  );
}
