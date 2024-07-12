import { Box, Typography } from "@mui/material"
import { AppLink } from "../components/common/AppLink"
import AppButton from "../components/common/AppButton"
import { useTranslation } from "react-i18next"

export const NotFoundPage = () => {
  const { t } = useTranslation()
  return (

    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Typography color={'text.primary'} variant="h2" gutterBottom>
        {t('not_found_message_one')}
      </Typography>
      <Typography color={'text.secondary'} variant="body1">
        {t('not_found_message_tow')}
      </Typography>
      <Box sx={{ mt: 3 }}>
        <AppLink href="/" underline="none">
          <AppButton sx={{ color: 'text.primary' }} variant="contained" >
            {t('back_home')}
          </AppButton>
        </AppLink>
      </Box>
    </Box>

  )
}
