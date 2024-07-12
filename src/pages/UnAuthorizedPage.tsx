import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

export const UnAuthorizedPage = () => {
    const { t } = useTranslation()
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}> {/* Center content vertically */}
            <Typography color={'error'} variant="h4" gutterBottom component="div">
                {t('unauthorized_message_one')}
            </Typography>
            <Typography color={'text.secondary'} variant="body1">
                {t('unauthorized_message_tow')}
            </Typography>
        </Box>
    )
}
