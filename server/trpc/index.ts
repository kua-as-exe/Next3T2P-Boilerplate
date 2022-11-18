import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';
import { authRouter } from './routers/auth';
import { createContext, publicProcedure, router } from './trpc';


// root router to call
export const appRouter = router({

  hello: publicProcedure
    .input(z.object({
      text: z.string().nullish()
    }))
    .query(({ input, ctx }) => {
      return `hello ${input.text}`;
    }),

  auth: authRouter

})

export type AppRouter = typeof appRouter;

export const TrpcExpressMiddleware = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
})
