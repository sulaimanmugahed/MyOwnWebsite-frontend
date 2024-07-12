import { ProjectList } from '../../components/projects/ProjectList'
import ProjectFilter from '../../components/projects/ProjectFilter'
import { Outlet, useSearchParams } from 'react-router-dom'
import { ProjectDto, ProjectFilterType } from '../../utils/types/ProjectsTypes'
import { AppSearchFormValues } from '../../utils/types/CommonTypes'
import { useGetProjects } from '../../hooks/ProjectHooks'
import { decodeSearchParams } from '../../utils/helpers'
import { Box, Grid, IconButton, Paper, Skeleton, Tooltip, Typography } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { AppLink } from '../../components/common/AppLink'
import { AppError } from '../../components/common/errors/AppError'
import ProjectListItemSkeleton from '../../components/projects/ProjectListItemSkeleton'
import AllProjectsRateChart from '../../components/projects/AllProjectsRateChart'
import { useAllProjectRatingStatistic } from '../../hooks/StatisticsHooks'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'


const ManageProjectsPage = () => {

    const [searchParams, setSearchParams] = useSearchParams({ filteredBy: 'latest' })



    const {
        projects,
        isFetchingNextProjectsPage,
        isFetchingProjects,
        isFetchingProjectsError,
        hasNextProjectsPage,
        fetchNextProjectsPage

    } = useGetProjects(decodeSearchParams(searchParams))

    const { ref, inView } = useInView({
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView && hasNextProjectsPage) {
            fetchNextProjectsPage()
        }

    }, [inView, fetchNextProjectsPage, hasNextProjectsPage])

    const {
        allProjectRatingStatisticData,
        isLoadingAllProjectRatingStatistic,
        isErrorAllProjectRatingStatistic
    } = useAllProjectRatingStatistic()

    const handelFilter = (value: string) => {
        searchParams.set("filteredBy", value);
        setSearchParams(searchParams);
    }


    const handleSearchSubmit = ({ searchValue }: AppSearchFormValues) => {
        searchParams.set("searchValue", searchValue);
        setSearchParams(searchParams);
    }

    const filters: ProjectFilterType[] = [
        {
            name: 'Latest',
            value: 'latest'
        },
        {
            name: 'Top-Rated',
            value: 'topRated'
        },
        {
            name: 'Oldest',
            value: 'oldest'
        },

    ]






    const projectsListContent = (

        isFetchingProjects && !isFetchingNextProjectsPage ? (
            Array.from(new Array(12)).map(index => ((
                <ProjectListItemSkeleton key={index} />
            )))

        )
            : isFetchingProjectsError ? (
                <AppError />
            ) : (
                <ProjectList innerRef={ref} projects={projects as ProjectDto[]} />

            )
    )

    return (
        <>
            <Grid spacing={2} container sx={{
                p: 2,
                flexDirection: {
                    xs: 'column-reverse',
                    md: 'row'
                }
            }}>
                <Grid xs={12} md={5} item>
                    <Paper sx={{
                        height: {
                            md: 580,
                            sm: 650,
                            xs: 450
                        }
                    }}>
                        {
                            isErrorAllProjectRatingStatistic ? (
                                <AppError />
                            ) :
                                (
                                    <>

                                        <AllProjectsRateChart loading={isLoadingAllProjectRatingStatistic} ratings={allProjectRatingStatisticData?.numberOfRates?.map(x => x.rating) || []} counts={allProjectRatingStatisticData?.numberOfRates?.map(x => x.count) || []} />
                                        <Box sx={{
                                            p: {
                                                md: 4,
                                                xs: 2
                                            },
                                        }}>
                                            <Box>
                                                {
                                                    isLoadingAllProjectRatingStatistic ? Array.from(new Array(3)).map((_, index) => (
                                                        <Box key={index}>
                                                            <Skeleton
                                                                animation="wave"
                                                                height={20}
                                                                width='40%'
                                                                style={{ marginBottom: 10 }}
                                                            />
                                                            <Skeleton
                                                                animation="wave"
                                                                height={10}
                                                                width='80%'
                                                                style={{ marginBottom: 20 }}
                                                            />
                                                        </Box>
                                                    ))
                                                        : allProjectRatingStatisticData && (
                                                            <>
                                                                <Typography variant='body1' fontWeight={'bold'} color={'text.primary'}>Total Projects Rating</Typography>
                                                                <Typography mb={1} variant='body2' color={'text.secondary'}>{allProjectRatingStatisticData?.totalNumberOfRates} Rate</Typography>

                                                                <Typography variant='body1' fontWeight={'bold'} color={'text.primary'}>Top Project Rates</Typography>
                                                                <Typography mb={1} variant='body2' color={'text.secondary'}>{allProjectRatingStatisticData?.topProjectRate}</Typography>

                                                                <Typography variant='body1' fontWeight={'bold'} color={'text.primary'}>Descriptive Summary</Typography>
                                                                <Typography gutterBottom variant='body2' color={'text.secondary'}>The chart displays the distribution of ratings across all {allProjectRatingStatisticData.totalProjectsCount} projects. A total of {allProjectRatingStatisticData.totalProjectsHasRatedCount} projects have been rated</Typography>
                                                            </>
                                                        )

                                                }

                                            </Box>
                                            <Box >

                                            </Box>
                                        </Box>
                                    </>
                                )
                        }

                    </Paper>
                </Grid>

                <Grid xs={12} md={7} item>
                    <Paper sx={{
                        height: {
                            md: 580,
                            sm: 650,
                            xs: 600
                        }, overflow: 'hidden'
                    }}>
                        <ProjectFilter filters={filters} currentFilter={searchParams.get('filteredBy')!} handleSearchSubmit={handleSearchSubmit} handelFilter={handelFilter} />
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            pr: 2
                        }}>
                            <AppLink href='create'>
                                <Tooltip title='Add new Project'>

                                    <IconButton  ><AddRoundedIcon sx={{ width: 40, height: 40 }} /></IconButton>
                                </Tooltip>

                            </AppLink>
                        </Box>
                        <Box sx={{ height: 400, overflow: 'hidden', overflowY: 'scroll' }}>
                            {projectsListContent}
                            {
                                isFetchingNextProjectsPage && (
                                    Array.from(new Array(12)).map((_, index) => ((
                                        <ProjectListItemSkeleton key={index} />
                                    )))
                                )
                            }
                        </Box>
                    </Paper>
                </Grid>

            </Grid>
            <Outlet />
        </>

    )
}

export default ManageProjectsPage