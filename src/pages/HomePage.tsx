import { Box, Grid, IconButton, Typography } from "@mui/material"
import AppButton from "../components/common/AppButton"
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { AnimatedLaptop } from "../components/animated-laptop/AnimatedLaptop";
import { AppLink } from "../components/common/AppLink";
import { useProfileData } from "../hooks/ProfileHooks";
import { useTranslation } from "react-i18next";
export const HomePage = () => {
    const { profile, isLoadingProfile } = useProfileData()

    const { t } = useTranslation()


    return (
        isLoadingProfile ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
                <Typography color={'text.primary'} variant="h4">{t('loading')}</Typography>
            </Box>
        ) : (
            <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6}
                    sx={{
                        textAlign: { xs: 'center', md: 'left' },
                        p: { xs: '16px', md: '60px', },
                        mt: '45px',
                    }}>
                    <Typography variant="h4" fontWeight='bold' gutterBottom color='text.primary'>
                        Hello, <Typography fontWeight='bold' variant="h4" color='primary' component={'span'}>I'm</Typography>
                    </Typography>
                    <Typography variant='h4' fontWeight='bold' gutterBottom color='primary'>
                        {profile?.personalData?.firstName} {profile?.personalData?.lastName}
                    </Typography>
                    <Typography variant="h4" fontWeight='bold' mb={2} color='text.primary'>
                        {profile?.personalData?.headline}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }} mb={3}>
                        {profile?.personalData?.summary}
                    </Typography>
                    <AppLink href="/contact">
                        <AppButton sx={{ mb: '25px' }} variant='outlined'>
                            {t('lets-talk')}
                        </AppButton>
                    </AppLink>


                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} sx={{
                    p: { xs: '16px', md: '60px', },
                    mt: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignContent: 'center'
                }}>
                    <AnimatedLaptop />

                    <Box mt={3}>
                        <IconButton href={profile?.socials?.find(s => s.link.startsWith('https://www.instagram'))?.link || '#'} aria-label="instagram" color="primary" size='medium'>
                            <InstagramIcon />
                        </IconButton>
                        <IconButton href={profile?.socials?.find(s => s.link.startsWith('https://www.linkedin'))?.link || '#'} aria-label="linkedIn" color="primary" size="medium">
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton href={profile?.socials?.find(s => s.link.startsWith('https://www.github'))?.link || '#'} aria-label="gitHub" color="primary" size="medium">
                            <GitHubIcon />
                        </IconButton>

                    </Box>
                </Grid>
            </Grid>
        )

    )
}
