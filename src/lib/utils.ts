import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { addMonths } from "date-fns"
import { Metadata } from "next"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
    if (typeof window !== 'undefined') return path
    if (process.env.VERCEL_URL)
        return `https://${process.env.VERCEL_URL}${path}`
    return `http://localhost:${process.env.PORT ?? 3000
        }${path}`
}

export function constructMetadata({
    title = "MiniFi - Your Personal Finance Tracking App",
    description = "MiniFi is a free expenses tracking and analysing webapp made to make your life easy.",
    image = "/thumbnail.png",
    icons = "/favicon.ico",
    noIndex = false
}: {
    title?: string,
    description?: string,
    image?: string,
    icons?: string,
    noIndex?: boolean
} = {}): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: "@ipratikmoga"
        },
        icons,
        metadataBase: new URL('https://minifi.vercel.app'),
        themeColor: "#010101",
        ...(noIndex && {
            robots: {
                index: false,
                follow: false
            }
        })
    }
}

export const categoriesList: string[] = ["General", "Clothes", "Electronics", "Entertainment", "Food", "Health", "Home", "Personal", "Travel"]

export const methodsList: string[] = ["Cash", "Credit", "Debit", "UPI"]

export const chartRangeList: ChartRangeType[] = ["1 month", "6 months", "1 Year", "Max"]

type ChartRangeType = "1 month" | "6 months" | "1 Year" | "Max"
export function getChartRangeDate(chartRange: ChartRangeType): Date {
    const current = new Date()

    if (chartRange === "1 month")
        return addMonths(current, -1)
    else if (chartRange === "6 months")
        return addMonths(current, -6)
    else if (chartRange === "1 Year")
        return addMonths(current, -12)
    else
        return new Date("2000")
}