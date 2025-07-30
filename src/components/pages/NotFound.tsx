import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-[80vh] w-full px-4">
      <Card className="max-w-md w-full shadow-xl text-center p-6 space-y-4">
        <h1 className="text-4xl font-bold text-red-600">404</h1>
        <p className="text-xl font-semibold">Page Not Found</p>
        <p className="text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <CardContent className="flex justify-center gap-4 mt-4">
          <Button onClick={() => navigate({ to: "/" })}>Go to Home</Button>
        </CardContent>
      </Card>
    </div>
  );
}
