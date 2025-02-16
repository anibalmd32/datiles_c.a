// Component Hook
import { usePresentationCard } from "./usePresentationCard";

// Shadcn Components
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// Shared Components
import { IconButton } from "@/components/shared/IconButton/IconButton";

// Lucide Icons
import { Smile, DoorOpen } from "lucide-react";

export default function PresentationCard() {
    const { enterBtnOnClick } = usePresentationCard();

    return (
        <Card>
            <CardHeader>
                <CardTitle>DATILES C.A.</CardTitle>
                <CardDescription className="flex gap-1">
          Gestiona tu negocio eficientemente y crece para beneficio de los tuyos{" "}
                    <Smile />
                </CardDescription>
            </CardHeader>
            <CardContent>
                <IconButton onClick={enterBtnOnClick} Icon={DoorOpen} text="Entrar" />
            </CardContent>
        </Card>
    );
}
