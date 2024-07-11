interface LeaderPreviewProps { 
    leaderId: string,
    displayName: string, 
    profileUrl: string,
    handleClick: (id: string) => void
}

export default function LeaderPreview({ leaderId, displayName, profileUrl, handleClick }: LeaderPreviewProps) {
    return (
        <div onClick={() => handleClick(leaderId)} className="p-2 sm:p-3 bg-[#FFE8D2] rounded-lg max-w-60 w-[calc((100%_-_2*0.75em)/3)] md:w-[calc((100%_-_3*0.75em)/4)]">
            <div className="rounded-lg w-full aspect-square bg-cover bg-center" style={{backgroundImage: `url(${profileUrl ?? "default-images/default-profile-picture.jpg"})` }}>
                {/* <img src={profileUrl ?? "default-images/default-profile-picture.jpg"} alt={displayName} className="w-full h-full" /> */}
            </div>
            <h2 className="text-center mt-2 sm:mt-3 text-sm sm:text-base font-bold">{displayName}</h2>
        </div>
    )
}