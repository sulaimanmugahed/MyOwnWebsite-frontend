import { Box, IconButton, Tooltip } from "@mui/material"
import { RoundedTextField } from "../common/RoundedTextField"
import { RegisterRequest } from "../../utils/types/AccountTypes"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerFormValidationSchema } from "../../utils/zod-validations-scheme"
import { useExternalLogin, useRegister } from "../../hooks/AccountHooks"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import LoadingButton from "@mui/lab/LoadingButton"
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTranslation } from "react-i18next"

type RegisterFormValues = {
    confirmPassword: string
} & RegisterRequest

export const RegisterForm = () => {

    const [userEmail, setUserEmail] = useState('')
    const { signInGithub, signInGoogle } = useExternalLogin()

    const navigate = useNavigate()

    const registerForm = useForm<RegisterFormValues>({
        defaultValues: {
            name: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        },
        resolver: zodResolver(registerFormValidationSchema),
        mode: 'onBlur'

    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = registerForm

    const { mutate, isSuccess, isPending } = useRegister()

    const onSubmit = (formValues: RegisterFormValues) => {
        const request: RegisterRequest = {
            email: formValues.email,
            name: formValues.name,
            username: formValues.username,
            password: formValues.password
            // ...formValues
        }

        setUserEmail(formValues.email)

        mutate(request)
    }

    useEffect(() => {
        if (isSuccess) navigate(`/confirm/${userEmail}`, { replace: true })
    }, [isSuccess])

    const { t } = useTranslation()


    return (

        <Box
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            component={'form'}
            autoComplete="off"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px'
            }}>
            <RoundedTextField
                label={t('full-name')}
                id="name"
                register={register('name')}
                error={!!errors.name}
                helperText={t(errors.name?.message!)} />

            <RoundedTextField
                label={t('email')}
                id="email"
                register={register('email')}
                error={!!errors.email}
                helperText={t(errors.email?.message!)} />

            <RoundedTextField
                label={t('username')}
                id="username"
                register={register('username')}
                error={!!errors.username}
                helperText={t(errors.username?.message!)} />

            <RoundedTextField
                label={t('password')}
                id="password"
                type='password'
                register={register('password')}
                error={!!errors.password}
                helperText={t(errors.password?.message!)} />

            <RoundedTextField
                label={t('confirm-password')}
                id="confirmPassword"
                type='password'
                register={register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={t(errors.confirmPassword?.message!)} />

            <Box>
                <Tooltip title='Continue with Google'>
                    <IconButton onClick={signInGoogle}><GoogleIcon /></IconButton>
                </Tooltip>
                <Tooltip title='Continue with Github'>
                    <IconButton onClick={signInGithub} ><GitHubIcon /></IconButton>
                </Tooltip>
            </Box>

            <LoadingButton loading={isPending} type="submit" size='large' variant='contained' sx={{ borderRadius: '30px', width: '180px', color: 'text.primary' }}>{t('sign-up')}</LoadingButton>
        </Box>


    )
}
