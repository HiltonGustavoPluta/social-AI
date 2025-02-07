import CreatePost from "@/components/create-post"
import PostFeed from "@/components/post-feed"

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <CreatePost />
      <PostFeed />
    </div>
  )
}