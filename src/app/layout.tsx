import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import ThemeProvider from '@/components/ui/theme-provider'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "sonner"
import Footer from '@/components/Footer'
import { constructMetadata } from '@/lib/utils'


export const metadata = constructMetadata()

type RootPros = {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootPros) {
    return (
        <html lang="en" suppressHydrationWarning>
            <Providers>
                <body className={cn("min-h-screen antialiased bg-background grainy text-foreground")}>
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