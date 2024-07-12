import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import useClient from "./useClient";
import { ProjectCommandType, ProjectDetailsDto, UserRateType } from "../utils/types/ProjectsTypes";
import { BaseResult } from "../utils/types/CommonTypes";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";




export type QueryParamsType = {
    searchValue?: string,
    pageSize?: number,
    filteredBy?: string
}




export const useGetProjects = (QueryParams: QueryParamsType) => {

    const client = useClient()
    const { t } = useTranslation()

    const fetchProjects = async ({ pageParam }: { pageParam: number }) => {
        return (await client(
            `projects`, {
            params: {
                pageNumber: pageParam,
                pageSize: QueryParams.pageSize || 12,
                searchValue: QueryParams.searchValue || "",
                filteredBy: QueryParams.filteredBy || ""
            }
        }))?.data;
    }


    const {
        data,
        status,
        fetchNextPage,
        hasNextPage,
        error,
        isError,
        isLoading,
        isFetching,
        isFetchingNextPage } = useInfiniteQuery(
            {
                queryKey: ["projects", QueryParams],
                queryFn: fetchProjects,
                initialPageParam: 1,

                getNextPageParam: (lastPage) => {

                    const nextPage = lastPage.hasNextPage ? lastPage.pageNumber + 1 : null;
                    return nextPage;
                },
                meta: {
                    errorMessage: t('some_thing_went_wrong'),
                },
                staleTime: 1000 * 60 * 60
            })

    return {
        projects: data?.pages.flatMap((page) => page.data),
        fetchNextProjectsPage: fetchNextPage,
        hasNextProjectsPage: hasNextPage,
        isFetchingNextProjectsPage: isFetchingNextPage,
        isLoadingProjects: isLoading,
        isFetchingProjects: isFetching,
        fetchingProjectsStatus: status,
        fetchingProjectsError: error,
        isFetchingProjectsError: isError
    }

}



export const useProjectCommand = (id: string | null = null) => {

    const client = useClient()
    const { t } = useTranslation()

    const queryClient = useQueryClient()
    const { mutateAsync, isPending, isSuccess } = useMutation({
        mutationFn: async (command: ProjectCommandType) => {
            return (await client({
                url: id != null ? `/projects/${id}` : '/projects',
                method: id != null ? 'put' : 'post',
                data: command
            })).data
        },
        retry: 3,
        onSettled: async () => {
            if (id) {
                await queryClient.invalidateQueries({ queryKey: ['project', id] })
            }

            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['allProjectRatingStatistic'] }),
                queryClient.invalidateQueries({ predicate: (query) => query.queryKey.includes('projects') })
            ])
        },

        onSuccess: _response => {
            return toast.success(t('project_command_success', { action: t(id != null ? 'edit' : 'create') }), { position: 'top-center' })
        },
        onError: _ => toast.error(t('some_errors_happened'))

    })

    return {
        submit: mutateAsync,
        isPending,
        isSuccess
    }
}




export const useDeleteProject = () => {
    const client = useClient()
    const { t } = useTranslation()

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: async (projectId: string) => {
            return (await client.delete('projects/' + projectId)).data
        },
        onSettled: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['allProjectRatingStatistic'] }),
                queryClient.invalidateQueries({ predicate: (query) => query.queryKey.includes('projects') })
            ])
        },
        retry: 3,
        onSuccess: _response => {
            return toast.success(t('project_command_success', { action: t('delete') }), { position: 'top-center' })
        },
        onError: error => {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    return toast.error(t('project_not_found'))
                }
            }
            return toast.error(t('some_errors_happened'))
        }


    })

    return {
        deleteProject: mutate
    }
}



export const useRateProject = (projectId: string) => {

    const client = useClient()
    const queryClient = useQueryClient()
    const { t } = useTranslation()


    return useMutation({
        mutationFn: async (rateValue: number) => {

            return (await client.post(
                `projects/${projectId}/rate?rateValue=${rateValue}`
            )).data
        },
        retry: 3,
        onSettled: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['allProjectRatingStatistic'] }),
                queryClient.invalidateQueries({ queryKey: ['userRate', projectId] }),
                queryClient.invalidateQueries({ queryKey: ['project', projectId] })
            ])

        },
        onSuccess: () => toast.success(t('rate_submitted_success')),
        mutationKey: ['rateProject'],
        meta: {
            errorMessage: t('rate_submitted_error'),
        },

    },)
}


export const useUserRate = (projectId: string) => {

    const client = useClient()
    const { t } = useTranslation()

    const { data } = useQuery<BaseResult<UserRateType>, Error>({
        queryKey: ['userRate', projectId],
        queryFn: async () => {
            return (await client.get(`projects/${projectId}/rate`))?.data
        },
        staleTime: 1000 * 60 * 60,
        meta: {
            errorMessage: t('user_rate_load_failed'),
        },
    })

    return { userRate: data?.data };
}

export const useProjectDetailsData = (projectId: string) => {

    const client = useClient()
    const { t } = useTranslation()

    const { data, isError, isLoading } = useQuery<BaseResult<ProjectDetailsDto>, Error>(
        {
            queryKey: ['project', projectId],
            queryFn: async () => (await client.get(`projects/details/${projectId}`))?.data,
            staleTime: 1000 * 60 * 60,
            meta: {
                errorMessage: t('project_detail_load_failed'),
            },

        }
    )

    return {
        projectDetail: data?.data,
        isLoadingProjectDetail: isLoading,
        isErrorProjectDetail: isError
    }
}