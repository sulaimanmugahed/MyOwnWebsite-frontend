import { useQuery } from "@tanstack/react-query"
import useClient from "./useClient"
import { AllProjectRatingStatisticType, BaseResult } from "../utils/types/CommonTypes"

export const useAllProjectRatingStatistic = () => {
    const client = useClient()


    const { data, isError, isLoading } = useQuery<BaseResult<AllProjectRatingStatisticType>>({
        queryKey: ['allProjectRatingStatistic'],
        queryFn: async () => {
            return (await client.get('statistics/allProjectRatingStatistic')).data
        },
        
    })

    return {
        allProjectRatingStatisticData: data?.data,
        isErrorAllProjectRatingStatistic: isError,
        isLoadingAllProjectRatingStatistic: isLoading
    }
}