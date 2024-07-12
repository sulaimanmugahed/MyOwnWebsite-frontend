import LoadingButton from "@mui/lab/LoadingButton"
import { Box, Typography } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { client } from "../utils/client"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { useAuth } from "../hooks/UseAuth"
import { useTranslation } from "react-i18next"

export const ConfirmEmailPage = () => {

    const { userEmail } = useParams()

    const { isAuthenticated } = useAuth()
    const { t } = useTranslation()


    const { mutate, isPending } = useMutation({
        mutationFn: async (userEmail: string) => {
            return (await client.get(`account/resendConfirmToken?email=${userEmail}`)).data
        },
        onError: () => toast.error(t('some_thing_went_wrong')),
        onSuccess: () => toast.success(t('confirm_link_sent_success'))
    })


    const handleClick = () => {
        mutate(userEmail!)
    }
    return (

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', textAlign: 'center' }}>
            <Typography color={'text.primary'} variant="h4" gutterBottom component="div">
                {t('confirm_email_message_one')}
            </Typography>
            <Typography sx={{ mb: 2 }} color={'text.secondary'} variant="body1">
                {t('confirm_email_message_tow')}
            </Typography>
            <LoadingButton sx={{ color: 'text.primary' }} loading={isPending} disabled={isAuthenticated} onClick={handleClick} variant="contained" color="primary">
                {t('resend')}
            </LoadingButton>
        </Box>


    )
}
