import { useNavigate, useMatch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addDataToMap } from "@kepler.gl/actions";
import KeplerGlSchema from "@kepler.gl/schemas";
import { SaveIcon, Save, EditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { UserAuth } from "@/context/AuthContext";
import { mapDetailRoute } from "@/routeTree";
import { getMapById } from "@/utils/getMap";
import { PageContainer } from "@/components/layout/PageConatiner";
import App from "@/App";
import { updateMapById } from "@/utils/updateMap";

import { exportKeplerDatasetAndConfig } from "@/utils/exportKeplerMap";
import { useRefresh } from "@/context/RefreshContext";

export default function MapPage() {
  const { session } = UserAuth();
  const { triggerRefresh } = useRefresh();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { mapId } = useMatch(mapDetailRoute);
  const match = useMatch({ from: mapDetailRoute.id });
  const { mapId } = match.params;

  const [mapDetails, setMapDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    if (!session) {
      navigate({ to: "/signin" });
    }
  }, [session, navigate]);

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

  useEffect(() => {
    if (!mapDetails) return;

    try {
      const keplerMap = KeplerGlSchema.load(
        mapDetails.dataset,
        mapDetails.config,
      );
      dispatch(addDataToMap(keplerMap as any));
    } catch (e) {
      console.error("Failed to load map into Kepler.gl", e);
    }
  }, [mapDetails, dispatch]);
  const handleUpdate = async () => {
    if (!mapDetails) return;
    const { dataset, config } = exportKeplerDatasetAndConfig();

    try {
      await updateMapById(mapId, {
        title,
        dataset: dataset,
        config: config,
      });
      triggerRefresh();
      alert("Map updated successfully");
      setIsEditingTitle(false);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: any) {
      alert("Update failed");
    }
  };
  const breadcrumbRight = (
    <Button onClick={handleUpdate}>
      <SaveIcon />
      save changes
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
            Cancel
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

  if (loading) {
    return (
      <PageContainer>
        <div className="p-4">Loading map...</div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <div className="p-4 text-red-500">Error: {error}</div>
      </PageContainer>
    );
  }

  if (!mapDetails) {
    return (
      <PageContainer>
        <div className="p-4">Map not found</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer breadcrumb={breadcrumb} breadcrumbRight={breadcrumbRight}>
      <div className="w-full h-full">
        <App />
      </div>
    </PageContainer>
  );
}
