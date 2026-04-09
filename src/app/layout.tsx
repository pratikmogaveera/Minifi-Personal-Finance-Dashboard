import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import ThemeProvider from '@/components/ui/theme-provider'
import { cn } from '@/lib/utils'
import { Lato } from 'next/font/google'
import './globals.css'
import { Toaster } from "sonner"
import Footer from '@/components/Footer'
import { constructMetadata } from '@/lib/utils'

const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700'], display: 'swap' })

export const metadata = constructMetadata()

type RootPros = {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootPros) {
    return (
        <html lang="en" suppressHydrationWarning>
            <Providers>
                <body className={cn(lato.className, "min-h-screen antialiased bg-background grainy text-foreground")}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Navbar />
                        {children}
                        <Toaster richColors />
                        <Footer />
                    </ThemeProvider>
                </body>
            </Providers>
        </html>
    )
}