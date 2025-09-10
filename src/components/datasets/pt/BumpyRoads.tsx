export function BumpyRoadsPT() {
  return (
    <div className="space-y-4">
      <p className="text-base">
        O conjunto de dados <strong>Bumpy Roads</strong> identifica e categoriza
        trechos de estrada com base na qualidade da superfície, ajudando
        ciclistas a evitar rotas desconfortáveis ou potencialmente perigosas.
        Esses dados são essenciais para planejamento de rotas e melhoria da
        infraestrutura urbana.
      </p>

      <h3 className="text-lg font-semibold mt-6">
        📊 Visão Geral do Conjunto de Dados
      </h3>

      <h4 className="font-medium mt-4">Coleta de Dados</h4>
      <p>
        O sistema analisa diferentes tipos de superfície detectados por sensores
        de bicicleta:
      </p>

      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          🚲 <strong>Tipos de Superfície e Pontuação Base</strong>:
          <ul className="list-circle list-inside space-y-1 ml-6">
            <li>Asfalto (Score: 1) - Superfície mais lisa</li>
            <li>Pavimentação (Score: 2) - Rugosidade moderada</li>
            <li>Compactado (Score: 3) - Maior rugosidade</li>
            <li>Paralelepípedo (Score: 4) - Maior rugosidade</li>
          </ul>
        </li>
      </ul>

      <h4 className="font-medium mt-4">Cálculo da Rugosidade</h4>
      <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
        <code>
          {`Pontuação de Rugosidade = (1 × Asfalto%) + (2 × Pavimentação%) +
(3 × Compactado%) + (4 × Paralelepípedo%)

# Normalizado para escala 0-100
Pontuação Normalizada = (Rugosidade / Max_Rugosidade) × 100`}
        </code>
      </pre>

      <h4 className="font-medium mt-4">Classificação da Estrada</h4>
      <p>
        As estradas são classificadas em cinco categorias com base na pontuação
        de rugosidade normalizada:
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Faixa de Pontuação
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Código de Cor
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Qualidade da Estrada
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">0-20</td>
              <td className="border border-gray-300 px-4 py-2">🟢 Verde</td>
              <td className="border border-gray-300 px-4 py-2">Muito Lisa</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">21-40</td>
              <td className="border border-gray-300 px-4 py-2">
                🟩 Verde Claro
              </td>
              <td className="border border-gray-300 px-4 py-2">Lisa</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">41-60</td>
              <td className="border border-gray-300 px-4 py-2">🟡 Amarela</td>
              <td className="border border-gray-300 px-4 py-2">Moderada</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">61-80</td>
              <td className="border border-gray-300 px-4 py-2">🟧 Laranja</td>
              <td className="border border-gray-300 px-4 py-2">Rugosa</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">81-100</td>
              <td className="border border-gray-300 px-4 py-2">🔴 Vermelha</td>
              <td className="border border-gray-300 px-4 py-2">Muito Rugosa</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold mt-6">🔍 Processamento de Dados</h3>

      <h4 className="font-medium mt-4">Limpeza de Dados</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>Remove entradas com dados de tipo de superfície ausentes</li>
        <li>Filtra medições irrelevantes (temperatura, umidade, etc.)</li>
        <li>
          Garante informações completas de tipo de superfície para pontuação
          precisa
        </li>
      </ul>

      <h4 className="font-medium mt-4">Processo de Mapeamento</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>Mapeia medições pontuais para segmentos de estrada específicos</li>
        <li>
          Agrega múltiplas medições por segmento de estrada para confiabilidade
        </li>
        <li>Calcula pontuação média de rugosidade para cada segmento</li>
        <li>Trata casos extremos e dados ausentes através de interpolação</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🗺️ Formato de Saída</h3>
      <p>
        A coleção <code>bumpy_roads</code> contém os seguintes campos:
      </p>

      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>segment_id</strong> - Identificador único para cada segmento
          de estrada
        </li>
        <li>
          <strong>geometry</strong> - Dados geográficos (LineString) do segmento
          de estrada
        </li>
        <li>
          <strong>raw_roughness_score</strong> - Rugosidade calculada antes da
          normalização
        </li>
        <li>
          <strong>normalized_score</strong> - Pontuação final normalizada para
          escala 0-100
        </li>
        <li>
          <strong>road_quality</strong> - Classificação textual (Muito Lisa,
          Lisa, etc.)
        </li>
        <li>
          <strong>surface_breakdown</strong> - Composição percentual de cada
          tipo de superfície
        </li>
        <li>
          <strong>measurement_count</strong> - Número de pontos de dados usados
          para cálculo
        </li>
        <li>
          <strong>last_updated</strong> - Timestamp do processamento de dados
          mais recente
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🎯 Casos de Uso</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          <strong>Planejamento de Rotas</strong> - Ciclistas podem evitar
          estradas rugosas e escolher alternativas mais suaves
        </li>
        <li>
          <strong>Planejamento Urbano</strong> - Autoridades municipais podem
          identificar estradas que necessitam de manutenção ou repavimentação
        </li>
        <li>
          <strong>Análise de Infraestrutura</strong> - Comparar qualidade das
          estradas em diferentes bairros e distritos
        </li>
        <li>
          <strong>Acompanhamento Histórico</strong> - Monitorar como as
          condições das estradas mudam ao longo do tempo após trabalhos de
          manutenção
        </li>
        <li>
          <strong>Planejamento de Acessibilidade</strong> - Identificar rotas
          adequadas para ciclistas com diferentes níveis de conforto e tipos de
          bicicleta
        </li>
      </ul>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
        <p className="text-blue-700">
          💡 <strong>Dica Profissional:</strong> Combine este conjunto de dados
          com padrões de tráfego para encontrar o equilíbrio ideal entre
          estradas suaves e condições seguras para ciclismo.
        </p>
      </div>
    </div>
  );
}
