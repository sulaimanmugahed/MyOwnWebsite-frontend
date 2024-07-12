export type Profile = {
    personalData: PersonalData;
    educations: Education[];
    languages: Language[];
    socials: Social[];
    experience?: Experience[]
    skillsGroups: SkillsGroup[];
};

export const generateFakeExperience = (): Experience => {
    const companies = ["Google", "Amazon", "Meta", "Apple", "Microsoft"];
    const titles = ["Software Engineer", "Data Scientist", "Product Manager", "UX Designer", "Full-Stack Developer"];
    const locations = ["Mountain View, CA", "Seattle, WA", "New York, NY", "London, UK", "Berlin, Germany"];
    const descriptions = [
        "Developed and maintained scalable web applications using React and Node.js.",
        "Built and deployed machine learning models for customer churn prediction.",
        "Led the development and launch of a new mobile app that increased user engagement by 20%.",
        "Designed and implemented user interfaces that focused on usability and user experience.",
        "Contributed to the development of a full-stack e-commerce platform from scratch."
    ];

    const randomCompany = companies[Math.floor(Math.random() * companies.length)];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    // Generate random start date within the last 10 years
    const startDate = new Date(Date.now() - Math.floor(Math.random() * 10) * 31536000000); // 10 years in milliseconds

    // Randomly decide if there's an end date (50% chance)
    const endDate = Math.random() < 0.5 ? null : new Date(startDate.getTime() + Math.floor(Math.random() * 31536000000)); // Up to 10 years after start date

    return {
        company: randomCompany,
        title: randomTitle,
        location: randomLocation,
        startDate: startDate,
        endDate: endDate ?? undefined,
        description: randomDescription,
    };
}

export type PersonalData = {
    firstName: string;
    lastName: string;
    picture: string;
    headline: string;
    summary: string;
    about: string;
    fullName: string;
    birthday: Date;
    address: string;
    phoneNumber: string;
    email: string;
};

type Education = {
    institution: string;
    department: string;
    major: string;
    startDate: Date;
    endDate: Date;
    degree: string;
};

type Language = {
    name: string;
    level: string;
};

type Social = {
    name: string;
    link: string;
};

type SkillsGroup = {
    type: string;
    skills: string[];
};



type Experience = {
    company: string;
    title: string;
    location: string;
    startDate: Date;
    endDate?: Date; // Optional end date
    description: string;
};