import { Button, ButtonProps } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface Props extends ButtonProps {
  text: string;
  Icon: LucideIcon;
}

export function IconButton({ text, Icon, ...props }: Props) {
    return (
        <Button className="flex gap-2" {...props}>
            <Icon />
            <span>{text}</span>
        </Button>
    );
}
