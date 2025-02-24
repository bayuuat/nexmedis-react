import { createFileRoute, Link } from "@tanstack/react-router"
import { z } from "zod"

import { ArrowLeft } from "lucide-react"

import CardPost from "@/components/common/CardPost"
import CreateComment from "@/components/post/CreateComment"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { usePostsDetail } from "@/hooks/use-posts-detail"

export const Route = createFileRoute("/_base/$postId/_post")({
  component: PostLayout,
  parseParams: (params) =>
    z.object({ postId: z.coerce.number().int() }).parse(params),
  loader: ({ params }) => {
    return {
      postId: params.postId,
    }
  },
})

function PostLayout() {
  const { postId } = Route.useLoaderData()
  const { data: post, isLoading } = usePostsDetail(postId)

  if (isLoading) {
    return <Skeleton>Loading...</Skeleton>
  }

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="w-full">
      <Link to="/">
        <div className="mb-4 flex items-center gap-4 text-lg">
          <ArrowLeft className="size-4" />
          Post
        </div>
      </Link>
      <CardPost post={post} />
      <CreateComment postId={postId} />
      {post.comments?.map((comment) => (
        <Card key={comment.id} className="mb-2 p-4">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>U{post.userId}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-2">
                <span className="font-bold">{post.user.fullname}</span>
                <span className="text-sm text-gray-500">
                  @{post.user.username}
                </span>
              </div>
              <span
                className="mt-2"
                dangerouslySetInnerHTML={{ __html: comment.content }}
              ></span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
