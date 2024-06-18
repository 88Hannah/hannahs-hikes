export type Role = "basic" | "leader" | "admin"

export interface User {
    userId: string,
    displayName: string | null,
    profilePicture: string | null,
    role: Role,
    stats: object,
    hikes: Hike[],
    email: string,
    id?: string
}

export interface MemberDetails {
    bio: string,
    favRoute: string
}

export interface MemberStats {
    noHikes: number,
    totalDistance: number
}

export interface Member {
    displayName: string | null,
    profileUrl: string | null,
    email: string,
    role: Role,
    details: MemberDetails | null,
    stats: MemberStats | null,
    hikes: Hike[]
}

export interface FetchedMember extends Member {
    id: string
}


export interface Hike {
    length: number;
}

export interface Route {
    id?: string,
    coverPhotoUrl: string, 
    difficulty: string,
    distance: number,
    duration: number,
    meetingPoint: string,
    routeDescription: string,
    routeName: string
}