import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { SearchContext } from "../../contexts/SearchContext";
import { productTags, type Tag } from "../../data/tags";
import SearchTagInput from "../inputs/SearchTagInput";

interface TagsPreviewProps {
    mode: "filter" | "edit";
    tags: Tag[];
}

const TagsPreview: React.FC<TagsPreviewProps> = ({ mode, tags }) => {
    const [result, setResult] = useState<Tag[]>(productTags);
    const [searchParam, setSearchParam] = useState<string>("");

    const { isOpenModal, closeModal } = useContext(ModalContext)!;

    useEffect(() => {
        const handleSearchChange = (): void => {
            const searchResult = productTags.filter(tag => tag.name.toUpperCase().includes(searchParam.toUpperCase()));
            setResult(searchResult.map(tag => tag));
        }

        handleSearchChange();
    }, [searchParam]);

    return (
        isOpenModal("TagsPreview") &&
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30 backdrop-blur-xs">
            <div className="flex flex-col z-40 gap-4 w-1/3 max-w-4xl">
                <SearchTagInput onChange={(e) => setSearchParam(e.target.value)} />

                <div className="flex flex-col text-white font-medium gap-2 bg-aside-dark border border-border-dark rounded-xl p-4 max-h-96 overflow-y-auto">
                    {result.length > 0 ? (
                        result.map((tag) =>
                            <div className="flex flex-row gap-2 items-center">
                                <input
                                    type="checkbox"
                                    checked={tags.includes(tag)}
                                    onChange={e => {
                                        if (e.target.checked) {
                                            setTags([...tags, tag]);
                                        } else {
                                            setTags(tags.filter(t => t.id !== tag.id));
                                        }
                                    }}
                                    className="w-5 h-5 cursor-pointer appearance-none rounded border border-gray-400 checked:bg-blue checked:border-blue checked:after:content-['✔'] checked:after:text-white checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-sm"
                                />
                                {tag.name}
                            </div>
                        )
                    ) : searchTagsParam && (
                        <p>Nenhuma tag encontrada.</p>
                    )}
                </div>
            </div>
            <div
                className="fixed inset-0 cursor-pointer"
                onClick={() => {
                    setSearchTagsParam("");
                    closeModal("TagsPreview")
                }}
            />
        </div >
    );
}

export default TagsPreview;