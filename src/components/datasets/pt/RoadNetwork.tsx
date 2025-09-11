export function RoadNetworkPT() {
  return (
    <div className="space-y-4">
      <p className="text-base">
        O processador <strong>RoadNetwork</strong> calcula e importa dados de
        redes viárias com foco em infraestrutura cicloviária. Ele extrai dados
        do OpenStreetMap, aplica filtros e armazena os resultados em um banco de
        dados para análises posteriores.
      </p>

      <h3 className="text-lg font-semibold mt-6">📊 Metadados</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>ID:</strong> road_network
        </li>
        <li>
          <strong>Versão:</strong> 0.2.0
        </li>
        <li>
          <strong>Descrição:</strong> Processos para calcular redes viárias
        </li>
        <li>
          <strong>Opções de Controle:</strong> sync-execute, async-execute
        </li>
        <li>
          <strong>Palavras-chave:</strong> processo
        </li>
        <li>
          <strong>Mais informações:</strong>{" "}
          <a href="https://example.org/process" target="_blank">
            documentação do processo
          </a>
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🛠️ Entradas</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>token:</strong> Token secreto para autenticação
        </li>
        <li>
          <strong>location:</strong> Localização (cidade, município, país) para
          extrair a rede
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📤 Saídas</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>id:</strong> ID da execução do processo
        </li>
        <li>
          <strong>status:</strong> Mensagem com número de arestas importadas
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📈 Fluxo de Processamento</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Validar parâmetros (location, token)</li>
        <li>Baixar rede viária do OpenStreetMap com filtros cicloviários</li>
        <li>Unir redes de múltiplas localidades em um grafo único</li>
        <li>Extrair arestas (osmid, nome, superfície, geometria)</li>
        <li>Salvar redes viárias e cicloviárias no PostGIS</li>
        <li>Atualizar configuração em caso de nova coleção</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🎯 Casos de Uso</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Analisar infraestrutura cicloviária em áreas urbanas</li>
        <li>Apoiar o planejamento de mobilidade sustentável</li>
        <li>Cruzamento com dados de poluição atmosférica</li>
        <li>Gerar mapas e modelos de rotas para ciclistas</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">⚠️ Notas</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>É necessário autenticar-se com token</li>
        <li>Suporta múltiplas localidades em uma mesma requisição</li>
        <li>Resultados armazenados em tabelas PostGIS</li>
      </ul>
    </div>
  );
}
