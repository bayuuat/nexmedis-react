import { useQuery } from "@tanstack/react-query"

import { api } from "@/lib/axios"

import type { User } from "@/types"

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await api.get<User>(`/auth/profile`)
      console.log(data)
      return data
    },
  })
}
