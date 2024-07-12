import { Box, Grid, Skeleton } from '@mui/material'

const ProjectDetailsSkeleton = () => {
    return (
        <Box sx={{ pr: 1.5 }}>

            <Skeleton sx={{
                height: {
                    xs: 160,
                    sm: 450,
                    md: 450
                }
            }} variant="rectangular" />

            <Box sx={{ pt: 2 }}>
                <Skeleton sx={{
                    mb: 1,
                    width: {
                        xs: '80%',
                        md: '50%'
                    },
                    height: 20
                }} animation="wave" />

                <Skeleton
                    animation="wave"
                    height={10}
                    width='98%'
                    style={{ marginBottom: 3 }}
                />
                <Skeleton
                    animation="wave"
                    height={10}
                    width='95%'
                    style={{ marginBottom: 3 }}
                />
                <Skeleton
                    animation="wave"
                    height={10}
                    width='96%'
                    style={{ marginBottom: 3 }}
                />
                <Skeleton
                    animation="wave"
                    height={10}
                    width='95%'
                    style={{ marginBottom: 3 }}
                />
                <Skeleton
                    animation="wave"
                    height={10}
                    width='97%'
                    style={{ marginBottom: 3 }}
                />
            </Box>
            <Box sx={{ pt: 8 }}>
                <Skeleton sx={{
                    mb: 1,
                    width: '30%',
                    height: 20
                }} animation="wave" />


                <Skeleton
                    animation="wave"
                    height={10}
                    width='68%'
                    style={{ marginBottom: 3 }}
                />
                <Skeleton
                    animation="wave"
                    height={10}
                    width='65%'
                    style={{ marginBottom: 3 }}
                />
                <Skeleton
                    animation="wave"
                    height={10}
                    width='66%'
                    style={{ marginBottom: 3 }}
                />
            </Box>
            <Grid container sx={{
                pt: 8,
                gap: {
                    xs: 4,
                    md: 0
                }
            }} >

                <Grid md={6} xs={12} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }} item >
                    <Box sx={{
                        width: '30%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Skeleton sx={{
                            width: '30px',
                            height: '30px',
                            mb: 0.5
                        }} variant='circular' />
                        <Skeleton
                            animation="wave"
                            height={10}
                            width='40%'
                        />

                    </Box>
                    <Box sx={{
                        width: '70%'
                    }}>
                        <Skeleton
                            animation="wave"
                            height={10}

                            style={{ marginBottom: 3 }}
                        />
                        <Skeleton
                            animation="wave"
                            height={10}

                            style={{ marginBottom: 3 }}
                        />
                        <Skeleton
                            animation="wave"
                            height={10}

                            style={{ marginBottom: 3 }}
                        />
                        <Skeleton
                            animation="wave"
                            height={10}

                            style={{ marginBottom: 3 }}
                        />
                    </Box>
                    <Box>

                    </Box>

                </Grid>
                <Grid md={6} xs={12} sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2
                }} item>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 0.5
                    }} width={'20%'}>
                        <Skeleton sx={{
                            width: '15px',
                            height: '15px',
                        }} variant='circular' />
                        <Skeleton
                            animation="wave"
                            height={10}
                            width={'70%'}
                            style={{ marginBottom: 3 }}
                        />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 0.5
                    }} width={'20%'}>
                        <Skeleton sx={{
                            width: '15px',
                            height: '15px',
                        }} variant='circular' />
                        <Skeleton
                            animation="wave"
                            height={10}
                            width={'70%'}
                            style={{ marginBottom: 3 }}
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 0.5
                    }} width={'20%'}>
                        <Skeleton sx={{
                            width: '15px',
                            height: '15px',
                        }} variant='circular' />
                        <Skeleton
                            animation="wave"
                            height={10}
                            width={'70%'}
                            style={{ marginBottom: 3 }}
                        />
                    </Box>
                </Grid>

            </Grid>
        </Box>
    )
}

export default ProjectDetailsSkeleton