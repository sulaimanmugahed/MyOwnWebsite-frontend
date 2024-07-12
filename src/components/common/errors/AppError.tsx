import { BoxProps, Grid, Typography, styled } from '@mui/material';
import './GearsAnimation.css'
import { useTranslation } from 'react-i18next';


const Gear = styled('div')<BoxProps>(({ theme }) => ({
    position: 'relative',
    zIndex: 0,
    width: 60,
    height: 60,
    margin: '0 auto',
    borderRadius: '50%',
    '::after': {
        position: 'absolute',
        left: 13,
        top: 13,
        zIndex: 3,
        content: '""',
        width: 34,
        height: 34,
        borderRadius: '50%',
        boxSizing: 'border-box',
        background: theme.palette.background.default,
        border: `3px solid ${theme.palette.text.primary}`
    },
    '::before': {
        position: 'absolute',
        left: 3,
        top: 3,
        right: 3,
        bottom: 3,
        zIndex: 2,
        content: '""',
        borderRadius: '50%',
        background: theme.palette.background.default
    },

    background: theme.palette.text.primary
}));

const GearBar = styled('div')<BoxProps>(({ theme }) => ({
    position: 'absolute',
    left: -5,
    top: '50%',
    zIndex: 0,
    width: 70,
    height: 10,
    marginTop: -5,
    borderRadius: 3,
    '::before': {
        position: 'absolute',
        left: 3,
        top: 3,
        right: 3,
        bottom: 3,
        zIndex: 1,
        content: '""',
        borderRadius: 1,
        background: theme.palette.background.default
    },
    background: theme.palette.text.primary
}));

export const AppError = () => {

    const { t } = useTranslation()
    return (
        <Grid container direction={'column'}
            sx={{
                textAlign: 'center',
                p: 4,

            }}>


            <Grid md={12} xs={12} sm={12} item sx={{
                position: 'relative',
                margin: '0 auto',
                width: 'auto',
                height: 0,
                mb: 4,

            }} className="gears">

                <Gear sx={{
                    '::after': {

                        border: `3px solid #c62828`,

                    },
                    background: '#c62828 '
                }} className="gear one">
                    <GearBar sx={{ background: '#c62828' }} className="bar"></GearBar>
                    <GearBar sx={{ background: '#c62828' }} className="bar"></GearBar>
                    <GearBar sx={{ background: '#c62828' }} className="bar"></GearBar>
                </Gear>
                <Gear className="gear two">
                    <GearBar className="bar"></GearBar>
                    <GearBar className="bar"></GearBar>
                    <GearBar className="bar"></GearBar>
                </Gear>
                <Gear className="gear three">
                    <GearBar className="bar"></GearBar>
                    <GearBar className="bar"></GearBar>
                    <GearBar className="bar"></GearBar>
                </Gear>
            </Grid>
            <Grid md={12} xs={12} sm={12} item>
                <Typography gutterBottom color={'error'} fontWeight={'bold'} variant='h4'>{t('oops')}</Typography>
                <Typography color={'error'} fontWeight={'bold'} variant='body2' >{t('app-error-message-one')}<Typography color={'text.secondary'} variant='body2' >{t('app-error-message-tow')}</Typography></Typography>
            </Grid>

        </Grid>
    )
}
