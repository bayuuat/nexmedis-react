import React from "react"

import { Settings2 } from "lucide-react"

import { Button } from "../ui/button"
import { Card } from "../ui/card"

function RightSidebar() {
  return (
    <Card className="h-fit border-[#EAEAEA] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold">Trend for you</h3>
        <Settings2 className="h-5 w-5" />
      </div>
      <div className="space-y-4">
        {[
          { tag: "#Minions", tweets: "97.7 k Tweets" },
          { tag: "#SeninBarokah", tweets: "87.2 k Tweets" },
          { tag: "#Texos", tweets: "122.7 k Tweets" },
          { tag: "#MUFC", tweets: "97.2 k Tweets" },
          { tag: "#Rangnick", tweets: "77.2 k Tweets" },
          { tag: "#ThxOle", tweets: "54.2 k Tweets" },
        ].map((trend, i) => (
          <div key={i} className="space-y-1">
            <div className="font-semibold">{trend.tag}</div>
            <div className="text-sm text-gray-500">{trend.tweets}</div>
          </div>
        ))}
        <Button variant="link" className="w-full text-blue-500">
          Show More
        </Button>
      </div>
    </Card>
  )
}

export default RightSidebar
