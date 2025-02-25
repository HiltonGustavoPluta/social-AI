"use client";

import { useEffect, useState } from "react";
import CreatePost from "@/components/create-post";
import PostFeed from "@/components/post-feed";
import { getAuthor, getPosts } from "./_actions/get-posts";
import { createClient } from "./utils/supabase/client";
import { useSession } from "next-auth/react";

export default function Home() {
  const supabase = createClient();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { data } =  useSession()
   
  const fetchPosts = async (authorId: string) => {
    const fetch = await getPosts(authorId)
    setPosts(fetch)
    setLoading(false)
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
    <div className="max-w-2xl mx-auto space-y-8">
      <CreatePost totalPosts={posts.length} />

      { loading && <p className="text-center">Carregando posts...</p>}
      <PostFeed posts={posts} />
    </div>
  );
}
