import { Context, createContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { client } from "../utils/client"

type AuthContextType = {
    isAuthenticated: boolean
    roles: string[] | null
    accessToken: string | null
    logUserIn: (roles: string[], accessToken: string) => void
    logUserOut: () => void
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
    setRoles: React.Dispatch<React.SetStateAction<string[] | null>>
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

type AuthContextPropType = {
    children: React.ReactNode
}

export const AuthContext: Context<AuthContextType | null> =
    createContext<AuthContextType | null>(null)

export const AppAuthProvider = ({ children }: AuthContextPropType) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [roles, setRoles] = useState<string[] | null>(null)
    const [accessToken, setAccessToken] = useState<string | null>(null)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const logUserIn = (roles: string[], accessToken: string) => {
        setIsAuthenticated(true)
        setRoles(roles)
        setAccessToken(accessToken)
        navigate(from, { replace: true })
    }

    const signOut = async () => {
        try {
            const response = await
                client.post('account/signOut').then(res => res.data.data)
            return response
        } catch (error) {
            return error
        }
    }

    const logUserOut = () => {
        setIsAuthenticated(false)
        setRoles(null)
        setAccessToken(null)
        signOut()
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, roles, accessToken, logUserIn, logUserOut, setAccessToken, setRoles, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}