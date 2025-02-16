import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

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
    const [defaultValue, setDefaultValue] = useState(" ");

    const { onExternalChange, options, placeholder } = props;

    useEffect(() => {
        if (options.length > 0) {
            setDefaultValue(options[0].value);
        }
    }, [options]);

    return (
        <Select onValueChange={onExternalChange} defaultValue={defaultValue}>
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
