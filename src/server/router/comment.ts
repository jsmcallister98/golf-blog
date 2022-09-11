import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const createCommentSchema = z.object({
  comment: z.string().max(1500, "Max comment length is 1500 characters"),
  postId: z.number(),
  userId: z.string(),
});

export type CreateCommentInput = z.TypeOf<typeof createCommentSchema>;

export const getCommentsByPostSchema = z.object({
  postId: z.number(),
});

export const commentRouter = createRouter()
  .query("byPost", {
    input: getCommentsByPostSchema,
    resolve({ ctx, input }) {
      return ctx.prisma.postComment.findMany({
        where: {
          postId: input.postId,
        },
      });
    },
  })
  .middleware(async ({ ctx, next }) => {
    // if user is not signed in allow them to post
    // a comment as "Anonymous"
    if (!ctx.session) {
      //   throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .mutation("create-comment", {
    input: createCommentSchema,
    async resolve({ ctx, input }) {
      const comment = await ctx.prisma.postComment.create({
        data: {
          ...input,
        },
      });

      return comment;
    },
  });
