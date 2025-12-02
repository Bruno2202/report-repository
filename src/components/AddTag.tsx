import { Plus } from "lucide-react";
import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

const AddTag: React.FC = () => {
    const { openModal } = useContext(ModalContext)!;

    return (
        <span
            className="flex p-1 bg-blue/12 text-sm rounded-full gap-1 items-center select-none cursor-pointer border border-blue ml-2"
            onClick={() => openModal("TagsPreview")}
        >
            <Plus size={16} className="text-blue" />
        </span>
    );
}

export default AddTag;