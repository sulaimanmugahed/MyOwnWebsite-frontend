import { useContext } from "react"
import { AuthContext } from "../providers/AppAuthProvider"

export const useAuth = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        throw new Error('useAuth most be used within an AppAuthProvider')
    }

    return authContext;
}
