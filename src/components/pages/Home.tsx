import { PageContainer } from "@/components/layout/PageConatiner";
import App from "@/App";
import { Button } from "../ui/button";
import { LoaderCircle, Plus, Save } from "lucide-react";
import { saveMapToSupabase } from "@/supabase/saveMap";
import { UserAuth } from "@/context/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";

export default function HomePage() {
  const { session } = UserAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const form = useForm();

  const onSubmit = async () => {
    setLoading(true);
    try {
      const name = form.getValues("name");
      if (name == null) {
        console.error("Map name is required.");
        return;
      }
      console.log(name);
      const map = await saveMapToSupabase(name, session);

      if (map) {
        console.log("Map saved successfully:", map);

        navigate({ to: `/maps/${map.id}` });
      }
    } catch (error) {
      console.error("Error saving map:", error);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbRight = (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Save />
          Save Map
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save new Map</DialogTitle>
          <DialogDescription>
            Please provide a name for your new map.
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Map name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading && <LoaderCircle className="mr-2 animate-spin" />}
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );

  return (
    <PageContainer className="p-0" breadcrumbRight={session && breadcrumbRight}>
      <App />
    </PageContainer>
  );
}
