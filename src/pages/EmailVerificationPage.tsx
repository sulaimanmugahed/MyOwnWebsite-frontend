import { useQuery } from "@tanstack/react-query"
import { useNavigate, useSearchParams } from "react-router-dom"
import { client } from "../utils/client"
import { Box, Typography } from "@mui/material"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

const EmailVerificationPage = () => {

  const [params] = useSearchParams()

  const navigate = useNavigate()
  const { t } = useTranslation()


  const { isSuccess, isPending, isError } = useQuery({
    queryKey: ["verifyEmail", params.get('userEmail')],
    queryFn: async () => {
      return (await client.get(`account/confirm?userEmail=${params.get('userEmail')}&token=${params.get('token')}`)).data
    },
    meta: {
      errorMessage: "error"
    }
  })


  useEffect(() => {
    if (isSuccess) {
      const timeoutId = setTimeout(() => {
        navigate(`/login?email=${params.get('userEmail')}`, { replace: true });
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [isSuccess])


  useEffect(() => {
    if (isError) navigate(-1)
  }, [isError])


  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', textAlign: 'center' }}>

      {isSuccess && <Typography color={'text.primary'} variant="h4">{t('account_verified_successfully')}</Typography>}
      {isPending && <Typography color={'text.primary'} variant="h4">{t('just_moment')}</Typography>}
      {isError && <Typography color={'error'} variant="h4">{t('could_not_verify_account')}</Typography>}

    </Box>
  )
}

export default EmailVerificationPage