import { useQuery } from "@tanstack/react-query"
import { client } from "../utils/client"
import { BaseResult } from "../utils/types/CommonTypes"
import { Profile } from "../utils/types/ProfileTypes"
import { initialProfileResponse } from "../utils/initial-profile"

export const useProfileData = () => {

    const { data, isLoading, isError } = useQuery<BaseResult<Profile>, Error>({
        queryKey: ['profile-data'],
        initialData: initialProfileResponse,
        queryFn: async () => {
            return (await client.get('profile')).data
        },
        staleTime: 1000 * 60 * 60

    })

    return {
        profile: data?.data,
        isLoadingProfile: isLoading,
        isErrorProfile: isError
    }
}