"use client";

import { useEffect, useState, useRef } from "react";
import CreatePost from "@/components/create-post";
import PostFeed from "@/components/post-feed";
import { getPosts } from "./_actions/get-posts";
import { useSession } from "next-auth/react";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { data } = useSession();

     const fetchPosts = async () => {
      if (!data?.user) return;
      const authorId = (data.user as any).id;
      const fetchedPosts = await getPosts(authorId);
      setPosts(fetchedPosts.slice(0, 10));
      setLoading(false);
    };


    useEffect(() => {
      if (!data?.user) return;
      setLoading(true);
      fetchPosts();
    }, [data])


  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <CreatePost totalPosts={posts.length} onCreate={fetchPosts} />

      {loading && <p className="text-center">Carregando posts...</p>}
      <PostFeed posts={posts} />
    </div>
  );
}
