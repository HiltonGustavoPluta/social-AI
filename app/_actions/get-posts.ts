"use server"

import { db } from "@/lib/prisma";
import { endOfDay, startOfDay } from "date-fns"

export const getPosts = async (authorId: string) => {
  const posts = await db.post.findMany({
    where: { 
      authorId: authorId,
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      author: true
    },
  });

  return posts;
}

export const getAuthor = async (authorId: string) => {
  const author = await db.user.findUnique({
    where: {
      id: authorId
    }
  });

  return author;
}