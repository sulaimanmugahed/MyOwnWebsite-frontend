
import { FireBaseFile } from "./CommonTypes"

export type Project = {
    id: string
    title: string
    description: string
    created: Date
    features?: string[]
    totalRate: number;
    ratings: number[]
    images: string[]
}

export type ProjectDto = {
    id: string
    title: string
    description: string
    totalRate: number
    homeImage: string
    startDate: Date
}

export type ProjectImage = {

} & FireBaseFile

export type ProjectDetailsDto = {
    id: string
    title: string
    description: string
    totalRateAverage: number
    homeImage: ProjectImage
    startDate: Date,
    endDate: Date | null
    created: Date
    features?: string[]
    ratingAverages: RatingAverage[]
    totalRateCount: number
    additionalImages: ProjectImage[]
    githubLink?: string

}

type RatingAverage = {
    rate: number,
    average: number
}


export type ProjectRateRequest = {
    projectId: string,
    rateValue: number
}

export type UserRateType = {
    rate: number,
    rateAt: Date
}


export type ProjectFeature = {

}

export type ProjectCommandType = {
    title: string
    description?: string
    homeImage?: ProjectImage | undefined
    features: string[]
    additionalImages?: ProjectImage[]
    githubLink?: string
    startDate: string
    endDate: string | null
    images?: ProjectImage[]
}
// export type EditProjectRequest = {
//     id: string

// } & CreateProjectRequest


export type ProjectFilterType = {
    name: string
    value: string
}
