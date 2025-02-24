import type { User } from "./user"

export interface Like {
  id: number
  userId: number
  postId: number
  createdAt: string
  user: User
}
