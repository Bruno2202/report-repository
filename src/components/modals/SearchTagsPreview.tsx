import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { reportTags } from "../../data/tags";
import SearchTagInput from "../inputs/SearchTagInput";
import type { TagModel } from "../../models/TagModel";

interface TagsPreviewProps {
    selectedTags: TagModel[];
    setSelectedTags: React.Dispatch<React.SetStateAction<TagModel[]>>;
}

const SearchTagsPreview: React.FC<TagsPreviewProps> = ({ selectedTags, setSelectedTags }) => {
    const [searchResult, setSearchResult] = useState<TagModel[]>(reportTags);
    const [searchParam, setSearchParam] = useState<string>("");
    const { isOpenModal, closeModal } = useContext(ModalContext)!;

    useEffect(() => {
        const result = reportTags.filter(tag =>
            tag.name.toUpperCase().includes(searchParam.toUpperCase())
        );
        setSearchResult(result);
    }, [searchParam]);

    return (
        isOpenModal("SearchTagsPreview") && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30 backdrop-blur-xs">
                <div className="flex flex-col z-40 gap-4 w-1/3 max-w-4xl">
                    <SearchTagInput
                        onChange={(e) => setSearchParam(e.target.value)}
                        searchParam={searchParam}
                        setSearchParam={setSearchParam}
                    />

                    <div className="flex flex-col text-white font-medium gap-2 bg-aside-dark border border-border-dark rounded-xl p-4 max-h-96 overflow-y-auto">
                        {searchResult.length > 0 ? (
                            searchResult.map((tag) => {
                                const isChecked = selectedTags.some(t => t.id === tag.id);

                                return (
                                    <label
                                        key={tag.id}
                                        className="flex flex-row gap-2 items-center hover:bg-white/5 p-2 rounded-lg transition-colors cursor-pointer select-none"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={e => {
                                                if (e.target.checked) {
                                                    setSelectedTags([...selectedTags, tag]);
                                                } else {
                                                    setSelectedTags(selectedTags.filter(t => t.id !== tag.id));
                                                }
                                            }}
                                            className="w-5 h-5 cursor-pointer appearance-none rounded border border-border-dark checked:bg-blue checked:border-blue relative checked:after:content-['✔'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-white checked:after:text-[10px]"
                                        />

                                        <span className="text-white font-medium flex-1">
                                            {tag.name}
                                        </span>
                                    </label>
                                );
                            })
                        ) : searchParam && (
                            <p className="text-gray-400 italic text-sm text-center">Nenhuma tag encontrada.</p>
                        )}
                    </div>
                </div>
                <div
                    className="fixed inset-0 cursor-pointer"
                    onClick={() => {
                        setSearchParam("");
                        closeModal("SearchTagsPreview");
                    }}
                />
            </div>
        )
    );
}

export default SearchTagsPreview;