import { Box, Grid, Typography } from "@mui/material"
import { useEffect } from "react";
import { ProjectCard } from "../components/projects/ProjectCard";
import { Outlet, useSearchParams } from "react-router-dom";
import ProjectCardSkeleton from "../components/projects/ProjectCardSkeleton";
import { AppError } from "../components/common/errors/AppError";
import { useInView } from "react-intersection-observer";
import { useGetProjects } from "../hooks/ProjectHooks";
import { decodeSearchParams } from "../utils/helpers";

import ProjectFilter from "../components/projects/ProjectFilter";
import { useTranslation } from "react-i18next";



export const ProjectsPage = () => {

  const [searchParams, setSearchParams] = useSearchParams({ filteredBy: 'latest' });
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const {
    fetchNextProjectsPage,
    hasNextProjectsPage,
    projects,
    isFetchingNextProjectsPage,
    isFetchingProjects,
    isFetchingProjectsError } = useGetProjects(decodeSearchParams(searchParams))


  useEffect(() => {
    if (inView && hasNextProjectsPage) {
      fetchNextProjectsPage()
    }

  }, [inView, fetchNextProjectsPage, hasNextProjectsPage])


  const handelFilter = (value: string) => {
    searchParams.set("filteredBy", value);
    setSearchParams(searchParams);
  }


  const handleSearchSubmit = ({ searchValue }: { searchValue: string }) => {
    searchParams.set("searchValue", searchValue);
    setSearchParams(searchParams);
  }

  const { t } = useTranslation()


  const content = (
    isFetchingProjects && !isFetchingNextProjectsPage ? (
      Array.from(new Array(12)).map((_, index) => (
        <Grid item xs={12} key={index} sm={6} md={4} lg={3}>
          <ProjectCardSkeleton />
        </Grid>
      ))
    )
      : projects?.length === 0 ?
        (<Box sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          alignSelf: 'center',
          mt: 20,
          textAlign: 'center',
          p: 2,
          alignItems: 'center'
        }} >
          <Typography variant="h6" sx={{}} color={'text.primary'} >
            {searchParams.get("searchValue") ? t('project_search_not_match', { searchValue: searchParams.get("searchValue") }) : t('no_project_found')}
          </Typography>
        </Box>)

        : projects?.map((project, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            {
              projects.length === index - 1 ? <ProjectCard project={project} /> : <ProjectCard innerRef={ref} project={project} />
            }
          </Grid>
        ))
  )

  const filters = [
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


  return (
    <>
      <Box sx={{
        width: '100%',
        height: ' 100%',
        overflow: 'hidden',
        position: 'relative'
      }}>

        <ProjectFilter filters={filters} currentFilter={searchParams.get('filteredBy')!} handleSearchSubmit={handleSearchSubmit} handelFilter={handelFilter} />

        <Grid container direction={'row'} spacing={2} p={2}>
          {
            content
          }
          {
            isFetchingNextProjectsPage && (
              <>
                {
                  Array.from(new Array(12)).map((_, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                      {
                        <ProjectCardSkeleton />
                      }
                    </Grid>
                  ))
                }
              </>
            )
          }
        </Grid>
        {isFetchingProjectsError && <AppError />}
      </Box >
      <Outlet />
    </>
  );
}



