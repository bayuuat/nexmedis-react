import { useQuery } from "@tanstack/react-query"

import { api } from "@/lib/axios"

import type { Post } from "@/types/post"

export const usePostsDetail = (id: number) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const { data } = await api.get<Post>(`/posts/${id}`)
      console.log(data)
      return data
    },
  })
}
