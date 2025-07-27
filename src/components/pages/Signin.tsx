import React, { useState, FormEvent } from "react";
import { useRouter } from "@tanstack/react-router";
import { UserAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SigninProps {
  heading?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title?: string;
  };
  buttonText?: string;
  promptText?: string;
  promptUrl?: string;
  promptLinkText?: string;
}

const logo = {
  url: "/",
  src: "/logo.png",
  alt: "Atraibike Logo",
  title: "ATRAIBIKE PLATFORM",
};

const Signin: React.FC<SigninProps> = ({
  heading = "Sign In",

  buttonText = "Sign In",
  promptText = "Don't have an account?",
  promptUrl = "/signup",
  promptLinkText = "Sign up",
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const auth = UserAuth();
  const signInUser = auth?.signInUser;
  const router = useRouter();

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signInUser?.(email, password);

      if (result?.success) {
        router.navigate({ to: "/" });
      } else {
        setError(result?.error ?? "Sign in failed");
      }
    } catch (err) {
      console.error("Signin error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-muted h-screen w-full">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <a href={logo.url}>
            <div className="flex items-center gap-4">
              <img
                src={logo.src}
                alt={logo.alt}
                title={logo.title}
                className="h-10 dark:invert"
              />
              <h2 className="text-xl font-bold">{logo.title}</h2>
            </div>
          </a>

          {/* Signin Form */}
          <form
            onSubmit={handleSignIn}
            className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md"
          >
            {heading && <h1 className="text-xl font-semibold">{heading}</h1>}

            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="text-sm"
              required
            />

            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="text-sm"
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : buttonText}
            </Button>
          </form>

          {/* Prompt Link */}
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{promptText}</p>
            <a
              href={promptUrl}
              className="text-primary font-medium hover:underline"
            >
              {promptLinkText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
