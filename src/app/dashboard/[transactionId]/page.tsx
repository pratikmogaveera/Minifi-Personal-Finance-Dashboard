import TransactionDetails from "@/components/TransactionDetails"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

type Params = {
    params: {
        transactionId: string
    }
}

const page = ({ params }: Params) => {
    const { getUser } = getKindeServerSession()
    const user = getUser()
    const { transactionId } = params

    if (!user || !user.id)
        redirect(`/auth-callback?origin=dashboard/${transactionId}`)

    return (
        <TransactionDetails transactionId={transactionId} />
    )
}

export default page