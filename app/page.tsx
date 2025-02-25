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
  const channelRef = useRef<any>(null);

     const fetchPosts = async (authorId: string) => {
      setLoading(true);
      const fetchedPosts = await getPosts(authorId);
      setPosts(fetchedPosts.slice(0, 10));
      setLoading(false);
    };


    useEffect(() => {
     if (!data?.user) return;
      const authorId = (data.user as any).id;
      fetchPosts(authorId);
    }, [data])

  // useEffect(() => {
  //   if (!data?.user) return;

  //   const authorId = (data.user as any).id;

  //   const fetchPosts = async () => {
  //     setLoading(true);
  //     const fetchedPosts = await getPosts(authorId);
  //     setPosts(fetchedPosts.slice(0, 10));
  //     setLoading(false);
  //   };

  //   fetchPosts();

  //   if (channelRef.current) {
  //     supabase.removeChannel(channelRef.current);
  //   }

  //   const channel = supabase
  //     .channel("realtime-posts")
  //     .on(
  //       "postgres_changes",
  //       { event: "*", schema: "public", table: "Post", filter: `authorId=eq.${authorId}` },
  //       async (payload) => {
  //         if (payload.eventType === "INSERT") {
  //           // 🔹 Buscar o autor separadamente
  //           getAuthor(payload.new.authorId).then((author) => {
  //             setPosts((current) => [{ ...payload.new, author }, ...current].slice(0, 10));
  //           });
  //         } else if (payload.eventType === "DELETE") {
  //           setPosts((current) => current.filter((post) => post.id !== payload.old.id));
  //         } else if (payload.eventType === "UPDATE") {
  //           setPosts((current) =>
  //             current.map((post) =>
  //               post.id === payload.new.id ? { ...post, ...payload.new } : post
  //             )
  //           );
  //         }
  //       }
  //     )
  //     .subscribe();

  //   channelRef.current = channel; // Armazena a referência do canal

  //   return () => {
  //     if (channelRef.current) {
  //       supabase.removeChannel(channelRef.current);
  //     }
  //   };
  // }, [data]);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <CreatePost totalPosts={posts.length} />

      {loading && <p className="text-center">Carregando posts...</p>}
      <PostFeed posts={posts} />
    </div>
  );
}
