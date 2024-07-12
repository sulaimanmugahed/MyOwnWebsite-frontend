import { AppModal } from '../common/AppModal'
import { Box, Typography } from '@mui/material'
import { RegisterForm } from './RegisterForm'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppLink } from '../common/AppLink'
import { useTranslation } from 'react-i18next'

export const RegisterModal = () => {

    const navigate = useNavigate()

    const location = useLocation()
    const { t } = useTranslation()

    const handelCloseButton = () => {
        navigate(-1)
    }

    return (
        <AppModal height="auto" closeButton width={{
            xs: '90%',
            md: '40%'
        }} handelCloseButton={handelCloseButton} open={location.pathname === '/register'} >

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 2,

                    p: '16px'
                }}>
                <Typography color={'text.primary'} mb={2} variant="h6">{t('sign-up')}</Typography>
                <RegisterForm />
                <Typography color={'text.secondary'} mb={2} variant="body2">{t('you-have-account')}
                    <AppLink replace underline='none' href={'/login'}><Typography color={'primary'} component={'span'}> {t('login')}</Typography></AppLink></Typography>

            </Box>
        </AppModal>
    )
}
