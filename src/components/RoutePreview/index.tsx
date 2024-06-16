import Link from "next/link"

interface RoutePreviewProps { 
    routeId: string,
    routeName: string, 
    routeImg: string
}

export default function RoutePreview({ routeId, routeName, routeImg }: RoutePreviewProps) {
    return (
        <Link href={`/routes/${routeId}`}>
            <img src={routeImg} alt={routeName} />
            <h3>{routeName}</h3>
        </Link>
    )
}