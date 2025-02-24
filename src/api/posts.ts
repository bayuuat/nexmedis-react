import { api } from "@/lib/axios"

export interface Post {
  id: number
  title: string
  body: string
}

export const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await api.get<Post[]>("/posts")
  return data
}

// Optional: Add other CRUD operations
export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  const { data } = await api.post<Post>("/posts", post)
  return data
}

export const updatePost = async (
  id: number,
  post: Partial<Post>,
): Promise<Post> => {
  const { data } = await api.put<Post>(`/posts/${id}`, post)
  return data
}

export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`)
}
