import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export type SelectOptionItem = {
    value: string;
    label: string;
}

interface Props {
    options: SelectOptionItem[];
    placeholder: string;
    onExternalChange: (value: string) => void;
}

export function SelectOptions(props: Props) {
    return (
        <Select onValueChange={props.onExternalChange} defaultValue={props.options[0].value}>
            <SelectTrigger>
                <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent>
                {props.options.map(option => {
                    return (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )
}