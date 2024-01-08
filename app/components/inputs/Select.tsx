'use client'

import { Label } from "@/components/ui/label";
import ReactSelect from "react-select";

interface SelectProps {
    label: string;
    value? : Record<string, any>
    onChange: (value: Record<string, any>) => void;
    options: Record<string, any>[]
    disabled?: boolean
}

const Select:React.FC<SelectProps> = ({label, value, onChange, options, disabled}) => {
  return (
    <div className="z-[100] mt-[20px]">
        <Label>
            {label}
        </Label>
        <div className="mt-2">
            <ReactSelect
                isDisabled={disabled}
                value={value}
                onChange={onChange}
                options={options}
                isMulti
                styles={{
                    menuPortal:(base)=> ({
                        ...base,
                        zIndex: 9999,                       
                    })
                }}
                classNames={{
                    control : () => 'text-sm'
                }}
                
            />
        </div>
    </div>

  )
}

export default Select