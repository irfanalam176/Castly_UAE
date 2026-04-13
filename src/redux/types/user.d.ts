export interface Measurements {
    createdAt: string;
    dressSize: number;
    dressSizeUnit: string;
    height: number;
    heightUnit: string;
    id: string;
    pantsSize: number;
    pantsSizeUnit: string;
    shirtTopSize: string;
    shirtTopSizeUnit: string;
    shoeSize: number;
    shoeSizeUnit: string;
    userId: string;
    weight: number;
    weightUnit: string;
}

export interface Media {
    createdAt: string;
    fileType: string;
    id: string;
    type: string;
    url: string;
    userId: string;
}

export interface Skill {
    createdAt: string;
    id: string;
    skill: string;
    skillCategory: string;
    userId: string;
}

export interface User {
    companydescription?: string | null;
    companyName?: string | null;
    createdAt: string;
    dob: string;
    email: string;
    gender: string;
    id: string;
    imageUrl?: string | null;
    industry?: string | null;
    isActive: boolean;
    location?: string | null;
    logo?: string | null;
    measurements?: Measurements;
    media?: Media[];
    name: string;
    nationality: string;
    phoneNumber?: string | null;
    provider: string;
    role: string;
    skills?: Skill[];
    step: number;
    updatedAt: string;
    userBankAccounts?: any[];
    userMeasurementsId?: string;
    websiteUrl?: string | null;
}