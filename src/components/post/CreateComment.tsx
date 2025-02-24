import React, { useState } from "react"
import Placeholder from "@tiptap/extension-placeholder"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Card } from "../ui/card"
import { useCreateComment } from "@/hooks/use-create-comment"

interface CardPostProps {
  postId: number
}

const CardPost: React.FC<CardPostProps> = ({ postId }) => {
  const [content, setContent] = useState("")

  const createComment = useCreateComment(postId)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
  })

  const handlePost = async () => {
    if (!content.trim()) return

    try {
      await createComment.mutateAsync({
        content,
      })

      editor?.commands.clearContent(true)
    } catch (error) {
      console.error("Error creating post:", error)
    }
  }

  return (
    <Card className="my-4 border-[#EAEAEA] p-4">
      <div className="flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YtZ5CKdWAjteDMWh7naEE7wr36w3eo.png" />
          <AvatarFallback>YN</AvatarFallback>
        </Avatar>
        <EditorContent editor={editor} className="w-full flex-1 p-2" />
        <button
          className="h-9 self-end rounded-full bg-blue-500 px-8 text-sm text-white disabled:opacity-50"
          onClick={handlePost}
          disabled={createComment.isPending}
        >
          {createComment.isPending ? "Posting..." : "Post"}
        </button>
      </div>
    </Card>
  )
}

export default CardPost
