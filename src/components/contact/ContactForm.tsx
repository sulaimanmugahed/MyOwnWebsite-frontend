
import { Box, TextField, TextFieldProps } from "@mui/material"
import { RoundedTextField } from "../common/RoundedTextField"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContactMe } from "../../hooks/ContactHooks"
import LoadingButton from '@mui/lab/LoadingButton';
import { ContactFormScheme } from "../../utils/zod-validations-scheme"
import { useTranslation } from "react-i18next"

type RoundedTextAreaProps = {
    register?: unknown
}

export const RoundedTextArea = ({ register, ...props }: Omit<TextFieldProps, 'variant'> & RoundedTextAreaProps) => {

    const { i18n } = useTranslation()


    return (
        <TextField {...props}
            variant='filled'
            multiline
            fullWidth
            {...(register ?? {})}
            InputLabelProps={i18n.resolvedLanguage === 'ar' ? {
                sx: {
                    transformOrigin: "right !important",
                    left: "inherit !important",
                    right: "1.75rem !important",
                    fontSize: "small",
                    fontWeight: 400,
                    overflow: "unset",
                }
            } : undefined}
            FormHelperTextProps={
                {
                    sx: {
                        textAlign: i18n.resolvedLanguage === 'ar' ? 'right' : 'left'
                    }
                }
            }
            InputProps={{
                sx: {
                    borderRadius: '20px',
                    scrollbarGutter: 'inherit',
                    width: { xs: '300px', sm: '400px', md: '400px' }
                }, disableUnderline: true
            }} >{props.children}</TextField>
    )
}






export const ContactForm = () => {

    type ContactFormValues = z.infer<typeof ContactFormScheme>


    const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
        resolver: zodResolver(ContactFormScheme),
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        }
    })


    const { send, isPending } = useContactMe()

    const { t } = useTranslation()


    const onSubmit = (data: ContactFormValues) => {

        send(data, { onSuccess: () => reset() })



    }
    return (

        <Box noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} component={'form'}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                direction: 'rtl'
            }}>
            <RoundedTextField
                label={t('name')}
                id="name"
                register={register('name')}
                {...register('name')}
                error={!!errors.name}
                helperText={t(errors.name?.message!)} />
            <RoundedTextField
                label={t('email')}
                id="email"
                register={register('email')}
                error={!!errors.email}
                helperText={t(errors.email?.message!)} />
            <RoundedTextField
                label={t('subject')}
                id="subject"
                register={register('subject')}
                error={!!errors.subject}
                helperText={t(errors.subject?.message!)} />
            <RoundedTextArea
                rows={5}
                label={t('message')}
                id="message"
                register={register('message')}
                error={!!errors.message}
                helperText={t(errors.message?.message!)} />
            <LoadingButton loading={isPending} type="submit" size='large' variant='contained' sx={{ borderRadius: '30px', width: '180px', color: 'inherit' }}>{t('send-email')}</LoadingButton>
        </Box>


    )
}
