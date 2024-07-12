import { Box, Skeleton } from '@mui/material'

const ProjectCardSkeleton = ({ innerRef }: { innerRef?: React.Ref<HTMLDivElement> }) => {
    return (
        <>
            <Skeleton variant="rectangular" ref={innerRef} height='180px' />
            <Box sx={{ pt: 1 }}>
                <Skeleton width="80%" animation="wave" style={{ marginBottom: 1 }} />

                <Skeleton
                    animation="wave"
                    height={10}
                    width='30%'
                    style={{ marginBottom: 20 }}
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
                    width='90%'
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
                    width='90%'
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
                    width='90%'
                    style={{ marginBottom: 20 }}
                />


                <Box sx={{ p: 2, display: 'flex', gap: 4 }}>
                    <Skeleton
                        animation="wave"
                        height={20}
                        width='20%'
                        style={{ marginBottom: 1 }}
                    />

                    <Skeleton
                        animation="wave"
                        height={20}
                        width='20%'
                        style={{ marginBottom: 1 }}
                    />
                </Box>






            </Box>
        </>
    )
}

export default ProjectCardSkeleton