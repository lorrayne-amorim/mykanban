type Props = {
    title: string
    description: string
    time?: string
    onClick?: () => void
}

export default function NotificationCard({ title, description, time, onClick }: Props) {
    return (
        <div
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onClick?.()}
            className="bg-white hover:bg-purple-50 border-l-4 border-purple-700 rounded-md shadow-md p-4 cursor-pointer transition w-full max-w-sm"
        >
            <h4 className="text-purple-800 font-semibold text-sm">{title}</h4>
            <p className="text-gray-600 text-sm mt-1">{description}</p>
            {time && <span className="text-gray-400 text-xs mt-2 block">{time}</span>}
        </div>
    )
}
