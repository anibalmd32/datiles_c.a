import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Module Hooks
// import { useFeatureCard } from "../components/FeatureCard/useFeatureCard"

// Module Components
const PresentationCard = React.lazy(
    () => import("../components/PresentationCard/PresentationCard"),
);
// const FeatureCard = React.lazy(() => import('../components/FeatureCard/FeatureCard'))

// Module View
export function IndexPublic() {
    // const { featureCardItems } = useFeatureCard()

    return (
        <div className="w-full flex flex-col gap-8 justify-center items-center min-h-screen bg-gradient-to-br from-primary to-secondary">
            <Suspense fallback={<Skeleton className="w-[400px] h-[200px]" />}>
                <PresentationCard />
            </Suspense>

            {/* <div className="flex gap-4">
                {featureCardItems.map(item => (
                    <Suspense key={item.title} fallback={<Skeleton className="w-[400px] h-[200px]" />}>
                        <FeatureCard
                            benefits={item.benefits}
                            description={item.description}
                            title={item.title}
                        />
                    </Suspense>
                ))}
            </div> */}
        </div>
    );
}
