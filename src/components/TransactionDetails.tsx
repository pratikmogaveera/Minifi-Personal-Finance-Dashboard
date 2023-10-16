"use client"
import { trpc } from "@/app/_trpc/client"
import { format } from "date-fns"
import { ArrowLeftIcon, Ghost, Loader2 } from "lucide-react"
import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from "./ui/button"

const TransactionDetails = ({ transactionId }: { transactionId: string }) => {
    const { data, isLoading } = trpc.getTransactionById.useQuery(transactionId)

    return (
        <MaxWidthWrapper className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-2">
            <Link href="/dashboard" className={buttonVariants({ variant: "ghost", size: "icon", className: "self-start" })}><ArrowLeftIcon className="h-6 w-6" /></Link>

            {data
                ? <Details data={data} />
                : isLoading ? (
                    <p className=" flex justify-center gap-2 items-center"><span className="animate-spin"><Loader2 /></span>Waiting for data...</p>
                ) : (
                    <div className="flex flex-col justify-center items-center">
                        <Ghost />
                        <p>Pretty empty around here</p><p className="mt-5">Add your frist transaction by clicking the &apos;+&apos; button.</p>
                    </div>
                )
            }
        </MaxWidthWrapper>
    )
}

type DataType = {
    id: string;
    user: string;
    receiver: string;
    amount: number;
    method: string,
    category: string;
    description: string | null;
    date: Date;
    createdAt: Date;
}

const Details = ({ data }: { data: DataType }) => {

    const amount = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    }).format(data.amount)

    const description = data.description?.length ? data.description : "-"

    return (
        <div className="grid gap-1 bg-neutral-100 dark:bg-neutral-900 rounded-lg p-4 pb-8 sm:p-8 w-full sm:max-w-[500px]">
            <div className="flex flex-col items-center bg-background p-4 rounded-lg">
                <h1 className="text-3xl sm:text-5xl font-bold truncate">{data.receiver}</h1>
                <h2 className="text-muted-foreground sm:text-lg font-bold">{format(new Date(data.date), "PP")}</h2>
                <h3 className="text-brand text-4xl font-bold">{amount}</h3>
            </div>
            <div className="flex flex-col gap-2 mt-10">
                <div className="flex justify-between gap-4 items-center">
                    <h3 className="text-muted-foreground">Category</h3>
                    <h3>{data.category}</h3>
                </div>
                <div className="flex justify-between gap-4 items-center">
                    <h3 className="text-muted-foreground">Method</h3>
                    <h3>{data.method}</h3>
                </div>
                <div className="flex justify-between gap-4 items-center">
                    <h3 className="text-muted-foreground">Description</h3>
                    <h3>{description}</h3>
                </div>
            </div>
        </div>
    )
}

export default TransactionDetails