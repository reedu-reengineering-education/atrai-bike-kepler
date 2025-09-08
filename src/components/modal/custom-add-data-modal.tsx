// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useTranslation } from "react-i18next";
import { LoadDataModalFactory } from "@reedu-kepler.gl/components";
import { ATRAIDataPanel } from "./atrai-data-panel";
import { getDatasetsByCampaign } from "@/lib/kepler/dataset-registry";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

/**
 * Custom Add Data Modal Factory
 *
 * This factory extends the base LoadDataModalFactory to include an "ATRAI Data" option
 * alongside the existing "Load Files", "Tileset", and "Load from Storage" options.
 *
 * The implementation follows the same pattern as CustomSidePanelFactory:
 * 1. Wraps the base factory component
 * 2. Adds custom functionality while preserving existing behavior
 * 3. Uses proper dependency injection and factory pattern compliance
 *
 * Requirements addressed:
 * - 1.1: Adds "ATRAI Data" as the first option in the modal
 * - 4.1: Uses kepler.gl's official extension mechanisms
 * - 4.3: Maintains compatibility with kepler.gl's modal state management
 */
function CustomAddDataModalFactory(...args: any[]) {
  const LoadDataModal = LoadDataModalFactory(...args);

  // Create wrapper component that adds ATRAI Data as the first option
  const CustomAddDataModalWrapper = (props) => {
    const { t } = useTranslation();

    // Component to handle campaign-aware dataset loading
    const ATRAIDataPanelWrapper = () => {
      // Get the active campaign from Redux store
      const activeCampaign = useSelector(
        (state: RootState) => state.campaign.activeCampaign,
      );

      return (
        <ATRAIDataPanel
          datasets={getDatasetsByCampaign(activeCampaign)}
          onClose={() => {
            // Modal close will be handled by the parent modal system
            if (props.onClose) {
              props.onClose();
            }
          }}
          onDataLoad={(datasetInfo) => {
            // Data loading is handled within ATRAIDataPanel
            console.log("Dataset loaded:", datasetInfo.title);
            // Close modal after successful data load
            if (props.onClose) {
              props.onClose();
            }
          }}
        />
      );
    };

    // Create the ATRAI Data loading method configuration
    const atraiDataMethod = {
      id: "atrai-data",
      label: t("nav.Atrai Data"),
      elementType: ATRAIDataPanelWrapper,
      tabElement: t("nav.Atrai Data"),
    };

    // Get the default loading methods from the base component
    const defaultMethods = LoadDataModal.defaultLoadingMethods || [];

    // remove id storage from defaultMethods
    const filteredDefaultMethods = defaultMethods.filter(
      (method) => method.id !== "storage",
    );

    // Add ATRAI Data as the first option, followed by existing options
    const customLoadingMethods = [atraiDataMethod, ...filteredDefaultMethods];

    return <LoadDataModal {...props} loadingMethods={customLoadingMethods} />;
  };

  return CustomAddDataModalWrapper;
}

// Maintain dependency injection compatibility with kepler.gl's factory system
CustomAddDataModalFactory.deps = LoadDataModalFactory.deps;

export default CustomAddDataModalFactory;
