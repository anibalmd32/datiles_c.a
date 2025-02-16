import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Props {
  placeholder: string;
  value: string;
  onExternalChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function SearchInput(props: Props) {
    const { onExternalChange, placeholder, value } = props;

    return (
        <div className="relative flex-1">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder={placeholder}
                value={value}
                onChange={onExternalChange}
                className="pl-8"
            />
        </div>
    );
}
