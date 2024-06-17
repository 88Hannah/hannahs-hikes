export type Role = "user" | "leader" | "admin"

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