"use client"

import { getAuthor, getPosts } from "@/app/_actions/get-posts"
import { formatTimeAgo } from "@/app/_helper/formatDate"
import { createClient } from "@/app/utils/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Post } from "@prisma/client"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { useSession } from "next-auth/react"

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);

  const supabase = createClient()
    const { data } =  useSession()
  

  const fetchPosts = async (authorId: string) => {
    const fetch = await getPosts(authorId)
    setPosts(fetch)
  };

  useEffect(() => {
    
    if(!data?.user) return
    const authorId = (data.user as any).id

    fetchPosts(authorId)

    const channel = supabase
    .channel('realtime posts')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'Post', filter: `authorId=eq.${authorId}` }, async (payload) => {

      if (payload.eventType === 'INSERT') {
       const author = await getAuthor(payload.new.authorId)
       setPosts((current) => [{...payload.new, author } as any, ...current])
      } else if (payload.eventType === 'DELETE') {
        setPosts((current) => current.filter((post) => post.id !== payload.old.id))
      } else if (payload.eventType === 'UPDATE') {
        setPosts((current) =>
          current.map((post) => (post.id === payload.new.id ? { ...post, ...payload.new } : post))
        )
      }
    })
    .subscribe((status) => {
      console.log('Subscription status:', status)
    })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [data]);

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