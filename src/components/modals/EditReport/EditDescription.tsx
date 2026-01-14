import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface EditDescriptionProps {
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const EditDescription: React.FC<EditDescriptionProps> = ({ description, setDescription }) => {
    return (
        <div
            className="grid transition-all duration-300 overflow-hidden grid-rows-1"
        >
            <div className="grid grid-cols-2 gap-4 overflow-hidden">
                <textarea
                    className="bg-body-dark border border-border-dark rounded-xl p-3 w-full h-96 resize-none outline-none focus:border-blue text-sm"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Digite a descrição em Markdown..."
                />
                <div className="prose prose-invert prose-sm max-w-none h-96 overflow-y-auto border border-border-dark rounded-xl p-3 bg-aside-dark custom-scrollbar">
                    <Markdown remarkPlugins={[remarkGfm]}>
                        {description || "_Pré-visualização do Markdown..._"}
                    </Markdown>
                </div>
            </div>
        </div>
    );
}

export default EditDescription;