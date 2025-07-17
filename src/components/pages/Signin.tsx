import React, { useState, FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";
import { UserAuth } from "@/context/AuthContext";

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const auth = UserAuth();
  const signInUser = auth?.signInUser;
  const router = useRouter();

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signInUser(email, password);

    if (result.success) {
      console.log("Sign in successful", result.data);
      router.navigate({ to: "/" });
    } else {
      const errMessage = result.error ?? "Sign in failed";
      setError(errMessage);

      setTimeout(() => setError(null), 3000);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <form
        onSubmit={handleSignIn}
        className="w-2/4 m-auto p-4 text-center shadow-2xl"
      >
        <h2 className="font-bold pb-2 text-4xl">Sign in</h2>
        <p>
          Don&apos;t have an account yet?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </p>

        <div className="flex flex-col py-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 mt-2"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
        </div>

        <div className="flex flex-col py-4">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 mt-2"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-2/4 m-4 bg-black text-white py-2 rounded-lg"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {error && <p className="text-red-600 text-center pt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Signin;
