import React from "react";

export function ViewContainer({ children }: { children: React.ReactNode}) {

    return (
        <section className="container mx-auto px-4 w-full space-y-4">
            {children}
        </section>
    )
}
