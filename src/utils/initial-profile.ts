import { BaseResult } from "./types/CommonTypes";
import { Profile } from "./types/ProfileTypes";

export const initialProfileResponse: BaseResult<Profile> = {
    data: {
        personalData: {
            firstName: "Sulaiman",
            lastName: "Mugahed",
            picture: "/images/my-profile.png",
            headline: "Full-stack Developer",
            summary: "Driven by a love for building full-stack applications, I'm a .NET backend developer with a burning desire to learn and grow. While I'm expanding my skills with React, my heart lies in the exciting world of backend development using .NET",
            about: "Driven by a love for building full-stack applications, I'm a .NET backend developer with a burning desire to learn and grow. While I'm expanding my skills with React, my heart lies in the exciting world of backend development using .NET. Here, I relish the challenge of crafting robust experiences, one line of code at a time. I'm eager to dive deeper into this intricate world and contribute to building amazing applications!",
            fullName: "Sulaiman Tawfik Thabit Mohammed Mugahed",
            birthday: new Date("2001-07-06T00:00:00Z"),
            address: "Tai`zz, Yemen",
            phoneNumber: "+967773050577",
            email: "sulaimanmugahed@gmail.com",
        },
        educations: [
            {
                institution: "Alata`a University",
                department: "Engineering",
                major: "IT",
                startDate: new Date("2020-01-01T00:00:00Z"),
                endDate: new Date("2024-01-01T00:00:00Z"),
                degree: "Bachelor`s",
            },
        ],
        experience: [],
        languages: [
            {
                name: "Arabic",
                level: "Native",
            },
            {
                name: "English",
                level: "Intermediate",
            },
        ],
        socials: [
            {
                name: "Instagram",
                link: "https://www.instagram.com/sulaimanmugahed/",
            },
            {
                name: "Linkedin",
                link: "https://www.linkedin.com/in/sulaimanmugahed/",
            },
            {
                name: "Github",
                link: "https://www.github.com/sulaimanmugahed/",
            },
        ],
        skillsGroups: [
            {
                type: "Programming Language",
                skills: ["CSharp", "Javascript & Typescript"],
            },
            {
                type: "Frameworks",
                skills: [
                    "Asp.net Core",
                    "React"
                ]
            },
            {
                type: "DataBases",
                "skills": [
                    "Microsoft SQL Server",
                    "Postgresql",
                    "Redis"
                ]
            },
            {
                type: "Tools",
                skills: [
                    "Git & Github",
                    "Docker"
                ]
            },
            {
                type: "Others",
                skills: [
                    "Design patterns",
                    "Clean Architecture",
                    "Overview on Microservices Architecture"
                ]
            }

        ],
    },
    success: true,
    errors: null,
};