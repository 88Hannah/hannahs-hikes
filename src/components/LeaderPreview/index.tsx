interface LeaderPreviewProps { 
    leaderId: string,
    displayName: string, 
    profileUrl: string,
    handleClick: (id: string) => void
}

export default function LeaderPreview({ leaderId, displayName, profileUrl, handleClick }: LeaderPreviewProps) {
    return (
        <div onClick={() => handleClick(leaderId)}>
            <img src={profileUrl ?? "default-images/default-profile-picture.jpg"} alt={displayName} />
            <h3>{displayName}</h3>
        </div>
    )
}