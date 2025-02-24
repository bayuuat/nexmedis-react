import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router"

import { Hash, MoreHorizontal } from "lucide-react"

import LeftSidebar from "@/components/home/LeftSidebar"
import RightSidebar from "@/components/home/RightSidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const isAuthenticated = () => !!localStorage.getItem("token")
export const Route = createFileRoute("/_base")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: "/login",
      })
    }
  },
  component: BaseLayout,
})

function BaseLayout() {
  const navigate = useNavigate()

  const logout = () => {
    try {
      localStorage.removeItem("token")
      navigate({ to: "/login" })
    } catch (error) {
      console.error("Error creating post:", error)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="container mx-auto">
        <header className="flex items-center justify-between border-b border-[#EAEAEA] p-4">
          <div className="flex items-center">
            <Hash />
            <h1 className="text-2xl font-bold italic">Hastags</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm" variant="secondary" onClick={logout}>
              Log Out
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YtZ5CKdWAjteDMWh7naEE7wr36w3eo.png" />
              <AvatarFallback>YN</AvatarFallback>
            </Avatar>
            <MoreHorizontal className="h-6 w-6" />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-[300px_1fr_350px]">
          <LeftSidebar />
          <div className="space-y-4">
            <Outlet />
          </div>
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}
