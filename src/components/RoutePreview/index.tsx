import Link from "next/link"

interface RoutePreviewProps { 
    routeId: string,
    routeName: string, 
    routeImg: string
}

export default function RoutePreview({ routeId, routeName, routeImg }: RoutePreviewProps) {
    return (
        <Link href={`/routes/${routeId}`} className="p-2 sm:p-3 bg-[#FFE8D2] rounded-lg max-w-60 w-[calc((100%_-_2*0.75em)/3)] md:w-[calc((100%_-_3*0.75em)/4)]">
            <img src={routeImg} alt={routeName} className="rounded-lg w-full aspect-square object-cover"/>
            <h2 className="text-center mt-2 sm:mt-3 text-sm sm:text-base font-bold">{routeName}</h2>
        </Link>
    )
}