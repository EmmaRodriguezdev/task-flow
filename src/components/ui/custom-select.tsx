import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "./select";

type SelectOptions = {
  value: string | number;
  label: string;
};

const CustomSelect = ({
  options,
  placeholder,
  onValueChange,
  defaultValue,
}: {
  options: SelectOptions[];
  placeholder: string;
  onValueChange: (value: string | number) => void;
  defaultValue: string;
}) => {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[full]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem key={`opt-${index}`} value={option.value.toString()}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
