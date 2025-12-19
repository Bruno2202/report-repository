import { Plus } from "lucide-react";
import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

interface AddTagProps {
    modal: string;
}

const AddTag: React.FC<AddTagProps> = ({ modal }) => {
    const { openModal } = useContext(ModalContext)!;

    return (
        <span
            className="flex p-1 bg-blue/12 text-sm rounded-full gap-1 items-center select-none cursor-pointer border border-blue ml-2"
            onClick={() => openModal(modal)}
        >
            <Plus size={16} className="text-blue" />
        </span>
    );
}

export default AddTag;