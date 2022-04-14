import { User } from "firebase/auth"
import { useRouter } from "next/router"
import React, { createContext, ReactElement, ReactNode, useContext, useState } from "react"
import AuthService from "../services/AuthService"

type AuthContextType = {
    user: User | null,
    error: unknown | string,
    login: (email: string, password: string) => void,
    logout: () => void,
    register: (email: string, password: string) => void,
    setUser: (value: User) => void,
    resetPassword: (email: string) => void,
    updatePassword: (password: string, newPassword: string) => void
}

const AuthContextDefaultValues: AuthContextType = {
    user: null,
    error: "",
    login: () => {},
    logout: () => {},
    register: () => {},
    setUser: () => {},
    resetPassword: () => {},
    updatePassword: () => {}
}

const AuthContext = createContext<AuthContextType>(AuthContextDefaultValues)

export default function useAuth() {
    return useContext(AuthContext)
}

type Props = {
    children: ReactNode
}

export function AuthProvider ({ children }: Props): ReactElement {
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<string | any>("")

    const router = useRouter()
    const pathname = router.pathname

    const logout = async () => {
        await AuthService.logout()
        setUser(null)
    }

    const register = async (email: string, password: string) => {
        if (email && password) {
            const { error, user } = await AuthService.register(email, password)

            if (error) {
                setError({[pathname]: error})
                return
            }
            setUser(user ?? null)
        } else {
            setError({[pathname]: "empty credentials"})
        }
    }

    const login = async (email: string, password: string) => {
        if (email && password) {
            const { error, user } = await AuthService.login(email, password)

            if (error) {
                setError({[pathname]: error})
                return
            }
            setUser(user ?? null)
            router.push("/")
        } else {
            setError({[pathname]: "emptry credentials"})
        }
    }

    const resetPassword = async (email: string) => {
        if (email) {
            const error = await AuthService.resetPassword(email)
            if (error) {
                setError({[pathname] : error})
                return
            }
        } else {
            setError({[pathname]: "empty email"})
        }
    }

    const updatePassword = async (confirmPassword: string, password: string) => {
        if (confirmPassword === password) {
            const error = await AuthService.updatePassword(password)
            setError({[pathname]: error})
        } else {
            setError({[pathname]: "credentials don't match"})
        }
    }

    const value = {
        user,
        error,
        login,
        logout,
        register,
        resetPassword,
        updatePassword,
        setUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
