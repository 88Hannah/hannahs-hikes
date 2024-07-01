interface LeaderPreviewProps { 
    leaderId: string,
    displayName: string, 
    profileUrl: string,
    handleClick: (id: string) => void
}

export default function LeaderPreview({ leaderId, displayName, profileUrl, handleClick }: LeaderPreviewProps) {
    return (
        <div onClick={() => handleClick(leaderId)} className="p-3 bg-[#FFE8D2] rounded-lg max-w-60 w-[calc(50%_-_0.75rem)] md:w-[calc(33%_-_0.75rem)] lg:w-[calc(25%_-_0.75rem)]">
            <img src={profileUrl ?? "default-images/default-profile-picture.jpg"} alt={displayName} className="rounded-lg w-full aspect-square bg-cover" />
            <h3 className="text-center mt-3 font-bold">{displayName}</h3>
        </div>
    )
}