import type { Comment } from "./comment"
import type { Image } from "./image"
import type { Like } from "./like"
import type { User } from "./user"

export interface PostCount {
  likes: number
  comments: number
}

export interface Post {
  id: number
  content: string
  userId: number
  createdAt: string
  updatedAt: string
  images: Image[]
  user: User
  likes: Like[]
  comments: Comment[]
  _count: PostCount
  liked: boolean
}
