import { Box, Divider, Grid, Paper, Typography, styled, useMediaQuery, useTheme } from "@mui/material"
import { AppImage } from "../components/common/AppImage"
import { AppLink } from "../components/common/AppLink"
import { useProfileData } from "../hooks/ProfileHooks"
import NoImage from "../assets/no-image.png"
import dayjs from "dayjs"
import { useTranslation } from "react-i18next"

const TitleDivider = styled(Divider)(({ theme }) => ({
  width: 50,
  borderBottomWidth: 4,
  backgroundColor: theme.palette.primary.main,
  marginBottom: 16
}))

export const AboutPage = () => {
  const theme = useTheme()
  const match = useMediaQuery(theme.breakpoints.up('sm'))

  const { profile, isLoadingProfile } = useProfileData()

  const { t } = useTranslation()


  return (
    isLoadingProfile ? (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
        <Typography color={'text.primary'} variant="h4">Loading...</Typography>
      </Box>
    ) : (
      <Box sx={{
        p: { xs: 2, md: 4 },

      }}>
        <Grid container direction={'row'} >
          <Grid item xs={12} sm={6} md={8} lg={8} >
            <Box mb={4} >
              <Box sx={{
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: {
                  md: 'row',
                  xs: 'column',
                  sm: 'column'
                }
              }}>
                <Paper sx={{

                  borderRadius: '50%',
                  m: 2,
                }}>
                  <AppImage
                    src={profile?.personalData?.picture || NoImage}
                    sx={{
                      width: '180px',
                      height: '180px',
                      objectFit: profile?.personalData?.picture ? 'cover' : 'contain',
                      borderRadius: '50%',
                    }} />
                </Paper>
                <Box sx={{ p: 2 }}>
                  <Typography component={'p'} sx={{ textAlign: 'justify' }} variant="body2" color={'text.secondary'}>{profile?.personalData?.about}</Typography>
                </Box>
              </Box>

            </Box>
            <Divider flexItem sx={{ mb: 4 }} />
            <Grid container>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box mb={4}>
                  <Typography fontWeight={'bold'} gutterBottom color={'text.primary'} variant="h5">{t('profile-personal')}</Typography>
                  <TitleDivider flexItem />
                  <Box mb={4}>
                    <Typography variant="body1" fontWeight={'bold'} color={'text.primary'}>{t('full-name')}</Typography>
                    <Typography variant="body2" color={'text.secondary'}>{profile?.personalData?.fullName}</Typography>

                    <Typography variant="body1" fontWeight={'bold'} color={'text.primary'}>{t('birthday')}</Typography>
                    <Typography variant="body2" color={'text.secondary'}>{dayjs(profile?.personalData?.birthday).format('DD/MM/YYYY')}</Typography>

                    <Typography variant="body1" fontWeight={'bold'} color={'text.primary'}>{t('address')}</Typography>
                    <Typography variant="body2" color={'text.secondary'}>{profile?.personalData?.address}</Typography>

                    <Typography variant="body1" fontWeight={'bold'} color={'text.primary'}>{t('phone-number')}</Typography>
                    <Typography variant="body2" color={'text.secondary'}>{profile?.personalData?.phoneNumber}</Typography>

                    <Typography variant="body1" fontWeight={'bold'} color={'text.primary'}>{t('email')}</Typography>
                    <Typography variant="body2" color={'text.secondary'}>{profile?.personalData?.email}</Typography>
                  </Box>

                  <Box mb={4}>
                    <Typography fontWeight={'bold'} gutterBottom color={'text.primary'} variant="h5">{t('profile-education')}</Typography>
                    <TitleDivider flexItem />
                    {
                      profile?.educations?.map((education, index) => (
                        <Box key={index}>
                          <Typography variant="body1" fontWeight={'bold'} color={'text.primary'}>{education?.institution}</Typography>
                          <Typography variant="body2" color={'text.secondary'}>{education?.department}, {education?.major}</Typography>
                          <Typography variant="caption" color={'text.secondary'}>{dayjs(education?.startDate).format('YYYY')} - {dayjs(education?.endDate).format('YYYY')}</Typography>
                        </Box>
                      ))
                    }
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box mb={4}>
                  <Typography fontWeight={'bold'} gutterBottom color={'text.primary'} variant="h5">{t('profile-languages')}</Typography>
                  <TitleDivider flexItem />
                  {
                    profile?.languages?.map((language, index) => (
                      <Box key={index}>
                        <Typography variant="body1" fontWeight={'bold'} color={'text.primary'}>{language?.name}</Typography>
                        <Typography variant="body2" color={'text.secondary'}>{language?.level}</Typography>
                      </Box>
                    ))
                  }
                </Box>

                <Box mb={4}>
                  <Typography fontWeight={'bold'} gutterBottom color={'text.primary'} variant="h5">{t('profile-socials')}</Typography>
                  <TitleDivider flexItem />
                  <Box >
                    {
                      profile?.socials?.map((social, index) => (
                        <Box key={index}>
                          <Typography variant="body1" fontWeight={'bold'} color={'text.primary'}>{social.name}</Typography>
                          <AppLink underline="none" href={social.link}>
                            <Typography variant="body2" color={'text.secondary'}>{social.name}</Typography>
                          </AppLink>
                        </Box>
                      ))
                    }

                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          {
            match && <Divider sx={{ display: 'block', ml: 'auto', mr: 'auto' }} orientation='vertical' variant='middle' flexItem />
          }
          <Grid item xs={12} sm={5} md={3} lg={3} sx={{

          }}>
            {
              profile?.experience?.length || 0 > 0 && (
                <Box mb={4}>
                  <Typography fontWeight={'bold'} gutterBottom color={'text.primary'} variant="h5">{t('profile-experience')}</Typography>
                  <TitleDivider flexItem />
                  {
                    profile?.experience?.map((expe, index) => (
                      <Box sx={{ mb: 1 }} key={index}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} sm={8}>
                            <Typography color={'text.primary'} variant="h6">{expe.company}</Typography>
                            <Typography color={'text.primary'} variant="body2">{expe.title}</Typography>
                            <Typography color={'text.secondary'} variant="caption">{expe.location}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography color={'text.secondary'} variant="caption" display="flex" justifyContent="flex-end">
                              {dayjs(expe.startDate).format('YYYY')} - {dayjs(expe.endDate).format('YYYY')}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Typography color={'text.secondary'} variant="body2" sx={{ mt: 1 }}>
                          {expe.description}
                        </Typography>
                      </Box>
                    ))
                  }
                </Box>
              )
            }


            <Box mb={4}>

              <Typography fontWeight={'bold'} gutterBottom color={'text.primary'} variant="h5">{t('profile-skills')}</Typography>
              <TitleDivider flexItem />
              {
                profile?.skillsGroups?.map((group, dataIndex) => (
                  <Box mb={1} key={dataIndex}>
                    <Typography variant="body1" fontWeight={'bold'} color={'text.primary'}>{group.type}</Typography>
                    {
                      group?.skills?.map((skill, index) => (
                        <Typography key={index} variant="body1" color={'text.secondary'}>{skill}</Typography>
                      ))
                    }
                  </Box>
                ))
              }
            </Box>
          </Grid >
        </Grid>
      </Box >
    )
  )
}
