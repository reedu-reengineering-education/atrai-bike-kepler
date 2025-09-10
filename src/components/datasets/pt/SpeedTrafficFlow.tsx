export function SpeedTrafficFlowPT() {
  return (
    <div className="space-y-4">
      <p className="text-base">
        O processador <strong>SpeedTrafficFlow</strong> analisa a velocidade e o
        fluxo de tráfego coletados por sensores de bicicleta. Ele agrega os
        dados por trechos de estrada e gera resumos estatísticos e visualizações
        para compreender a dinâmica do tráfego.
      </p>

      <h3 className="text-lg font-semibold mt-6">📊 Metadados</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>ID:</strong> speed_traffic_flow
        </li>
        <li>
          <strong>Versão:</strong> 0.2.0
        </li>
        <li>
          <strong>Descrição:</strong> Avalia velocidade e fluxo de tráfego
        </li>
        <li>
          <strong>Opções de execução:</strong> sync-execute, async-execute
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
          <strong>id (boxId):</strong> Identificador do dispositivo para
          recuperação de dados
        </li>
        <li>
          <strong>token:</strong> Token secreto para autenticação
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📤 Saídas</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>id:</strong> ID da execução do processo
        </li>
        <li>
          <strong>status:</strong> Status do processo
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📈 Fluxo de Processamento</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>
          Filtra os dados de movimento de bicicletas (mínimo 10 medições por
          dispositivo)
        </li>
        <li>Calcula a velocidade normalizada (escala 0–1)</li>
        <li>
          Relaciona os dados de bicicletas com os trechos de estrada usando
          busca do vizinho mais próximo
        </li>
        <li>Agrega velocidade e fluxo de tráfego por trecho de estrada</li>
        <li>Gera GeoDataFrames e salva no PostGIS</li>
        <li>
          Filtra veículos parados e ajusta segmentos para análise de fluxo de
          tráfego
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🎯 Casos de Uso</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Analisar a velocidade das bicicletas em diferentes trechos</li>
        <li>Avaliar o fluxo de tráfego em ciclovias</li>
        <li>Identificar gargalos ou segmentos lentos</li>
        <li>
          Auxiliar no planejamento de tráfego e decisões de infraestrutura
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">⚠️ Observações</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Dispositivos com menos de 10 medições são excluídos</li>
        <li>Valores negativos de velocidade são ignorados</li>
        <li>É necessário um token de autenticação para executar o processo</li>
      </ul>
    </div>
  );
}
