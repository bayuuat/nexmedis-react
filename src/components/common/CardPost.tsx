import React from "react"
import { Link } from "@tanstack/react-router"
import { formatDistanceToNow, parseISO } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { useDeleteLike } from "@/hooks/use-delete-like"
import { useLikePost } from "@/hooks/use-like-post"

import type { Post } from "@/types"

interface CardPostProps {
  post: Post
}

const gridStyles = [
  "grid grid-cols-1 gap-2", // 1 gambar
  "grid grid-cols-2 gap-2", // 2 gambar
  "grid grid-flow-col grid-rows-2 gap-2", // 3 gambar (1 besar atas, 2 bawah)
  "grid grid-cols-2 gap-2", // 4+ gambar (2x2 grid)
]

const CardPost: React.FC<CardPostProps> = ({ post }) => {
  const likePost = useLikePost(post.id)
  const deleteLike = useDeleteLike(post.id)

  const handleLikeClick = async () => {
    if (post.liked) {
      await deleteLike.mutateAsync()
    } else {
      await likePost.mutateAsync()
    }
  }

  return (
    <Card className="border-[#EAEAEA] p-4">
      <div className="flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>U{post.userId}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold">{post.user.fullname}</span>
            <span className="text-sm text-gray-500">@{post.user.username}</span>
            <span className="ml-auto text-xs text-gray-500">
              {formatDistanceToNow(parseISO(post.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <p
            className="mt-2"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></p>
          <div
            className={`${gridStyles[Math.min(post.images.length - 1, 3)]} mt-2 max-h-[500px] w-full`}
          >
            {post.images?.slice(0, 4).map((image, index) => (
              <div
                key={image.id}
                className={`relative ${
                  post.images.length === 3 && index === 0
                    ? "col-span-2 row-span-2"
                    : ""
                }`}
              >
                <img
                  src={image.file}
                  className={`h-full ${post.images.length > 4 ? "max-h-[250px]" : "max-h-[500px]"} w-full rounded-lg object-cover`}
                />
                {index === 3 && post.images.length > 4 && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 text-xl font-bold text-white">
                    +{post.images.length - 4}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLikeClick}
              disabled={likePost.isPending || deleteLike.isPending}
              className={post.liked ? "text-blue-500" : ""}
            >
              {post._count.likes} Like
            </Button>
            <Link
              to="/$postId"
              params={{
                postId: post.id,
              }}
            >
              <Button variant="ghost" size="sm">
                {post._count.comments} Comment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default CardPost
