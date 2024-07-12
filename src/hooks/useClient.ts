

import { useLayoutEffect } from "react";
import { client } from "../utils/client";
import { useRefreshToken } from "./UseRefreshToken";
import { useAuth } from "./UseAuth";

const useClient = () => {
    const refresh = useRefreshToken();
    const { accessToken, logUserOut } = useAuth();

    useLayoutEffect(() => {
        const requestIntercept = client.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`
                }
                return config;
            },
            (error) => Promise.reject(error)
        )

        const responseIntercept = client.interceptors.response.use(
            response => response,
            async (error) => {

                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    const newAccessToken = await refresh();
                    if (newAccessToken) {
                        prevRequest.sent = true;
                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return client(prevRequest);
                    }
                    else {
                        logUserOut()
                    }

                }
                return Promise.reject(error);
            }
        )

        return () => {
            client.interceptors.request.eject(requestIntercept)
            client.interceptors.response.eject(responseIntercept)
        }

    }, [accessToken, refresh])

    return client;
}

export default useClient

