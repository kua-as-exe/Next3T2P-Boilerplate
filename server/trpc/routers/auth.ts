import { router, publicProcedure } from '../trpc';
import bcrypt from 'bcrypt'

import { z } from 'zod';
import db from '@db/prisma';
import { TRPCError } from '@trpc/server';
import { exclude } from 'lib/utils/helpers';

export const authRouter = router({

  register: publicProcedure.input(
    z.object({
      name: z.string().nullish(),
      username: z.string(),
      email: z.string(),
      password: z.string(),
    })
  ).mutation(async ({ input }) => {

    const { name, username, email, password } = input;

    try {
      const hash = await bcrypt.hash(password, 0);

      const user = await db.user.create({
        data: {
          name: name,
          email: email,
          username: username,
          password: hash
        },
      });

      return exclude( user, ['password'] )

    }
    catch (err) {
      console.log("Error creating user", err)
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Error creating user',
        // optional: pass the original error to retain stack trace
        cause: err,
      });

    }

  })

  // list: publicProcedure.query(() => {
  //   // ...
  //   return [];
  // }),
});
