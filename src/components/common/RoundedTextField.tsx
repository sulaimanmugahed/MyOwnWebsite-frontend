import { TextField, TextFieldProps } from "@mui/material"
import { useTranslation } from "react-i18next"

type RoundedTextFieldProps = {
    register?: unknown
}

export const RoundedTextField = ({ register, ...props }: RoundedTextFieldProps & Omit<TextFieldProps, 'variant'>) => {

    const { i18n } = useTranslation()
    return (
        <TextField {...(register ?? {})} {...props}
            variant='filled'
            size='small'
            FormHelperTextProps={
                {
                    sx: {
                        textAlign: i18n.resolvedLanguage === 'ar' ? 'right' : 'left'
                    }
                }
            }
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

            InputProps={{
                sx: {
                    borderRadius: '30px',
                    width: { xs: '300px', sm: '400px', md: '400px' }
                }, disableUnderline: true
            }} >{props.children}</TextField>
    )
}
