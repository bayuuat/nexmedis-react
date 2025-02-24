import React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { useGetProfile } from "@/hooks/use-get-profile"

function LeftSidebar() {
  const { data: user, isLoading, error } = useGetProfile()

  return (
    <div className="space-y-4">
      <Card className="border-[#EAEAEA] p-4">
        <div className="text-center">
          <div className="relative mx-auto mb-4 h-20 w-20">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YtZ5CKdWAjteDMWh7naEE7wr36w3eo.png"
              alt="Profile banner"
              className="h-20 w-20 rounded-full object-cover"
            />
          </div>
          {isLoading && <div>Loading posts...</div>}
          {error && <div>Error loading posts: {error.message}</div>}
          <h2 className="text-xl font-bold">{user?.fullname}</h2>
          <p className="text-sm text-gray-500">@{user?.username}</p>
          <div className="mt-4 flex justify-center gap-4">
            <div>
              <div className="font-bold">6,664</div>
              <div className="text-sm text-gray-500">Following</div>
            </div>
            <div>
              <div className="font-bold">9,991</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
          </div>
          <Button variant="outline" className="mt-4 w-full">
            My Profile
          </Button>
        </div>
      </Card>

      <Card className="border-[#EAEAEA] p-4">
        <h3 className="mb-4 font-bold">Who is to follow you</h3>
        <div className="space-y-4">
          {["Product Hunt", "Product Hunt", "Ryan Hoover"].map((name, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{name}</div>
                  <div className="text-sm text-gray-500">
                    @{name.toLowerCase().replace(" ", "")}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Follow
              </Button>
            </div>
          ))}
          <Button variant="link" className="w-full text-blue-500">
            Show More
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default LeftSidebar
