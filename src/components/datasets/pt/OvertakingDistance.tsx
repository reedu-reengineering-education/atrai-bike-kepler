export function OvertakingDistancePT() {
  return (
    <div className="space-y-4">
      <p className="text-base">
        O conjunto de dados <strong>Distância de Ultrapassagem</strong> analisa
        e mapeia manobras de ultrapassagem entre veículos e ciclistas na rede
        viária. Este conjunto de dados fornece insights sobre onde e quão
        próximos os veículos passam dos ciclistas, ajudando a identificar
        segmentos rodoviários perigosos.
      </p>

      <h3 className="text-lg font-semibold mt-6">
        📊 Visão Geral do Conjunto de Dados
      </h3>

      <h4 className="font-medium mt-4">Objetivo Principal</h4>
      <p>
        Este processo transforma pontos de dados individuais de eventos de
        ultrapassagem em informações agregadas de segmentos rodoviários, criando
        um mapa de fluxo de interações veículo-ciclista em toda a rede de
        transporte.
      </p>

      <h4 className="font-medium mt-4">Métricas Principais</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          📏 <strong>Distância de Ultrapassagem</strong>: Distância real entre
          veículos e ciclistas (centímetros)
        </li>
        <li>
          🚗 <strong>Manobra de Ultrapassagem</strong>: Pontuação de confiança
          de eventos de deteção de ultrapassagem
        </li>
        <li>
          📊 <strong>Distância de Ultrapassagem Normalizada</strong>: Métrica de
          distância dimensionada (escala 0-1)
        </li>
        <li>
          🛣️ <strong>Agregações de Segmentos Rodoviários</strong>: Resumos
          estatísticos por segmento rodoviário
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">
        🛠️ Pipeline de Processamento de Dados
      </h3>

      <h4 className="font-medium mt-4">Carregamento e Preparação de Dados</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          Carrega dados de sensores de bicicleta de fontes de base de dados
        </li>
        <li>Obtém dados da rede rodoviária para mapeamento espacial</li>
        <li>
          Garante sistemas de referência de coordenadas consistentes (CRS
          EPSG:4326)
        </li>
        <li>
          Lida com o alinhamento de CRS entre dados de bicicleta e redes
          rodoviárias
        </li>
      </ul>

      <h4 className="font-medium mt-4">Filtragem e Limpeza de Dados</h4>
      <p>O sistema aplica controlos de qualidade rigorosos:</p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          Remove entradas com dados de distância de ultrapassagem em falta
        </li>
        <li>
          Filtra manobras de ultrapassagem com pontuações de confiança &gt; 5%
        </li>
        <li>Exclui distâncias fisicamente impossíveis (valores ≤ 0)</li>
        <li>Converte timestamps para formato de data e hora padronizado</li>
      </ul>

      <h4 className="font-medium mt-4">Processo de Normalização</h4>
      <p>
        As distâncias de ultrapassagem são normalizadas para análise
        consistente:
      </p>
      <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
        <code>
          {`# Normalizar distância para escala 0-1 (mais próximo = valor mais alto)
Distância Normalizada = Distância de Ultrapassagem / 200

# Limitar valores a máximo de 1.0
Distância Normalizada = min(Distância Normalizada, 1.0)`}
        </code>
      </pre>
      <p className="text-sm text-muted-foreground">
        Nota: Distâncias superiores a 200cm são limitadas a 1.0, fazendo com que
        ultrapassagens mais próximas (mais perigosas) tenham valores
        normalizados mais altos.
      </p>

      <h3 className="text-lg font-semibold mt-6">🗺️ Mapeamento Espacial</h3>

      <h4 className="font-medium mt-4">
        Mapeamento de Ponto para Rede Rodoviária
      </h4>
      <p>
        Eventos individuais de ultrapassagem são mapeados para os segmentos
        rodoviários correspondentes usando análise espacial avançada:
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>Utiliza algoritmos de proximidade geométrica</li>
        <li>Corresponde pontos GPS ao segmento rodoviário mais próximo</li>
        <li>Lida com geometrias complexas de redes rodoviárias</li>
        <li>Gerencia transformações de sistemas de coordenadas</li>
      </ul>

      <h4 className="font-medium mt-4">Processo de Agregação</h4>
      <p>Os dados são agregados ao nível do segmento rodoviário com:</p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>Resumos estatísticos (contagem, média, mediana, etc.)</li>
        <li>Agregação espacial por geometria do segmento rodoviário</li>
        <li>Preservação das distribuições de medição originais</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">
        💾 Estrutura de Dados de Saída
      </h3>

      <h4 className="font-medium mt-4">Coleção: overtaking_distance</h4>
      <p>Os dados processados incluem estes campos principais:</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2 text-left">
                Nome do Campo
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left">
                Descrição
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left">
                Tipo de Dados
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-mono">
                segment_id
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Identificador único do segmento rodoviário
              </td>
              <td className="border border-gray-300 px-3 py-2">String</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 font-mono">
                geometry
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Geometria do segmento rodoviário (LineString)
              </td>
              <td className="border border-gray-300 px-3 py-2">Geometria</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-mono">
                overtaking_count
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Número de eventos de ultrapassagem
              </td>
              <td className="border border-gray-300 px-3 py-2">Inteiro</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 font-mono">
                avg_distance
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Distância média de ultrapassagem (cm)
              </td>
              <td className="border border-gray-300 px-3 py-2">Float</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-mono">
                avg_manoeuvre
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Pontuação de confiança média
              </td>
              <td className="border border-gray-300 px-3 py-2">Float</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 font-mono">
                avg_normalized
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Distância normalizada média
              </td>
              <td className="border border-gray-300 px-3 py-2">Float</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-mono">
                min_distance
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Distância mínima observada
              </td>
              <td className="border border-gray-300 px-3 py-2">Float</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 font-mono">
                max_distance
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Distância máxima observada
              </td>
              <td className="border border-gray-300 px-3 py-2">Float</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold mt-6">
        🎯 Casos de Uso & Aplicações
      </h3>

      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          <strong>Planeamento de Infraestrutura</strong>: Identificar segmentos
          rodoviários que necessitam de ciclovias protegidas ou medidas de
          acalmia de tráfego
        </li>
        <li>
          <strong>Análise de Segurança</strong>: Identificar corredores
          perigosos com eventos frequentes de passagem próxima
        </li>
        <li>
          <strong>Engenharia de Tráfego</strong>: Informar decisões de design
          rodoviário com base em interações reais veículo-ciclista
        </li>
        <li>
          <strong>Desenvolvimento de Políticas</strong>: Apoiar decisões
          baseadas em dados para iniciativas de segurança ciclável
        </li>
        <li>
          <strong>Estudos de Investigação</strong>: Permitir investigação
          académica sobre segurança ciclável e padrões de tráfego
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">⚙️ Implementação Técnica</h3>

      <h4 className="font-medium mt-4">Framework de Processamento</h4>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>Construído sobre o framework de processamento pygeoapi</li>
        <li>Suporta execução síncrona e assíncrona</li>
        <li>
          Utiliza PostgreSQL/PostGIS para armazenamento de dados espaciais
        </li>
        <li>Implementa gestão e limpeza adequadas de conexões</li>
      </ul>

      <h4 className="font-medium mt-4">Requisitos de Entrada</h4>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <p className="text-blue-700 text-sm">
          🔑 <strong>Autenticação Requerida</strong>: Token válido necessário
          para execução do processo
          <br />
          📋 <strong>Filtragem Opcional</strong>: Dispositivo específico (boxId)
          pode ser especificado para análise direcionada
        </p>
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-4">
        <p className="text-green-700">
          💡 <strong>Dica de Especialista</strong>: Combine este conjunto de
          dados com dados de volume de tráfego para calcular taxas de eventos de
          ultrapassagem por veículo, fornecendo métricas de segurança ainda mais
          perspicazes.
        </p>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
        <p className="text-amber-700 text-sm">
          ⚠️ <strong>Nota</strong>: A análise concentra-se em eventos onde a
          ultrapassagem foi detetada com confiança razoável (&gt;5%). Eventos
          muito raros ou ambíguos são excluídos para manter a qualidade dos
          dados.
        </p>
      </div>
    </div>
  );
}
