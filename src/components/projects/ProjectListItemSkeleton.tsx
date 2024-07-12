import { Box, Skeleton } from '@mui/material'

const ProjectListItemSkeleton = () => {
    return (
        <Box sx={{
            p: 2
        }}>
            <Skeleton width="40%" animation="wave" style={{ marginBottom: 4 }} />
            <Skeleton
                animation="wave"
                height={10}
                width='70%'
                style={{ marginBottom: 2 }}
            />
            <Skeleton
                animation="wave"
                height={10}
                width='80%'
                style={{ marginBottom: 20 }}
            />
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}>
                <Skeleton
                    animation="wave"
                    height={10}
                    width='10%'
                    style={{ marginBottom: 20 }}
                />
                <Skeleton
                    animation="wave"
                    height={10}
                    width='7%'
                    style={{ marginBottom: 20 }}
                />
            </Box>

        </Box>
    )
}

export default ProjectListItemSkeleton