import { useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/supbase-client";
import LogoTile from "../layout/logo-tille";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "@tanstack/react-router";

interface ResetPasswordProps {
  heading?: string;
  buttonText?: string;
  signupText?: string;
  signupUrl?: string;
}

export default function ResetPassword({
  heading,
  buttonText,
  signupText,
  signupUrl = "/signin",
}: ResetPasswordProps) {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage("");

    if (password !== confirmPassword) {
      setError(t("resetPassword.passwordsNoMatch"));
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(t("forgotPassword.error") + error.message);
    } else {
      setMessage(t("resetPassword.passwordUpdated"));
      setTimeout(() => {
        router.navigate({ to: "/signin" });
      }, 1000);
    }
    setLoading(false);
  };

  return (
    <section className="bg-muted h-screen w-full">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <LogoTile />

          <form
            onSubmit={handleUpdatePassword}
            className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md"
          >
            <h1 className="text-xl font-semibold">
              {heading || t("resetPassword.heading")}
            </h1>

            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("resetPassword.newPassword")}
              className="text-sm"
              required
            />

            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t("resetPassword.confirmPassword")}
              className="text-sm"
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-600 text-sm">{message}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? t("resetPassword.updating")
                : buttonText || t("resetPassword.buttonText")}
            </Button>
          </form>

          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText || t("resetPassword.signupText")}</p>
            <a
              href={signupUrl}
              className="text-primary font-medium hover:underline"
            >
              {t("resetPassword.login")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
