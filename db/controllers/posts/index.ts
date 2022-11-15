import db from "@db/prisma";

export const getAllPosts = async () => await db.post.findMany({
  include: {
    author: {
      select: {
        name: true,
        username: true,
        picture: true,
      }
    }
  }
})

export declare type getAllPostsType = Awaited<ReturnType<typeof getAllPosts>>
