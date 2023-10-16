import { Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'

const Footer = () => {
    return (
        <footer className='h-48 mt-32 bg-background/75 backdrop-blur-lg relative border-t border-muted-foreground/10'>
            <MaxWidthWrapper>
                <div className='flex h-48 w-full items-center'>
                    <div className='flex flex-col gap-2 items-center'>
                        <Link href="/" className="text-brand text-xl flex z-40 font-bold">
                            MiniFi
                        </Link>

                        <div className='flex gap-2'>
                            <Link className={buttonVariants({ size: "icon", variant: "outline", className: "group" })} href="https://linkedin.com/in/pratikmogaveera" target='_blank' ><Linkedin target='_blank' className='text-muted-foreground group-hover:text-brand h-5 w-5' /></Link>
                            <Link className={buttonVariants({ size: "icon", variant: "outline", className: "group" })} href="https://github.com/pratikmogaveera" target='_blank' ><Github className='text-muted-foreground group-hover:text-brand h-5 w-5' /></Link>
                            <Link className={buttonVariants({ size: "icon", variant: "outline", className: "group" })} href="mailto:pratikmogaveera@gmail.com" ><Mail className='text-muted-foreground group-hover:text-brand h-5 w-5' /></Link>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </footer >
    )
}

export default Footer