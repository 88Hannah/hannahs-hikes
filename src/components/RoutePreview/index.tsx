interface RoutePreviewProps { 
    key: string,
    routeName: string, 
    routeImg: string
}

export default function RoutePreview({ key, routeName, routeImg }: RoutePreviewProps) {
    return (
        <div key={key}>
            <img src={routeImg} alt={routeName} />
            <h3>{routeName}</h3>
        </div>
    )
}