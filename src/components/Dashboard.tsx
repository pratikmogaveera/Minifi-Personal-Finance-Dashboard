"use client"
import { trpc } from "@/app/_trpc/client"
import { Ghost, Loader2 } from "lucide-react"
import { useState } from "react"
import AddTransactionDialog from "./AddTransactionDialog"
import Chart from "./Chart"
import DashboardTop from "./DashboardTop"
import TransactionsTable from "./TransactionsTable"


type ChartType = "line" | "bar"
type ChartRangeType = "1 month" | "6 months" | "1 Year" | "Max"

const Dashboard = () => {
    const { data, isLoading } = trpc.getTransactions.useQuery()
    const [chartType, setChartType] = useState<ChartType>("line")
    const [chartRange, setChartRange] = useState<ChartRangeType>("Max")

    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10 bg-background rounded-lg mt-10">

            <div className="min-h-[15rem] w-[full] rounded-lg flex flex-col sm:flex-row justify-between gap-4 p-4 sm:items-center bg-neutral-100 dark:bg-neutral-900 shadow-sm">
                <Chart data={data!} chartType={chartType} chartRange={chartRange} />
                <DashboardTop data={data!} isLoading={isLoading} setChartType={setChartType} setChartRange={setChartRange} chartType={chartType} chartRange={chartRange} />
            </div>

            <div className="flex items-center justify-between mt-10 ">
                <h1 className="text-3xl sm:text-5xl font-bold">Transactions</h1>
                <AddTransactionDialog />
            </div>

            <div className="w-full mt-5">
                {data && data.length
                    ? <TransactionsTable data={data} />
                    : isLoading ? (
                        <p className=" flex justify-center gap-2 items-center"><span className="animate-spin"><Loader2 /></span>Waiting for data...</p>
                    ) : (
                        <div className="flex flex-col justify-center items-center">
                            <Ghost />
                            <p>Pretty empty around here</p>
                            <p className="mt-5">Add your frist transaction by clicking the &apos;+&apos; button.</p>
                        </div>
                    )
                }
            </div>


        </main>
    )
}


export default Dashboard