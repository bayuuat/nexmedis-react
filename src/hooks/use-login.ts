import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

import { api } from "@/lib/axios"

interface LoginData {
  username: string
  password: string
}

export const useLogin = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await api.post(`/auth/login`, {
        username: data.username,
        password: data.password,
      })

      return response.data
    },
    onSuccess: (data) => {
      navigate({ to: "/" })
      localStorage.setItem("token", data.token)
    },
  })
}
