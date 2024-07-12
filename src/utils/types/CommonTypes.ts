export type BaseResult<T> = {
    data: T
    success: boolean
    errors: {
        errorCode: number
        fieldName: string
        description: string
    }[]|null
}

export type AppSearchFormValues = {
    searchValue: string
}


export type FireBaseFile = {
    url: string,
    fullPath: string
}

export type AllProjectRatingStatisticType = {
    totalNumberOfRates: number
    totalProjectsCount:number
    totalProjectsHasRatedCount:number
    topProjectRate: string
    numberOfRates: {
        rating: number
        count: number
    }[]
} 
