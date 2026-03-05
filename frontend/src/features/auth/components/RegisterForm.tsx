import { useState } from "react";
import { Button, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";

import { useRegister } from "../hooks/useAuth";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const register = useRegister();

  const serverError = register.error
    ? axios.isAxiosError(register.error)
      ? register.error.response?.data?.error ?? "Registration failed"
      : "Registration failed"
    : null;

  const errorMessage = localError ?? serverError;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError(null);

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    register.mutate({ email, password });
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
        <Input
          size="large"
          prefix={<MailOutlined className="text-foreground-muted/60" />}
          placeholder="you@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="!bg-transparent !border-border hover:!border-accent focus:!border-accent"
          styles={{ input: { background: "transparent" } }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-[0.15em] text-foreground-muted font-medium">
          Password
        </label>
        <Input.Password
          size="large"
          prefix={<LockOutlined className="text-foreground-muted/60" />}
          placeholder="At least 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="!bg-transparent !border-border hover:!border-accent focus:!border-accent"
          styles={{ input: { background: "transparent" } }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-[0.15em] text-foreground-muted font-medium">
          Confirm Password
        </label>
        <Input.Password
          size="large"
          prefix={<LockOutlined className="text-foreground-muted/60" />}
          placeholder="Repeat your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="!bg-transparent !border-border hover:!border-accent focus:!border-accent"
          styles={{ input: { background: "transparent" } }}
        />
      </div>

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        loading={register.isPending}
        block
        className="!mt-2 !h-12 !text-base !font-semibold !tracking-wide"
      >
        Create Account
      </Button>
    </form>
  );
}
