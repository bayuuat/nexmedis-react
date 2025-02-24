import CardPost from "../common/CardPost"
import { usePosts } from "@/hooks/use-posts"

function ListPost() {
  const { data: posts, isLoading, error } = usePosts()

  return (
    <>
      {isLoading && <div>Loading posts...</div>}
      {error && <div>Error loading posts: {error.message}</div>}

      {posts?.map((post) => <CardPost key={post.id} post={post} />)}
    </>
  )
}

export default ListPost
