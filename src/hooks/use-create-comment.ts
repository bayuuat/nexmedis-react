import { useMutation, useQueryClient } from "@tanstack/react-query"

import { api } from "@/lib/axios"

interface CreateCommentData {
  content: string
}

export const useCreateComment = (postId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateCommentData) => {
      const response = await api.post(`/comments/${postId}`, {
        content: data.content,
      })

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}
