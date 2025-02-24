import { createFileRoute } from "@tanstack/react-router"

import CreatePost from "@/components/home/CreatePost"
import ListPost from "@/components/home/ListPost"

export const Route = createFileRoute("/_base/")({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <CreatePost />
      <ListPost />
    </>
  )
}
