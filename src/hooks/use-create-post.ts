import { useMutation, useQueryClient } from "@tanstack/react-query"

import { api } from "@/lib/axios"

interface CreatePostData {
  content: string
  userId: number
  images: FileList | null
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreatePostData) => {
      const formData = new FormData()

      formData.append("content", data.content)
      formData.append("userId", data.userId.toString())

      if (data.images) {
        Array.from(data.images).forEach((file) => {
          formData.append("images", file) // Menambahkan setiap file ke FormData
        })
      }

      const response = await api.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}
