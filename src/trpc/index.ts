import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { db } from '../db';
import { privateProcedure, procedure, router } from './trpc';

export const appRouter = router({

    authCallback: procedure.query(async () => {
        const { getUser } = getKindeServerSession()
        const user = await getUser()

        if (!user || !user.id || !user.email)
            throw new TRPCError({ code: 'UNAUTHORIZED' })

        const dbUser = await db.user.findFirst({
            where: { id: user.id }
        })

        if (!dbUser) {
            await db.user.create({
                data: { id: user.id, email: user.email }
            })
        }

        return { success: true }
    }),

    getUserData: procedure.query(async () => {
        const { getUser } = getKindeServerSession()
        const user = await getUser()

        if (!user || !user.id || !user.email)
            throw new TRPCError({ code: "NOT_FOUND" })

        const dbUser = await db.user.findFirst({
            where: { id: user.id }
        })

        return { data: dbUser }
    }),

    getTransactions: privateProcedure.query(async ({ ctx }) => {
        return db.transaction.findMany({
            where: { user: ctx.userEmail },
            orderBy: [{ date: 'desc' }, { createdAt: 'desc' }]
        })
    }),

    getTransactionById: privateProcedure.input(z.string().min(1)).query(async ({ ctx, input }) => {
        return db.transaction.findFirst({
            where: { user: ctx.userEmail, id: input }
        })
    }),

    createTransaction: privateProcedure.input(z.object({
        receiver: z.string().min(1),
        amount: z.coerce.number().min(0),
        method: z.string().min(1),
        category: z.string().min(1),
        date: z.date().max(new Date()),
        description: z.string().max(100)
    })).mutation(async ({ ctx, input }) => {
        await db.transaction.create({
            data: { ...input, user: ctx.userEmail }
        })
        return { success: true }
    }),

    removeTransaction: privateProcedure.input(z.string().min(1)).mutation(async ({ ctx, input }) => {
        try {
            await db.transaction.delete({
                where: { id: input, user: ctx.userEmail }
            })
            return { success: true }
        } catch {
            throw new TRPCError({ code: "NOT_FOUND" })
        }
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;