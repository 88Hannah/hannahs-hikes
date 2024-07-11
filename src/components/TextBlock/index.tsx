export default function TextBlock({ children }) {
    return (
        <div className="my-6 space-y-3 text-justify">
            {children}
        </div>
    )
}