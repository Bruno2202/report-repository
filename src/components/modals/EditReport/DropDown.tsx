import { ChevronDown, ChevronUp } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface DropDownProps {
    description: string;
    children?: React.ReactNode;
}

const DropDown: React.FC<DropDownProps> = ({ description, children }) => {
    const [openDropDown, setOpenDropDown] = useState<boolean>(false);

    return (
        <div className="flex flex-col gap-2">
            <button
                onClick={() => setOpenDropDown(!openDropDown)}
                className="cursor-pointer w-full flex justify-between items-center bg-aside-dark px-4 py-2 rounded-lg border border-border-dark hover:border-blue transition-colors"
            >
                <span className="font-medium">{description}</span>
                {openDropDown ? <ChevronUp /> : <ChevronDown />}
            </button>

            {openDropDown && (
                <div className="mb-4">
                    {children}
                </div>
            )}
        </div>
    );
}

export default DropDown;