import { X } from "lucide-react"
import type { TagModel } from "../models/TagModel";

interface FieldTagProps {
    tag: TagModel;
    selectedTags: TagModel[];
    setSelectedTags: React.Dispatch<React.SetStateAction<TagModel[]>>
}

const FieldTag: React.FC<FieldTagProps> = ({ tag, selectedTags, setSelectedTags }) => {
    return (
        <span
            onClick={() => setSelectedTags(selectedTags.filter(t => t.id !== tag.id))}
            className="flex px-2 py-1 bg-blue/12 text-sm rounded-full gap-1 items-center select-none cursor-pointer"
        >
            <p className="flex flex-row items-center gap-2 text-blue text-sm hover: font-medium">
                {tag.name} <X size={16} />
            </p>
        </span>
    )
}

export default FieldTag