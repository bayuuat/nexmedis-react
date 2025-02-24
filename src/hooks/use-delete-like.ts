import { useMutation, useQueryClient } from "@tanstack/react-query"

import { api } from "@/lib/axios"

export const useDeleteLike = (postId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const response = await api.delete(`/likes/${postId}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}
