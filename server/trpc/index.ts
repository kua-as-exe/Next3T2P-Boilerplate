import db from '@db/prisma';
import * as trpc from '@trpc/server';
import { TRPCError, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {

  return {
    req,
    res,
  };
};
type Context = trpc.inferAsyncReturnType<typeof createContext>;

const t = initTRPC
  .context<Context>()
  // .meta<Meta>()
  .create()

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;

// root router to call
export const appRouter = router({

  hello: publicProcedure
    .input(z.object({
      text: z.string().nullish()
    }))
    .query(({ input, ctx }) => {
      return `hello ${input.text}`;
    }),

  posts: publicProcedure
    .query(async ({ ctx }) => {
      return db.post.findMany()
    })

})

export type AppRouter = typeof appRouter;

export const TrpcExpressMiddleware = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
})
