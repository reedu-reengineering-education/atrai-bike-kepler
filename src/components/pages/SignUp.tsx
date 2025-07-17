import React, { useState, FormEvent } from "react";
import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "@tanstack/react-router";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const auth = UserAuth();
  const signUpNewUser = auth?.signUpNewUser;

  const router = useRouter();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signUpNewUser(email, password);

      if (result.success) {
        router.navigate({ to: "/" });
      } else {
        setError(result.error?.message ?? "Sign up failed");
      }
    } catch (err) {
      console.error("Sign up error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <form
        onSubmit={handleSignUp}
        className="w-2/4 m-auto p-4 text-center shadow-2xl"
      >
        <h2 className="font-bold pb-2 text-4xl">Sign up</h2>
        <p>
          Already have an account?{"  "}
          <a href="/signin" className="underline">
            {" "}
            Signin
          </a>
        </p>

        <div className="flex flex-col py-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="p-3 mt-2"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
        </div>

        <div className="flex flex-col py-4">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        {error && <p className="text-center pt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
