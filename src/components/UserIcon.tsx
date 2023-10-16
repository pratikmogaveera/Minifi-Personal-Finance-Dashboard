import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { User } from "lucide-react"
import { Button } from "./ui/button"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

const UserIcon = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <User />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="/dashboard">
                        Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LogoutLink>
                        Logout
                    </LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserIcon