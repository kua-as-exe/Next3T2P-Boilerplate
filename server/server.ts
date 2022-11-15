import express from "express"
import { RequestHandler } from "next/dist/server/next"
import { TrpcExpressMiddleware } from "./trpc";

type args = {
  port: number,
  mode: string,
  handle: RequestHandler
}
export const RunServer = ({ port, mode, handle }: args) => {

  const app = express()
  console.log("APP")

  app.use((req, _res, next) => {
    console.log('<-', '['+req.headers['x-forwarded-for']+']' ,req.method, req.path, req.body ?? req.query);
    next();
  });

  app.use('/trpc', TrpcExpressMiddleware);

  app.all('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(port, () => {
    console.log(`> ${mode} running on port: ${port}`)
  })

}
