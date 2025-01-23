import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureCardItem } from "./featureCardItems";
import { Check } from "lucide-react";

export default function FeatureCard({
    benefits,
    description,
    title
}: FeatureCardItem) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ul>
                    {benefits.map(benefit => (
                        <li key={benefit} className="flex gap-1">
                            {benefit} <Check />
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}
