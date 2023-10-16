import { LoginLink, RegisterLink, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import UserIcon from "./UserIcon"
import DarkMode from "./ui/DarkMode"
import { buttonVariants } from "./ui/button"
import { ArrowRight } from 'lucide-react'

const Navbar = () => {
    const { getUser } = getKindeServerSession()
    const user = getUser()
    return (
        <nav className="sticky h-16 inset-x-0 top-0 z-30 w-full border-b border-foreground/20 bg-background/75 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="text-brand text-xl flex z-40 font-bold">
                        MiniFi
                    </Link>

                    <div className="flex gap-2 md:gap-4 items-center">
                        {user?.id
                            ?
                            <div className="flex gap-2 md:gap-4 items-center">
                                <Link href='/dashboard' className={buttonVariants({ variant: "outline" })}>
                                    Dashboard
                                </Link>
                                <div className='flex gap-2 items-center'>
                                    <UserIcon />
                                    <h1 className="hidden lg:block text-muted-foreground">{user.given_name}</h1>
                                </div>
                            </div>
                            :
                            <div className="flex gap-2 md:gap-4 items-center">

                                <LoginLink className={buttonVariants({ variant: "secondary", size: "sm", className: "text-foreground" })} >
                                    Sign in
                                </LoginLink>
                                <RegisterLink className="hidden sm:flex px-3 py-2 bg-brand text-background text-sm font-bold rounded-lg">
                                    Register
                                </RegisterLink>
                            </div>
                        }
                        <DarkMode />
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}

export default Navbar