"use client"

import { formatTimeAgo } from "@/app/_helper/formatDate"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Post } from "@prisma/client"
import { Button } from "./ui/button"
import { Heart, MessageCircle, Share2 } from "lucide-react"
 
interface PostFeedProps {
  posts: Post[]
}

export default function PostFeed( { posts }: PostFeedProps) {

  return (
    <div className="space-y-6">
      {posts.map((post:any) => (
        <Card key={post.id}>
          <CardHeader className="flex flex-row items-center space-x-4 p-4">
            <Avatar>
              <AvatarImage src={post.author.image} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{post.author.name}</h3>
               <p className="text-sm text-muted-foreground">{formatTimeAgo(post.updatedAt)}</p>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p>{post.content}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4" />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4" />
                {post.comments}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
                {post.shares}
              </Button>
            </div>
          </CardFooter>

        </Card>
      ))}
    </div>
  )
}