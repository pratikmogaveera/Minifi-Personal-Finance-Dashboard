import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ArrowRight, Hourglass, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <MaxWidthWrapper className="relative z-10 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
                <div className="mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur pointer-events-none">
                    <p className="text-sm font-bold text-black">MiniFi is now public!</p>
                </div>

                <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl text-foreground">
                    Simplify Your <span className="hero-text-gradient">Finances</span>, Amplify Your <span className="hero-text-gradient">Life</span>.
                </h1>

                <p className="mt-5 max-w-prose text-sm leading-tight text-foreground/70 sm:text-lg">
                    Transform your financial journey with our personal finance dashboard. <br className="hidden md:block" /> Gain real-time insights, track expenses seamlessly, and manage budgets intuitively, all in one place.
                </p>

                <Link href='/dashboard' className="flex items-center gap-2 mt-5 px-3 py-2 bg-brand text-background text-xl font-bold  rounded-lg">
                    Get Started <ArrowRight className="h-7 w-7" />
                </Link>
            </MaxWidthWrapper>

            {/* GRADIENT */}
            <div>
                <div className='relative isolate'>
                    <div
                        aria-hidden='true'
                        className='pointer-events-none absolute inset-x-0 -top-40 -z-10 sm:-top-80 blur-3xl overflow-hidden'>
                        <div
                            style={{
                                clipPath:
                                    'polygon(44.1% 74.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-[#21B477] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
                        />
                    </div>
                </div>
            </div>


            {/* Dashboard SS */}
            <div className='mx-auto max-w-6xl px-6 lg:px-8 relative z-10'>
                <div className='mt-32 flow-root'>
                    <div className='-m-2 rounded-xl flex bg-foreground/5 p-2 ring-1 ring-inset ring-foreground/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                        <Image
                            src='/dashboard_dark.webp'
                            alt='product preview'
                            width={1364}
                            height={866}
                            quality={100}
                            className='hidden dark:block rounded-md bg-background p-2 sm:p-8 md:p-16 shadow-2xl ring-1 ring-gray-900/10'
                        />
                        <Image
                            src='/dashboard_light.webp'
                            alt='product preview'
                            width={1364}
                            height={866}
                            quality={100}
                            className='dark:hidden rounded-md bg-background p-2 sm:p-8 md:p-16 shadow-2xl ring-1 ring-gray-900/10'
                        />
                    </div>
                </div>
            </div>


            {/* GRADIENT */}
            <div>
                <div className='relative isolate'>
                    <div
                        aria-hidden='true'
                        className='pointer-events-none absolute inset-x-0 -top-40 -z-10 sm:-top-80 blur-3xl overflow-hidden'
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(44.1% 74.1%, 97.5% 62.4%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 62.04% 47.82%, 58.85% 33.5%, 17.9% 39.18%, 23.02% 70.84%, 11.37% 90.21%, 17.9% 100%, 41.46% 82.75%, 76.1% 97.7%, 74.1% 44.1%, 62.4% 38.05%)',
                            }}
                            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] translate-x-1/2 bg-[#21B477] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
                        />
                    </div>
                </div>
            </div >


            <MaxWidthWrapper className="relative z-10 mt-32 flex flex-col items-center justify-center text-center">
                <h1 className="max-w-4xl text-2xl font-bold md:text-4xl lg:text-5xl text-foreground">
                    Start tracking in minutes.
                </h1>
                <p className="mt-5 max-w-prose text-sm leading-tight text-foreground/70 sm:text-lg">Experience the convenience of tracking your finances like never before. Our dashboard empowers you to effortlessly add transactions and view your financial history.</p>
                <div className="mt-16">
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <li className="flex flex-col items-start border-t-2 border-muted-foreground/40 py-2">
                            <span className="text-brand font-bold">Step 1</span>
                            <h3 className="text-xl font-bold my-2">Sign up for an account</h3>
                            <p className="text-muted-foreground text-start leading-tight">Sign up for free and get started in seconds. Your financial journey begins here.</p>
                        </li>
                        <li className="flex flex-col items-start border-t-2 border-muted-foreground/40 py-2">
                            <span className="text-brand font-bold">Step 2</span>
                            <h3 className="text-xl font-bold my-2">Add Transactions</h3>
                            <p className="text-muted-foreground text-start leading-tight">Easily input your expenses. Our user-friendly interface makes tracking your financial activity a breeze.</p>
                        </li>
                        <li className="flex flex-col items-start border-t-2 border-muted-foreground/40 py-2">
                            <span className="text-brand font-bold">Step 3</span>
                            <h3 className="text-xl font-bold my-2">Visualize Your Finances</h3>
                            <p className="text-muted-foreground text-start leading-tight">Gain valuable insights from charts that showcases your spending trends over time.</p>
                        </li>
                    </ul>
                </div>
            </MaxWidthWrapper>


            {/* Add Transaction SS */}
            <div className='mx-auto max-w-6xl px-6 lg:px-8 relative z-10'>
                <div className='mt-32 flow-root'>
                    <div className='-m-2 rounded-xl flex bg-foreground/5 p-2 ring-1 ring-inset ring-foreground/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                        <Image
                            src='/add_transaction_dark.webp'
                            alt='product preview'
                            width={1364}
                            height={866}
                            quality={100}
                            className='hidden dark:block rounded-md bg-background p-2 sm:p-8 md:p-16 shadow-2xl ring-1 ring-gray-900/10'
                        />
                        <Image
                            src='/add_transaction_light.webp'
                            alt='product preview'
                            width={1364}
                            height={866}
                            quality={100}
                            className='dark:hidden rounded-md bg-background p-2 sm:p-8 md:p-16 shadow-2xl ring-1 ring-gray-900/10'
                        />
                    </div>
                </div>
            </div>



            <MaxWidthWrapper className="relative z-10 mt-32 flex flex-col items-center justify-center text-center">

                <ul className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <li className="flex flex-col items-start border-t-2 border-muted-foreground/40 py-2">
                        <div className="flex gap-2 items-center">
                            <Hourglass className="text-brand" />
                            <span className="font-bold my-2">Real-Time Analytics</span>
                        </div>
                        <p className="text-muted-foreground text-start leading-tight">
                            Stay informed with real-time analytics for smarter financial decisions.
                        </p>
                    </li>
                    <li className="flex flex-col items-start border-t-2 border-muted-foreground/40 py-2">
                        <div className="flex gap-2 items-center">
                            <ShieldCheck className="text-brand" />
                            <span className="font-bold my-2">Data Security</span>
                        </div>
                        <p className="text-muted-foreground text-start leading-tight">
                            Your financial data is securely protected, so you can focus on managing your money with confidence.
                        </p>
                    </li>
                    <li className="flex flex-col items-start border-t-2 border-muted-foreground/40 py-2">
                        <div className="flex gap-2 items-center">
                            <Sparkles className="text-brand" />
                            <span className="font-bold my-2">Clean UI</span>
                        </div>
                        <p className="text-muted-foreground text-start leading-tight">
                            Effortlessly manage your finances with our intuitive, clutter-free interface.
                        </p>
                    </li>
                </ul>
            </MaxWidthWrapper>


        </main>
    )
}
