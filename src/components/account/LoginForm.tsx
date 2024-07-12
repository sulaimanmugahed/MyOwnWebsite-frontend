import { Box, IconButton, Tooltip } from '@mui/material'
import { useForm } from 'react-hook-form';
import { RoundedTextField } from '../common/RoundedTextField';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormValidationSchema } from '../../utils/zod-validations-scheme';
import { LoginRequest } from '../../utils/types/AccountTypes';
import { useExternalLogin, useLogin } from '../../hooks/AccountHooks';
import { useSearchParams } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';







type LoginFormValues = {
} & LoginRequest

export const LoginForm = () => {

    const { signInGithub, signInGoogle } = useExternalLogin()
    const [params] = useSearchParams()

    const loginForm = useForm<LoginFormValues>({
        defaultValues: {
            username: params.get('email') || '',
            password: ''
        },
        resolver: zodResolver(loginFormValidationSchema),
        mode: 'onChange'
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = loginForm


    const { mutate, isPending } = useLogin()

    const onSubmit = (formData: LoginFormValues) => {
        mutate(formData)
    }

    const { t } = useTranslation()

    return (

        <Box
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            component={'form'}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px'
            }}>

            <RoundedTextField
                id='username'
                label={t('username')}
                register={register('username')}
                error={!!errors.username}
                helperText={errors.username?.message} />
            <RoundedTextField
                id='password'
                label={t('password')}
                type='password'
                register={register('password')}
                error={!!errors.password}
                helperText={errors.password?.message} />
            <Box>
                <Tooltip title='Continue with Google'>
                    <IconButton onClick={signInGoogle}><GoogleIcon /></IconButton>

                </Tooltip>
                <Tooltip title='Continue with Github'>
                    <IconButton onClick={signInGithub} ><GitHubIcon /></IconButton>
                </Tooltip>

            </Box>
            <LoadingButton loading={isPending} type='submit' size='large' variant='contained' sx={{ borderRadius: '30px', width: '180px', color: 'text.primary' }}>{t('login')}</LoadingButton>

        </Box>

    )
}
