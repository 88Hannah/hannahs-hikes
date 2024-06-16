export interface User {
    userId: string,
    dispayName: string | null,
    profilePicture: string | null,
    role: "user" | "leader" | "admin",
    stats: object,
    hikes: Hike[]
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