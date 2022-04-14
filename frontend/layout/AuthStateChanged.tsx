import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import AuthService from "../services/AuthService"

type Props = {
    children: React.ReactNode
}

export default function AuthStateChanged({ children }: Props): React.ReactNode {
    const { setUser } = useAuth()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        AuthService.waitUserStateChange((user: any) => { setUser(user); setLoading(false) })
        //eslint-disable-next-line
    }, [])

    if (loading) {
        return <h1>Loading...</h1>
    }

    return children
}