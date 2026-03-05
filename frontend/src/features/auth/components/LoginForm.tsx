import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { useLogin } from "../hooks/useAuth";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();

  const errorMessage = login.error
    ? axios.isAxiosError(login.error)
      ? login.error.response?.data?.error ?? "Login failed"
      : "Login failed"
    : null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login.mutate({ email, password });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {errorMessage && (
        <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 text-sm">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-[0.15em] text-foreground-muted font-medium">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground-muted/60" />
          <Input
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-10 pl-10 !bg-transparent"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-[0.15em] text-foreground-muted font-medium">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground-muted/60 z-10" />
          <PasswordInput
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-10 pl-10 !bg-transparent"
          />
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        loading={login.isPending}
        block
        className="!mt-2 !h-12 !text-base !font-semibold !tracking-wide"
      >
        Sign In
      </Button>
    </form>
  );
}
