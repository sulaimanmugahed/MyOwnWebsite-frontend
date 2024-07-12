import { useMutation } from "@tanstack/react-query"
import { LoginRequest, RegisterRequest } from "../utils/types/AccountTypes"
import { client } from "../utils/client"
import { useAuth } from "./UseAuth"
import { toast } from "sonner"
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase"
import { useTranslation } from "react-i18next"


export const useExternalLogin = () => {
    const provider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const { t } = useTranslation()
    const { logUserIn } = useAuth()

    const { mutate: sendGoogleAuth } = useMutation({
        mutationFn: async (token: string) => {
            return (await client.post('account/googleAuth', { token: token }))?.data?.data
        },
        retry: 3,

        onSuccess: (response) => {
            logUserIn(response.roles, response.accessToken)
            return toast(t('welcome_message', { name: response.name }))
        },
        onError: () => toast.error(t('some_errors_happened'))

    })

    const { mutate: sendGithubAuth } = useMutation({
        mutationFn: async (token: string) => {
            return (await client.post('account/githubAuth', { token: token }))?.data?.data
        },
        retry: 3,
        onSuccess: (response) => {
            logUserIn(response.roles, response.accessToken)
            return toast(t('welcome_message', { name: response.name }))
        },
        onError: () => toast.error(t('some_errors_happened'))

    })

    function signInGoogle() {
        signInWithPopup(firebaseAuth, provider).then((result) => {
            return result.user.getIdToken();
        }).then(async (token) => {
            sendGoogleAuth(token!);
        })
    }

    function signInGithub() {
        signInWithPopup(firebaseAuth, githubProvider).then((result) => {
            return result.user.getIdToken();

        }).then(async (token) => {
            sendGithubAuth(token!);
        })
    }

    return {
        signInGoogle,
        signInGithub
    }


}

export const useLogin = () => {

    const { logUserIn } = useAuth()
    const { t } = useTranslation()
    return useMutation({

        mutationFn: async (data: LoginRequest) => {
            return (await client.post('account/login', data))?.data?.data
        },
        onSuccess: response => {
            logUserIn(response.roles, response.accessToken)
            return toast(t('welcome_message', { name: response.name }))
        },
        retry: 3,
        onError: _ => toast.error(t('some_errors_happened'))
    })
}

export const useRegister = () => {
    const { t } = useTranslation()

    return useMutation({
        mutationFn: async (registerRequest: RegisterRequest) => {
            return (await client.post('account/register', registerRequest))?.data?.data
        },
        onSuccess: (_response) => {
            return toast.success(t('register_complete_successfully'))
        },
        retry: 3,
        onError: _ => toast.error(t('some_errors_happened'))


    })
}