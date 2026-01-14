import type { TagModel } from "../../../models/TagModel";
import AddTag from "../../AddTag";
import FieldTag from "../../Field";

interface SelectTagsProps {
    selectedTags: TagModel[];
    setSelectedTags: React.Dispatch<React.SetStateAction<TagModel[]>>;
}

const SelectTags: React.FC<SelectTagsProps> = ({ selectedTags, setSelectedTags }) => {
    return (
        <div className="flex transition-all duration-300">
            <div className="flex flex-row flex-wrap items-center w-fit gap-2">
                {selectedTags.length > 0 &&
                    selectedTags.map((tag, key) => (
                        <FieldTag
                            key={key}
                            tag={tag}
                            selectedTags={selectedTags}
                            setSelectedTags={setSelectedTags}
                        />
                    ))
                }
                <AddTag modal="ReportTagsPreview" />
            </div>
        </div>
    );
}

export default SelectTags;
