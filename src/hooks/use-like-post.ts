import { useMutation, useQueryClient } from "@tanstack/react-query"

import { api } from "@/lib/axios"

export const useLikePost = (postId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const response = await api.post(`/likes/${postId}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}
