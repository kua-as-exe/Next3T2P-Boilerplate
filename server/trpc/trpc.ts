import * as trpc from '@trpc/server';
import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

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


