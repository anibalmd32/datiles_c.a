import { ReactNode } from "react";

export const ListItem = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <li
            className={`rounded-sm shadow-md p-2 hover:bg-gray-50 transition-all duration-100 w-full ${className}`}
        >
            {children}
        </li>
    );
};

export const List = ({ children }: { children: ReactNode }) => {
    return (
        <ul className="w-full rounded-sm border p-6 space-y-2">{children}</ul>
    );
};
