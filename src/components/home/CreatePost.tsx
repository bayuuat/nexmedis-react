import React, { useRef, useState } from "react"
import Placeholder from "@tiptap/extension-placeholder"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import { Link } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Card } from "../ui/card"
import { useCreatePost } from "@/hooks/use-create-post"

function CreatePost() {
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [images, setImages] = useState<FileList | null>(null)
  const [content, setContent] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const createPost = useCreatePost()

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

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files)
      const files = Array.from(e.target.files)
      const imageUrls = files.map((file) => URL.createObjectURL(file))
      setSelectedImages(imageUrls)
    }
  }

  const handlePost = async () => {
    if (!content.trim()) return

    try {
      await createPost.mutateAsync({
        content,
        userId: 1,
        images: images,
      })

      editor?.commands.clearContent(true)
      setSelectedImages([])
      setImages(null)
    } catch (error) {
      console.error("Error creating post:", error)
    }
  }

  return (
    <Card className="border-[#EAEAEA] p-4">
      <div className="flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YtZ5CKdWAjteDMWh7naEE7wr36w3eo.png" />
          <AvatarFallback>YN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <EditorContent editor={editor} className="p-2" />
          <div className="overflow-x-auto">
            {selectedImages.length > 0 && (
              <div className="mt-2 flex h-40 w-40 gap-2">
                {selectedImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Selected ${index + 1}`}
                    className="h-full w-full rounded-lg object-cover"
                  />
                ))}
              </div>
            )}
          </div>
          <div
            className={`${!!selectedImages.length ? "mt-3" : "mt-1"} flex justify-end gap-2`}
          >
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e5e5e5]"
              onClick={handleImageClick}
            >
              <Link className="h-4 w-4" />
            </button>
            <button
              className="h-9 rounded-full bg-blue-500 px-8 text-sm text-white disabled:opacity-50"
              onClick={handlePost}
              disabled={
                createPost.isPending ||
                (!content.trim() && selectedImages.length === 0)
              }
            >
              {createPost.isPending ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default CreatePost
