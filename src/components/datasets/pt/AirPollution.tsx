export function AirPollutionPT() {
  return (
    <div className="space-y-4">
      <p className="text-base">
        O processador <strong>PMAnalysis</strong> avalia as concentrações de
        material particulado (PM) coletadas por sensores de bicicleta. Ele gera
        visualizações e mapas de calor para analisar variações espaciais,
        temporais e sazonais dos níveis de PM.
      </p>

      <h3 className="text-lg font-semibold mt-6">📊 Metadados</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>ID:</strong> pm_analysis
        </li>
        <li>
          <strong>Versão:</strong> 0.2.0
        </li>
        <li>
          <strong>Descrição:</strong> Processos para avaliar concentrações de PM
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
          recuperar dados.
        </li>
        <li>
          <strong>token:</strong> Token secreto para autenticação.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📤 Saídas</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>id:</strong> ID da execução do processo
        </li>
        <li>
          <strong>status:</strong> Descrição do processo e arquivos gerados
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📈 Fluxo de Processamento</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>
          Carrega dados de sensores de bicicleta e calcula latitude/longitude a
          partir da geometria
        </li>
        <li>Filtra dispositivos com pelo menos 10 medições</li>
        <li>Remove outliers e medições com umidade relativa &gt; 75%</li>
        <li>Gera boxplots para PM1, PM2.5, PM4 e PM10</li>
        <li>Calcula e visualiza ciclo diurno e média mensal de PM2.5</li>
        <li>
          Cria mapas de calor geoespaciais de PM2.5, incluindo filtros sazonais
          e horários
        </li>
        <li>Salva todas as visualizações como arquivos PNG e HTML</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">📂 Arquivos Gerados</h3>
      <ul className="list-disc list-inside ml-4">
        <li>pm_boxplots.png — Boxplots das concentrações de PM</li>
        <li>pm_diurnal_cycle.png — Gráfico do ciclo diurno de PM2.5</li>
        <li>pm_monthly_avg.png — Média mensal de PM2.5</li>
        <li>PM_25_heatmap.html — Mapa de calor de PM2.5</li>
        <li>
          PM_25_timeframe_heatmap.html — Mapa de calor filtrado por
          estação/tempo
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">🎯 Casos de Uso</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Monitorar a qualidade do ar em áreas urbanas</li>
        <li>Analisar tendências temporais da poluição por PM</li>
        <li>Identificar hotspots com alta concentração de PM</li>
        <li>
          Auxiliar em pesquisas e decisões políticas sobre saúde ambiental
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">⚠️ Observações</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Dispositivos com menos de 10 medições são excluídos</li>
        <li>Medições com umidade relativa &gt; 75% são filtradas</li>
        <li>É necessário um token de autenticação para executar o processo</li>
      </ul>
    </div>
  );
}
