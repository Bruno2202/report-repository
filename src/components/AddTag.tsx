import { Plus } from "lucide-react";
import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

interface AddTagProps {
    modal: string;
}

const AddTag: React.FC<AddTagProps> = ({ modal }) => {
    const { openModal } = useContext(ModalContext)!;

    return (
        <button
            type="button"
            className={`
                group flex items-center justify-center
                p-1.5 ml-2 
                bg-blue/10 hover:bg-blue/20 
                text-blue border border-blue/30 hover:border-blue
                rounded-full transition-all duration-200 
                hover:scale-110 active:scale-95
                shadow-sm hover:shadow-blue/20
                cursor-pointer outline-none
            `}
            onClick={() => openModal(modal)}
            title="Adicionar Tag"
        >
            <Plus 
                size={16} 
                className="transition-transform duration-200 group-hover:rotate-90" 
            />
        </button>
    );
}

export default AddTag;