import { useSelector, useDispatch } from "react-redux";
import { removeDataset } from "@reedu-kepler.gl/actions";
import { useTranslation } from "react-i18next";
import { Trash2Icon, Database } from "lucide-react";

/**
 * Sources Panel - Display and manage active data sources in Kepler GL
 * This panel shows all currently loaded datasets and allows users to remove them
 */
export function SourcesPanelComponent() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Get the Kepler GL state to access loaded datasets
  const keplerGlState = useSelector((state: any) => state.keplerGl?.map);
  const datasets = keplerGlState?.visState?.datasets || {};

  const handleRemoveDataset = (datasetId: string) => {
    dispatch(removeDataset(datasetId));
  };

  const datasetList = Object.entries(datasets).map(([id, dataset]: [string, any]) => ({
    id,
    label: dataset?.info?.label || id,
    rowCount: dataset?.data?.rows?.length || 0,
  }));

  if (datasetList.length === 0) {
    return (
      <div className="p-6 text-center">
        <Database className="w-12 h-12 mx-auto text-gray-300 mb-3" />
        <p className="text-sm text-gray-500">
          {t("sources.noDataLoaded") || "No data sources loaded"}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <div className="text-sm font-semibold text-gray-700 mb-4">
        {t("sources.activeSources") || "Active Sources"} ({datasetList.length})
      </div>

      <div className="space-y-2">
        {datasetList.map((dataset) => (
          <div
            key={dataset.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {dataset.label}
              </p>
              <p className="text-xs text-gray-500">
                {dataset.rowCount.toLocaleString()} {t("sources.rows") || "rows"}
              </p>
            </div>

            <button
              onClick={() => handleRemoveDataset(dataset.id)}
              className="ml-2 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              title={t("sources.remove") || "Remove"}
              aria-label={`Remove ${dataset.label}`}
            >
              <Trash2Icon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-400 pt-2 border-t border-gray-200 mt-4">
        {t("sources.info") || "Click the trash icon to remove a data source"}
      </div>
    </div>
  );
}
