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
    roles: Role[],
    details: MemberDetails | null,
    stats: MemberStats | null,
    hikes: Hike[],
    createdUtc: string,
    updatedUtc: string
}

export interface FetchedMember extends Member {
    id: string
}

export type HikeStatus = "scheduled" | "in progress" | "completed" | "cancelled" | "postponed";

export interface Hike {
    routeId: string,
    startTime: string,
    leader: string,
    participants: string[],
    createdUtc: string,
    updatedUtc: string,
    createdBy: string,
    updatedBy: string
    status: HikeStatus
}

export interface FetchedHike extends Hike {
    id: string
}

export interface Route {
    id?: string,
    coverPhotoUrl: string, 
    difficulty: string,
    distance: number,
    duration: number,
    meetingPoint: string,
    routeDescription: string,
    routeName: string,
    createdUtc: string,
    updatedUtc: string,
    createdBy: string,
    updatedBy: string
}