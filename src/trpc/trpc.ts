import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError, initTRPC } from '@trpc/server';
import superjson from 'superjson';

const t = initTRPC.create({
    transformer: superjson
});

const middleware = t.middleware

const isAuth = middleware(async (opts) => {

    const { getUser } = getKindeServerSession()
    const user = getUser()

    if (!user || !user.id || !user.email) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
    }

    return opts.next({
        ctx: {
            userId: user.id,
            userEmail: user.email,
            user
        }
    })
})


// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);