import { ReactNode } from "react"

export const ListItem = ({ children }: { children: ReactNode}) => {
    return (
        <li className="rounded-sm shadow-md p-2 hover:bg-gray-50 transition-all duration-100 w-full">
            {children}
        </li>
    )
}

export const List = ({ children }: { children: ReactNode}) => {
    return (
        <ul className="w-full rounded-sm border p-6 space-y-2">
            {children}
        </ul>
    )
}
