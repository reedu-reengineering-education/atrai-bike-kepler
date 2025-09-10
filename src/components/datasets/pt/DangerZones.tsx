export function DangerZonesPT() {
  return (
    <div className="space-y-4">
      <p className="text-base">
        O conjunto de dados <strong>Danger Zones</strong> fornece uma avaliação
        abrangente de riscos para ciclistas, analisando o comportamento do
        tráfego e as condições ambientais. Os dados são visualizados em mapas de
        calor para identificar áreas de alto risco.
      </p>

      <h3 className="text-lg font-semibold mt-6">
        📊 Visão Geral do Conjunto de Dados
      </h3>

      <h4 className="font-medium mt-4">Coleções de Dados</h4>
      <p>
        O sistema gera <strong>duas coleções separadas</strong>:
      </p>
      <ol className="list-decimal list-inside space-y-1 ml-4">
        <li>
          <code>danger_zones</code>: Focado na segurança do tráfego
          (comportamento de ultrapassagem)
        </li>
        <li>
          <code>danger_zones_PM</code>: Avaliação combinada de segurança do
          tráfego e qualidade do ar
        </li>
      </ol>

      <h4 className="font-medium mt-4">Indicadores Principais</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          🚗 <strong>Segurança no Trânsito</strong>: Distâncias e manobras de
          ultrapassagem
        </li>
        <li>
          💨 <strong>Qualidade do Ar</strong>: Medições de partículas
        </li>
        <li>
          📍 <strong>Dados de Localização</strong>: Coordenadas GPS precisas
          para mapeamento
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🛠️ Coleta de Dados</h3>
      <p>Bicicletas equipadas com sensores coletam os seguintes dados:</p>

      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          📏 <strong>Dados de Ultrapassagem</strong>
          <ul className="list-circle list-inside space-y-1 ml-6">
            <li>Distância entre ciclista e veículo (cm)</li>
            <li>Frequência e horário das manobras de ultrapassagem</li>
            <li>Pontuação de confiança para cada evento de ultrapassagem</li>
          </ul>
        </li>
        <li>
          🌡️ <strong>Dados Ambientais</strong>
          <ul className="list-circle list-inside space-y-1 ml-6">
            <li>Partículas finas: PM1, PM2.5, PM4, PM10 (μg/m³)</li>
            <li>Umidade relativa (%) - usada para controle de qualidade</li>
            <li>Temperatura e outras condições ambientais</li>
          </ul>
        </li>
        <li>
          📍 <strong>Localização & Metadados</strong>
          <ul className="list-circle list-inside space-y-1 ml-6">
            <li>Coordenadas GPS de alta precisão (Latitude/Longitude)</li>
            <li>ID do dispositivo (boxId) para rastrear a fonte dos dados</li>
            <li>Carimbo de data/hora para análise temporal</li>
            <li>Coordenadas geométricas para mapeamento espacial</li>
          </ul>
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">
        🔍 Controles de Qualidade de Dados
      </h3>

      <h4 className="font-medium mt-4">Critérios de Filtragem</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>Mínimo de Pontos de Dados</strong>: ≥ 10 registros por
          dispositivo (boxId) para garantir significância estatística
        </li>
        <li>
          <strong>Filtro de Umidade</strong>: Exclui leituras de qualidade do ar
          com umidade superior a 75% para precisão
        </li>
        <li>
          <strong>Remoção de Outliers</strong>: Detecção automatizada de
          outliers por dispositivo usando métodos estatísticos
        </li>
        <li>
          <strong>Normalização de Distância</strong>: Todas as distâncias de
          ultrapassagem limitadas a no máximo 400m para consistência
        </li>
        <li>
          <strong>Limiar de Confiança</strong>: Eventos de ultrapassagem
          filtrados para pontuação de confiança maior que 5%
        </li>
      </ul>

      <h4 className="font-medium mt-4">Etapas de Processamento de Dados</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          Outliers nas medições de PM substituídos por valores NaN para evitar
          distorções
        </li>
        <li>
          Medições de PM normalizadas em relação aos seus valores máximos no
          conjunto de dados (escala 0-1)
        </li>
        <li>
          Distância de ultrapassagem normalizada: distâncias menores = maior
          risco (escala 0-1)
        </li>
        <li>
          Dados geográficos convertidos para sistemas de coordenadas padrão
        </li>
        <li>
          Sincronização de carimbo de data/hora em todas as fontes de dados
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">
        📈 Cálculos do Índice de Risco
      </h3>

      <h4 className="font-medium mt-4">
        1️⃣ Índice de Risco de Ultrapassagem (danger_zones)
      </h4>
      <p>
        Focado apenas nos aspectos de segurança do tráfego provenientes de
        interações com veículos.
      </p>

      <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
        <code>
          {`# Normalizar distância (escala 0-1, mais perto = mais perigoso)
Distância Normalizada = 1 - (Distância de Ultrapassagem / 400)
Distância Normalizada = clip(Distância Normalizada, 0, 1)

# Calcular risco (apenas para confiança de ultrapassagem > 5%)
Índice de Risco = (0.3 × Manobra de Ultrapassagem) +
                 (0.7 × Distância Normalizada)`}
        </code>
      </pre>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <p className="text-blue-700">
          🚗 <strong>Foco no Tráfego:</strong> Este índice ajuda a identificar
          corredores de tráfego perigosos onde os veículos frequentemente passam
          muito perto dos ciclistas.
        </p>
      </div>

      <h4 className="font-medium mt-6">
        2️⃣ Índice de Risco PM Abrangente (danger_zones_PM)
      </h4>
      <p>
        Combina segurança no trânsito com medições de qualidade do ar ambiental
        para uma avaliação de risco holística.
      </p>

      <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
        <code>
          {`# Normalizar todos os valores de PM (escala 0-1)
PM Normalizado = Valor PM / max(Valor PM no conjunto de dados)

# Cálculo abrangente de risco com fatores ponderados
Índice de Risco = (0.15 × Manobra de Ultrapassagem) +  # Segurança no trânsito
                 (0.35 × Distância Normalizada) +      # Risco de proximidade
                 (0.20 × PM1 Normalizado) +           # Partículas ultrafinas
                 (0.15 × PM2.5 Normalizado) +         # Partículas respiráveis
                 (0.10 × PM4 Normalizado) +           # Partículas grossas
                 (0.05 × PM10 Normalizado)            # Partículas inaláveis`}
        </code>
      </pre>

      <div className="bg-green-50 border-l-4 border-green-500 p-4">
        <p className="text-green-700">
          🌿 <strong>Saúde Ambiental:</strong> Este índice identifica áreas onde
          a má qualidade do ar agrava os perigos do trânsito, criando condições
          particularmente perigosas para ciclistas.
        </p>
      </div>

      <h3 className="text-lg font-semibold mt-6">🗺️ Formato de Saída</h3>
      <p>
        Cada coleção contém dados pontuais geoespaciais com os seguintes campos:
      </p>

      <h4 className="font-medium mt-4">Campos Comuns (ambas as coleções)</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>id</strong> - Identificador único para cada ponto de dados
        </li>
        <li>
          <strong>lat</strong> - Coordenada de latitude
        </li>
        <li>
          <strong>lng</strong> - Coordenada de longitude
        </li>
        <li>
          <strong>geometry</strong> - Dados pontuais geográficos para análise
          espacial
        </li>
        <li>
          <strong>createdAt</strong> - Carimbo de data/hora da medição original
        </li>
        <li>
          <strong>boxId</strong> - Identificador do dispositivo de origem
        </li>
      </ul>

      <h4 className="font-medium mt-4">Campos Específicos do danger_zones</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>Risk Index Overtaking</strong> - Pontuação de risco de tráfego
          calculada (0-1)
        </li>
        <li>
          <strong>Overtaking Manoeuvre</strong> - Pontuação original de detecção
          de manobra
        </li>
        <li>
          <strong>Overtaking Distance</strong> - Medição original de distância
          (cm)
        </li>
        <li>
          <strong>Normalized Distance</strong> - Pontuação de distância
          normalizada (0-1)
        </li>
      </ul>

      <h4 className="font-medium mt-4">
        Campos Específicos do danger_zones_PM
      </h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>Risk Index</strong> - Pontuação de risco abrangente (0-1)
        </li>
        <li>
          <strong>Finedust PM1</strong> - Medição original de PM1 (μg/m³)
        </li>
        <li>
          <strong>Finedust PM2.5</strong> - Medição original de PM2.5 (μg/m³)
        </li>
        <li>
          <strong>Finedust PM4</strong> - Medição original de PM4 (μg/m³)
        </li>
        <li>
          <strong>Finedust PM10</strong> - Medição original de PM10 (μg/m³)
        </li>
        <li>
          <strong>Normalized PM1/PM2.5/PM4/PM10</strong> - Valores normalizados
          (0-1)
        </li>
        <li>
          <strong>Rel. Humidity</strong> - Leitura de umidade usada para
          filtragem
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🎯 Aplicações Práticas</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          <strong>Planejamento de Rotas Seguras</strong> - Evitar áreas de alto
          risco ao escolher rotas de ciclismo
        </li>
        <li>
          <strong>Planejamento de Infraestrutura Urbana</strong> - Identificar
          locais que necessitam de ciclovias protegidas ou medidas de
          acalmamento de tráfego
        </li>
        <li>
          <strong>Monitoramento de Saúde Ambiental</strong> - Acompanhar pontos
          críticos de qualidade do ar e seu impacto na segurança do ciclismo
        </li>
        <li>
          <strong>Desenvolvimento de Políticas</strong> - Decisões baseadas em
          dados para investimentos em infraestrutura ciclística
        </li>
        <li>
          <strong>Alertas de Segurança em Tempo Real</strong> - Alertar
          ciclistas ao entrar em zonas de alto risco
        </li>
        <li>
          <strong>Pesquisa Acadêmica</strong> - Estudar correlações entre
          padrões de tráfego, qualidade do ar e segurança do ciclismo
        </li>
      </ul>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-6">
        <p className="text-amber-700">
          ⚠️ <strong>Nota:</strong> Os índices de risco são pontuações relativas
          dentro do conjunto de dados. Uma pontuação de 0,8 indica maior risco
          em relação a outros locais medidos, não um nível de perigo absoluto.
          Sempre exercite cautela e siga os regulamentos de trânsito locais.
        </p>
      </div>
    </div>
  );
}
