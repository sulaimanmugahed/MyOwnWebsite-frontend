
import { useAuth } from "./UseAuth"
import { client } from "../utils/client"

export const useRefreshToken = () => {

    const { setAccessToken, setRoles, setIsAuthenticated } = useAuth()

    const refreshToken = async () => {
        try {
            const { accessToken, roles } = await client
                .get('account/refreshToken')
                .then(response => response.data.data)

            setAccessToken(accessToken)
            setRoles(roles)
            setIsAuthenticated(true)
            return accessToken;
        }
        catch (error) {
            return null
        }
    }

    return refreshToken

}
