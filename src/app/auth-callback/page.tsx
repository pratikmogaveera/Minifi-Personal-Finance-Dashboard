"use client"
import { Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { trpc } from "../_trpc/client"

const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')

    trpc.authCallback.useQuery(undefined, {
        onSuccess: ({ success }) => {
            if (success)
                // User is synced to database.
                // Redirect to origin
                router.push(origin ? `/${origin}` : "/dashboard")
        },
        onError: (err) => {
            if (err.data?.code === 'UNAUTHORIZED') {
                router.push("/api/auth/register")
            }
        },
        retry: false,
    })
    return (
        <div className="w-full mt-24 flex justify-center">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-foreground" />
                <h3 className="font-bold text-xl">Looking for your information...</h3>
                <p>You will be redirected automatically.</p>
            </div>
        </div>
    )
}

export default Page