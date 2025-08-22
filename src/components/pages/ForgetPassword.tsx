import { useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/supbase-client";
import LogoTile from "../layout/logo-tille";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ForgotPasswordProps {
  heading?: string;
  buttonText?: string;
  signinText?: string;
  signinUrl?: string;
  signupText?: string;
  signupUrl?: string;
}

export default function ForgotPassword({
  heading,
  buttonText,
  signinText,
  signinUrl = "/signin",
  signupText,
  signupUrl = "/signup",
}: ForgotPasswordProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password",
    });

    if (error) {
      setError(t("forgotPassword.error") + error.message);
    } else {
      setMessage(t("forgotPassword.checkEmail"));
    }

    setLoading(false);
  };

  return (
    <section className="bg-muted h-screen w-full">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <LogoTile />

          {/* Reset Password Form */}
          <form
            onSubmit={handleReset}
            className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md"
          >
            <h1 className="text-xl font-semibold">
              {heading || t("forgotPassword.heading")}
            </h1>

            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("signIn.email")}
              className="text-sm"
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-600 text-sm">{message}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? t("forgotPassword.sending")
                : buttonText || t("forgotPassword.buttonText")}
            </Button>
          </form>

          {/* Links to Sign In and Sign Up */}
          <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
            <div>
              <span>{signinText || t("forgotPassword.signinText")} </span>
              <a
                href={signinUrl}
                className="text-primary font-medium hover:underline"
              >
                {t("forgotPassword.signIn")}
              </a>
            </div>
            <div>
              <span>{signupText || t("forgotPassword.signupText")} </span>
              <a
                href={signupUrl}
                className="text-primary font-medium hover:underline"
              >
                {t("forgotPassword.signUp")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
