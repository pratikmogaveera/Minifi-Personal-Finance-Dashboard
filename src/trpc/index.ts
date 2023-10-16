import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { privateProcedure, procedure, router } from './trpc';

const db = new PrismaClient()

db.$connect()

export const appRouter = router({

    authCallback: procedure.query(async () => {
        const { getUser } = getKindeServerSession()
        const user = getUser()

        if (!user || !user.id || !user.email)
            // return { success: false }
            throw new TRPCError({ code: 'UNAUTHORIZED' })

        // Check if user exists in our database.
        const dbUser = await db.user.findFirst({
            where: {
                id: user.id
            }
        })

        if (!dbUser) {  // User signed in for the first time
            await db.user.create({  // Create user in database
                data: {
                    id: user.id,
                    email: user.email
                }
            })

        }

        return { success: true }
    }),

    getUserData: procedure.query(async () => {
        const { getUser } = getKindeServerSession()
        const user = getUser()

        if (!user || !user.id || !user.email)
            throw new TRPCError({ code: "NOT_FOUND" })

        const dbUser = await db.user.findFirst({
            where: {
                id: user.id
            }
        })

        return { data: dbUser }
    }),

    getTransactions: privateProcedure.query(async ({ ctx }) => {
        const { userEmail } = ctx

        const data = await db.transaction.findMany({
            where: {
                user: userEmail
            }
        })

        // Send data after sorting it in descending order.
        data.sort((a, b) => {
            if (b.date.getTime() === a.date.getTime())
                return b.createdAt.getTime() - a.createdAt.getTime()
            else
                return b.date.getTime() - a.date.getTime()
        })

        return data

    }),

    getTransactionById: privateProcedure.input(z.string().min(1)).query(async ({ ctx, input }) => {
        return await db.transaction.findFirst({
            where: {
                user: ctx.userEmail,
                id: input
            }
        })
    }),

    createTransaction: privateProcedure.input(z.object({
        receiver: z.string().min(1),
        amount: z.coerce.number().min(0),
        method: z.string().min(1),
        category: z.string().min(1),
        date: z.date().max(new Date()),
        description: z.string().max(100)
    })).mutation(async (opts) => {
        const { getUser } = getKindeServerSession()
        const user = getUser()

        if (!user || !user.id || !user.email)
            throw new TRPCError({ code: "UNAUTHORIZED" })

        const res = await db.transaction.create({
            data: { ...opts.input, user: user.email }
        })

        return { success: true }
    }),

    removeTransaction: privateProcedure.input(z.string().min(1)).mutation(async ({ ctx, input }) => {
        const res = await db.transaction.delete({
            where: {
                id: input,
                user: ctx.userEmail
            }
        })

        if (!res)
            throw new TRPCError({ code: "NOT_FOUND" })

        if (res)
            return { success: true }

        return res
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;