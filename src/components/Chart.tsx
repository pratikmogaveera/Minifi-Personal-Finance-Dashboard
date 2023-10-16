import { getChartRangeDate } from '@/lib/utils';
import { Transaction } from '@prisma/client';
import { format } from 'date-fns';
import useMeasure from 'react-use-measure';
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

type map = {
    [index: string]: number
}

type ChartType = "line" | "bar"
type ChartRangeType = "1 month" | "6 months" | "1 Year" | "Max"

interface ChartProps {
    data: Transaction[],
    chartType: ChartType,
    chartRange: ChartRangeType
}

const Chart = ({ data, chartType, chartRange }: ChartProps) => {

    return (
        <div className='flex flex-col flex-1'>
            {data?.length ? chartType === 'bar'
                ? <BarChartComp data={data?.filter(item => item.date.getTime() > getChartRangeDate(chartRange).getTime())} />
                : <LineChartComp data={data?.filter(item => item.date.getTime() > getChartRangeDate(chartRange).getTime())} />
                : <p className='flex justify-center text-muted-foreground'>Add a transaction to begin.</p>
            }
        </div>
    )
}

const LineChartComp = ({ data }: { data: Transaction[] }) => {
    const [ref, bounds] = useMeasure()

    let dataMod: Transaction[] = []
    if (data) dataMod = data.map(item => item) // Creating deep copy of data.

    return (
        <div className='text-foreground w-full min-h-[15rem] flex-1' ref={ref}>
            {data && data.length &&
                <LineChart width={bounds.width} height={bounds.height} data={dataMod.sort((a, b) => a.date.getTime() - b.date.getTime())} margin={{ top: 20, right: 10, bottom: -5, left: -30 }}>
                    <YAxis fontSize={10} />
                    <Line type="monotone" dataKey="amount" stroke="currentColor" strokeWidth={2} />
                    <XAxis dataKey="receiver" fontSize={10} padding={{ left: 20, right: 20 }} />
                </LineChart>}
        </div>
    )
}

const BarChartComp = ({ data }: { data: Transaction[] }) => {
    const [ref, bounds] = useMeasure()
    let db: map = {}

    // Grouping amount spend based on months.
    if (data) data.forEach(item => {
        if (Object.keys(db).includes(format(item.date, "MMM yy"))) {
            db[format(item.date, "MMM yy")] += item.amount
        } else {
            db[format(item.date, "MMM yy")] = item.amount
        }
    })

    const dataMod = Object.keys(db).map(item => ({ month: item, amount: db[item] }))

    return (
        <div className='text-foreground w-full min-h-[15rem] flex-1' ref={ref}>
            {data && data.length &&
                <BarChart width={Math.min(dataMod.length * 200, bounds.width)} height={bounds.height} data={dataMod.reverse()} margin={{ top: 20, right: 10, bottom: -5, left: -30 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <YAxis fontSize={10} />
                    <Bar dataKey="amount" fill="currentColor" barSize={bounds.width > 500 ? 50 : undefined} />
                    <XAxis dataKey="month" fontSize={10} padding={{ left: 20, right: 20 }} />
                </BarChart>}
        </div>
    )
}

export default Chart