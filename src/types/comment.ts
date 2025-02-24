import type { User } from "./user"

export interface Comment {
  id: number
  content: string
  userId: number
  postId: number
  createdAt: string
  user: User
}
