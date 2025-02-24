import { useQuery } from "@tanstack/react-query"

import { api } from "@/lib/axios"

import type { Post } from "@/types/post"

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await api.get<Post[]>("/posts")
      return data
    },
  })
}
