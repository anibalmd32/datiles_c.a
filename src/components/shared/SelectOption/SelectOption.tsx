import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
// import { useState } from "react";

export type SelectOptionItem = {
    value: string;
    label: string;
};

interface Props {
    options: SelectOptionItem[];
    placeholder: string;
    onExternalChange: (value: string) => void;
}

export function SelectOptions(props: Props) {
    // const [defaultValue] = useState(" ");

    const { onExternalChange, options, placeholder } = props;

    return (
        <Select onValueChange={onExternalChange}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.length > 0 &&
                    options.map((option, i) => {
                        return (
                            <SelectItem key={i} value={option.value}>
                                {option.label}
                            </SelectItem>
                        );
                    })}
            </SelectContent>
        </Select>
    );
}
