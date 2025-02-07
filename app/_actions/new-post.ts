"use server"

import { db } from "@/lib/prisma";

interface SavePostParams {
  content: string;
  authorId: string;
}

export const newPost= async (params: SavePostParams) => {
  await db.post.create({
    data: {
      content: params.content,
      authorId: params.authorId,
    }
  })
}