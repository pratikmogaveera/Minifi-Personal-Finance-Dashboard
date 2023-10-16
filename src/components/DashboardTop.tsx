import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Transaction } from '@prisma/client'
import { IndianRupee } from "lucide-react"
import React, { Dispatch, SetStateAction } from 'react'
import { Skeleton } from "./ui/skeleton"

import { Button } from "@/components/ui/button"
import { chartRangeList } from "@/lib/utils"

type ChartType = "line" | "bar"
type ChartRangeType = "1 month" | "6 months" | "1 Year" | "Max"

type DashboardTopPros = {
    data: Transaction[],
    isLoading: boolean,
    setChartType: Dispatch<SetStateAction<ChartType>>
    chartType: ChartType
    setChartRange: Dispatch<SetStateAction<ChartRangeType>>
    chartRange: ChartRangeType
}

const DashboardTop = ({ data, isLoading, chartType, setChartType, chartRange, setChartRange }: DashboardTopPros) => {
    const [totalSpend, setTotalSpend] = React.useState(0)

    React.useEffect(() => {
        if (data) {
            let spend = 0
            data.map(item => spend += item.amount)
            setTotalSpend(spend)
        }
    }, [data])

    const amount = parseFloat(totalSpend.toString())
    const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    }).format(amount)

    return (
        <div className="flex sm:flex-col gap-4 justify-center sm:items-stretch">
            <div className="flex flex-col gap-2">
                <ChartSelector setChartType={setChartType} />
                <RangeSelector setChartRange={setChartRange} />
            </div>
            <div className="flex w-fit justify-self-end rounded-lg bg-background p-2 sm:p-8 items-center">
                <div className="hidden sm:block aspect-square bg-foreground p-2 rounded-lg">
                    <span className=" border-2 border-background aspect-square flex p-2 text-background rounded-full">
                        <IndianRupee className="h-8 w-8" />
                    </span>
                </div>
                <div className="flex flex-col text-background h-full w-fit sm:w-[130px] px-2 sm:px-4 justify-center">
                    <span className="text-sm text-foreground/70">Total Expense</span>
                    <h1 className="text-2xl font-bold text-foreground flex items-center gap-1">
                        {isLoading
                            ? <Skeleton className='w-full h-[24px] rounded-lg' />
                            :
                            <p>
                                <span className='text-xl'>{formatted.slice(0, -3)}</span>
                                <span className='text-sm text-foreground/70'>{formatted.slice(-3)}</span>
                            </p>
                        }
                    </h1>

                </div >
            </div >
        </div>
    )
}

const ChartSelector = ({ setChartType }: { setChartType: Dispatch<SetStateAction<ChartType>> }) => {
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="lg">
                {"Select Chart"}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Chart Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setChartType("line")}>
                Individual
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setChartType("bar")}>
                By Month
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}
const RangeSelector = ({ setChartRange }: { setChartRange: Dispatch<SetStateAction<ChartRangeType>> }) => {
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="lg">
                Select Range
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Chart Range</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {chartRangeList.map(item =>
                <DropdownMenuItem key={item} onClick={() => setChartRange(item)}>
                    {item}
                </DropdownMenuItem>)}
        </DropdownMenuContent>
    </DropdownMenu>
}

export default DashboardTop