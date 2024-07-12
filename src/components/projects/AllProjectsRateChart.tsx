import { Box, useTheme } from '@mui/material'
import { LineChart } from '@mui/x-charts/LineChart'


type AllProjectRateChartProps = {
    ratings: number[],
    counts: number[],
    loading?:boolean
}

const AllProjectsRateChart = ({ loading,ratings, counts }: AllProjectRateChartProps) => {
    const theme = useTheme()
    return (
        <Box sx={{
            width: '100%',
            height: {
                xs: 200,
                sm:400,
                md: 300
            }
        }}>
            <LineChart
            loading={loading}
                xAxis={[{ data: ratings }]}
                series={[
                    {
                        data: counts,
                        color: theme.palette.primary.main
                    },
                ]}
            />
        </Box>
    )
}

export default AllProjectsRateChart