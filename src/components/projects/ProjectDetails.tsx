import { useNavigate, useParams } from "react-router-dom"
import { Box, Divider, Grid, IconButton, LinearProgress, Rating, Typography, linearProgressClasses, styled } from "@mui/material";
import { AppModal } from "../common/AppModal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import AppButton from "../common/AppButton";
import GitHubIcon from '@mui/icons-material/GitHub';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useProjectDetailsData, useUserRate, useRateProject } from "../../hooks/ProjectHooks";
import EditIcon from '@mui/icons-material/Edit'
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
import dayjs from "dayjs";
import { AppError } from "../common/errors/AppError";
import ProjectDetailsSkeleton from "./ProjectDetailsSkeleton";
import ProjectDetailsSlider from "./ProjectDetailsSlider";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTranslation } from "react-i18next";


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.error
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.error

    },
}));


export const ProjectDetails = () => {
    const { projectId } = useParams()
    const navigate = useNavigate();
    const [rateValue, setRateValue] = useState<number | null>(null)
    const [rateModalOpen, setRateModalOpen] = useState(false)
    const [, copy] = useCopyToClipboard()
    const { projectDetail, isErrorProjectDetail, isLoadingProjectDetail } = useProjectDetailsData(projectId!)
    const { userRate } = useUserRate(projectId!)


    const { mutate, variables, isPending } = useRateProject(projectId!)

    const handleRateSubmit = () => {
        if (rateValue) {
            mutate(
                rateValue,
                {
                    onSuccess: _ => {
                        setRateModalOpen(false)

                    }
                }
            )
        }
    }

    const { t } = useTranslation()


    const handleRateChange = (_: React.ChangeEvent<{}>, newValue: number | null) => {
        if (!rateModalOpen) {
            setRateModalOpen(true)
        }
        setRateValue(newValue)
    }







    return (projectId &&


        <AppModal
            closeButton
            height=
            {{
                xs: '90vh',
                md: '90vh'
            }}
            width={{
                xs: '90%',
                md: '70%'
            }} open handelCloseButton={() => navigate(-1)}>
            <Box sx={{

            }}>

                {
                    isLoadingProjectDetail
                        ?
                        (
                            <ProjectDetailsSkeleton />
                        )
                        : isErrorProjectDetail
                            ? (<AppError />)
                            : (
                                <>
                                    <ProjectDetailsSlider homeImage={projectDetail?.homeImage} additionalImages={projectDetail?.additionalImages} />

                                    <Typography variant="h5" fontWeight={'bold'} gutterBottom color={'text.primary'}>{projectDetail?.title} </Typography>
                                    <Typography variant="body2" pb={4} color={'text.secondary'}>{projectDetail?.description} </Typography>
                                    <Box mb={4}>

                                        {
                                            (projectDetail?.features?.length || 0 > 0) && (
                                                <>
                                                    <Typography variant="h6" color={'text.primary'}>{t('features')}</Typography>
                                                    {
                                                        projectDetail?.features?.map((feature, index) => (
                                                            <Typography gutterBottom sx={{ listStyle: 'inside' }} component={'li'} key={index} variant="body2" color={'text.secondary'}>{feature}</Typography>
                                                        ))
                                                    }
                                                </>
                                            )}
                                    </Box>
                                    <Box mb={6}>

                                        <Typography variant="h6" color={'text.primary'}>{t('creation')}</Typography>
                                        <Typography sx={{ listStyle: 'inside' }} component={'li'} color={'text.secondary'} variant="body1">{t('start_at', { date: dayjs(projectDetail?.startDate).format('MM/DD/YY') })}</Typography>
                                        <Typography sx={{ listStyle: 'inside' }} component={'li'} color={'text.secondary'} variant="body1">{projectDetail?.endDate ? t('finished_at', { date: dayjs(projectDetail?.startDate).format('MM/DD/YY') }) : t('project_not_finished')}</Typography>

                                    </Box>

                                    <Box sx={{
                                        mb: 6,
                                    }}>
                                        {
                                            userRate ? (
                                                <>
                                                    <Typography variant="h6" color='text.primary'>{t('your-rate')}</Typography>
                                                    <Box sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',

                                                    }}>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 2
                                                        }}>
                                                            <Rating readOnly size='small' icon={<FavoriteIcon fontSize='inherit' color='primary' />} emptyIcon={<FavoriteBorderIcon fontSize='inherit' />} value={isLoadingProjectDetail ? variables : userRate.rate} />
                                                            <Typography variant="body2" color={'text.secondary'}>{dayjs(userRate.rateAt).format('MM/DD/YY')}</Typography>
                                                        </Box>

                                                        <IconButton onClick={() => {
                                                            setRateValue(userRate.rate)
                                                            setRateModalOpen(true)
                                                        }} size="small" type="button" sx={{}} aria-label="editRate">
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Box>
                                                </>
                                            ) : (
                                                <>
                                                    <Typography variant="h6" color='text.primary'>{t('rate_this_project')}</Typography>

                                                    <Typography mb={2} variant="body2" color='text.secondary'>{t('tell_what_think')}</Typography>
                                                    <Rating sx={{ gap: 2, direction: 'ltr' }} size='large' icon={<FavoriteIcon fontSize='inherit' color='primary' />} emptyIcon={<FavoriteBorderIcon fontSize='inherit' />} onChange={handleRateChange} value={rateValue} />
                                                </>
                                            )
                                        }
                                    </Box>

                                    <Divider sx={{ mb: 6 }} />

                                    <Grid container spacing={4} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' }, justifyContent: 'center', alignItems: 'center' }}>
                                        <Grid container item xs={12} sm={12} md={6} lg={6} spacing={2} direction={'row'}>
                                            <Grid xs={4} sm={4} md={4} lg={4} item sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                <Typography variant="h4" fontWeight={'bold'} sx={{ flexGrow: 0 }} color={'text.primary'}>{projectDetail?.totalRateAverage}</Typography>
                                                <Rating precision={0.5} readOnly size='small' icon={<FavoriteIcon fontSize='inherit' color='primary' />} emptyIcon={<FavoriteBorderIcon fontSize='inherit' />} value={projectDetail?.totalRateAverage} />
                                                <Typography color={'text.secondary'} variant="body2">{projectDetail?.totalRateCount}</Typography>
                                            </Grid>
                                            <Grid xs={8} sm={8} md={8} lg={8} item>
                                                {
                                                    Array.from(new Array(5)).map((_, index) => (
                                                        <Box key={index} sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Typography sx={{ flexGrow: 0 }} color={'text.primary'}>{index + 1}</Typography>
                                                            <BorderLinearProgress sx={{ flexGrow: 1 }} variant="determinate" value={projectDetail?.ratingAverages?.find(r => r.rate === index + 1)?.average || 0} />
                                                        </Box>
                                                    )).reverse()
                                                }
                                            </Grid>
                                            <AppModal closeButton open={rateModalOpen} handelCloseButton={() => {
                                                setRateModalOpen(false)
                                                setRateValue(0)
                                            }} >
                                                <Box sx={{ p: 4, display: 'flex', gap: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Rating sx={{direction: 'ltr'}} size='large' icon={<FavoriteIcon fontSize='inherit' color='primary' />} emptyIcon={<FavoriteBorderIcon fontSize='inherit' />} value={rateValue} onChange={handleRateChange} />
                                                    <LoadingButton loading={isPending} onClick={handleRateSubmit}>{t('submit')}</LoadingButton>
                                                </Box>
                                            </AppModal>
                                        </Grid>
                                        <Grid item container direction={'row'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: { xs: 2 } }} xs={12} sm={12} md={6} lg={6}>

                                            <AppButton href={projectDetail?.githubLink}
                                                onClick={() => {
                                                    if (!projectDetail?.githubLink) {
                                                        toast.info(t('project_no_repo_info'))
                                                    }
                                                }}
                                                disableElevation
                                                disableRipple sx={{
                                                    '& .MuiButton-startIcon': { marginLeft: '10px' },
                                                    "&.MuiButtonBase-root:hover": {
                                                        bgcolor: "transparent"
                                                    }
                                                }} startIcon={<GitHubIcon />}>
                                                {t('source-code')}
                                            </AppButton>
                                            <AppButton
                                                onClick={() => {
                                                    copy(`${window.location}`)
                                                    toast.info(t('link_copied_to_clipboard_info'))
                                                }}
                                                disableElevation

                                                disableRipple sx={{
                                                    '& .MuiButton-startIcon': { marginLeft: '10px' },
                                                    "&.MuiButtonBase-root:hover": {
                                                        bgcolor: "transparent"
                                                    }
                                                }} startIcon={<ShareIcon />}>
                                                {t('share')}
                                            </AppButton>
                                        </Grid>

                                    </Grid>
                                </>
                            )
                }
            </Box >
        </AppModal >

    )
}





