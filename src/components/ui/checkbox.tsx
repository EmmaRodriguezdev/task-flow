import { Checkbox, CheckboxIndicator } from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

type CheckboxProps = {
  label: string;
  className?: string;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomCheckbox = (props: CheckboxProps) => {
  return (
    <div className="flex items-center">
      <Checkbox
        className="flex size-[25px] appearance-none items-center justify-center rounded bg-white shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px_black]"
        defaultChecked
        id="c1"
        onCheckedChange={(e) => props.setValue(!!e)}
      >
        <CheckboxIndicator className="text-violet11">
          <CheckIcon />
        </CheckboxIndicator>
      </Checkbox>
      <label
        className="pl-[15px] text-[18px] leading-none text-black"
        htmlFor="c1"
      >
        {props.label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
