import { useNavigate, useMatch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMapState } from "@/hooks/useMapState";
import { SaveIcon, Save, EditIcon, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { UserAuth } from "@/context/AuthContext";
import { mapDetailRoute } from "@/routeTree";
import { getMapById } from "@/supabase/getMap";
import { PageContainer } from "@/components/layout/PageConatiner";
import App from "@/App";
import { updateMapById } from "@/supabase/updateMap";

import { exportKeplerDatasetAndConfig } from "@/supabase/exportKeplerMap";
import { useRefresh } from "@/context/RefreshContext";

import { formatUrlPath } from "@/supabase/formatPath";

export default function MapPage() {
  const { t } = useTranslation();
  const { session, authLoading } = UserAuth();
  const { triggerRefresh } = useRefresh();
  const navigate = useNavigate();
  // const { mapId } = useMatch(mapDetailRoute);
  const match = useMatch({ from: mapDetailRoute.id });
  const { mapId } = match.params;

  const [mapDetails, setMapDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const [updateLoading, setUpdateLoading] = useState(false);

  const currentPath = match.pathname;

  useEffect(() => {
    if (authLoading) return;
    if (!session) {
      navigate({ to: "/signin" });
    }
  }, [authLoading, session, navigate]);

  useEffect(() => {
    if (!session || !session.user) return;
    const fetchMapDetails = async () => {
      try {
        setLoading(true);
        const map = await getMapById(mapId, session.user.id);
        if (!map) throw new Error("Map not found");
        setMapDetails(map);
        setTitle(map.title);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load map");
      } finally {
        setLoading(false);
      }
    };

    fetchMapDetails();
  }, [mapId, session]);

  // Use the custom hook to manage map state persistence
  useMapState(mapId, mapDetails);

  const handleUpdate = async () => {
    if (!mapDetails) return;
    const { dataset, config } = exportKeplerDatasetAndConfig();

    try {
      setUpdateLoading(true);
      await updateMapById(mapId, {
        title,
        dataset: dataset,
        config: config,
      });
      triggerRefresh();
      setIsEditingTitle(false);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: any) {
      console.error(t("saveMap.updateFailed"), e);
    } finally {
      setUpdateLoading(false);
    }
  };
  const breadcrumbRight = (
    <Button onClick={handleUpdate} disabled={updateLoading}>
      {updateLoading ? (
        <LoaderCircle className="mr-2 animate-spin" />
      ) : (
        <SaveIcon />
      )}
      {t("saveMap.saveChanges")}
    </Button>
  );

  const breadcrumb = (
    <>
      {isEditingTitle ? (
        <>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-64 text-sm"
            autoFocus
          />
          <Button onClick={handleUpdate} variant="ghost">
            <Save />
          </Button>
          <Button variant="ghost" onClick={() => setIsEditingTitle(false)}>
            {t("saveMap.cancel")}
          </Button>
        </>
      ) : (
        <>
          <span className="text-base ">{title}</span>
          <Button
            variant="ghost"
            onClick={() => setIsEditingTitle(true)}
            className="text-sm"
          >
            <EditIcon className="h-4 w-4" />
          </Button>
        </>
      )}
    </>
  );

  if (authLoading || loading) {
    return (
      <PageContainer>
        <div className="p-4">{t("saveMap.loadingMap")}</div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <div className="p-4 text-red-500">
          {t("saveMap.error")}
          {error}
        </div>
      </PageContainer>
    );
  }

  if (!mapDetails) {
    return (
      <PageContainer>
        <div className="p-4">{t("saveMap.mapNotFound")}</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      breadcrumb={breadcrumb}
      breadcrumbRight={breadcrumbRight}
      urlPath={formatUrlPath(currentPath)}
      // urlPath={["maps"]} it is a specific soluation for Map page
      className="p-0"
    >
      <App />
    </PageContainer>
  );
}
