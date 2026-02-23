import { Plus } from "lucide-react";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";

interface AddTagProps {
    modal: string;
}

const AddTag: React.FC<AddTagProps> = ({ modal }) => {
    const context = useContext(ModalContext);
    if (!context) return null;
    const { openModal } = context;

    return (
        <button
            type="button"
            onClick={() => openModal(modal)}
            className={`
                flex items-center gap-1.5
                px-3 py-1
                /* Borda tracejada e fundo transparente criam contraste com as tags sólidas */
                bg-transparent border-2 border-dashed border-blue/40
                text-blue font-semibold text-sm
                rounded-full transition-all duration-200
                /* Efeito de destaque no hover */
                hover:border-blue hover:bg-blue hover:text-white
                hover:shadow-md hover:shadow-blue/20
                active:scale-95
                cursor-pointer outline-none
            `}
            title="Adicionar nova tag"
        >
            <Plus 
                size={14} 
                strokeWidth={3}
                className="transition-transform duration-300"
            />
            <span>Filtrar Tags</span>
        </button>
    );
}

export default AddTag;