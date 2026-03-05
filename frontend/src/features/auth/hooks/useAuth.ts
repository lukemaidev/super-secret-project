import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { loginUser, registerUser } from "../api/auth.api";
import { useAuthStore } from "../store/authStore";

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      navigate("/goals/new");
    },
  });
}

export function useRegister() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      navigate("/goals/new");
    },
  });
}
