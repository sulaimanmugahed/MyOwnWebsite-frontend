import { Box, Typography } from "@mui/material"
import { LoginForm } from "./LoginForm"
import { AppModal } from "../common/AppModal"
import { useLocation, useNavigate } from "react-router-dom"
import { AppLink } from "../common/AppLink"
import { useTranslation } from "react-i18next"

export const LoginModal = () => {

    const navigate = useNavigate()

    const location = useLocation()


    const handelCloseButton = () => {
        navigate(-1)
    }
    const { t } = useTranslation()



    return (
        <AppModal closeButton height="auto" width={{
            xs: '90%',
            md: '40%'
        }} handelCloseButton={handelCloseButton} open={location.pathname === '/login'} >

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 2,
                    p: '16px'
                }}>
                <Typography color={'text.primary'} mb={2} variant="h6">{t('login')}</Typography>
                <LoginForm />
                <Typography color={'text.secondary'} variant="body2">{t('you-not-have-account')}
                    <AppLink replace underline='none' href={'/register'}><Typography color={'primary'} component={'span'}> {t('sign-up')}</Typography></AppLink></Typography>

            </Box>
        </AppModal>


    )
}
