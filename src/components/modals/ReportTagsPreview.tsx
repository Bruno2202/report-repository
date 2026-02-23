import React, { useContext, useEffect, useState, useCallback } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import SearchTagInput from "../inputs/SearchTagInput";
import type { TagModel } from "../../models/TagModel";
import { ReportService } from "../../services/ReportService";
import { Plus, ArrowLeft, Save, FolderPlus, X } from "lucide-react";
import Button from "../buttons/Button";
import { twMerge } from "tailwind-merge";
import { List, type RowComponentProps } from "react-window";

interface CategoryModel {
    id: number;
    name: string;
}

interface ReportTagsPreviewProps {
    selectedTags: TagModel[];
    setSelectedTags: React.Dispatch<React.SetStateAction<TagModel[]>>;
}

const RowComponent = ({ index, data, style }: RowComponentProps<{ data: { searchResult: TagModel[], selectedTags: TagModel[], onToggle: (tag: TagModel) => void } }>) => {
    const { searchResult, selectedTags, onToggle } = data;
    const tag = searchResult[index];

    const isChecked = selectedTags.some((t: any) => t.id === tag.id);

    return (
        <div style={style} className="px-2">
            <label className={twMerge(
                "flex flex-row gap-3 items-center p-2 rounded-lg transition-colors cursor-pointer select-none group mb-1",
                isChecked ? "bg-blue/10 border border-blue/20" : "hover:bg-white/5 border border-transparent"
            )}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggle(tag)}
                    className="w-5 h-5 cursor-pointer appearance-none rounded border border-border-dark checked:bg-blue checked:border-blue relative checked:after:content-['✔'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-white checked:after:text-[10px] transition-all"
                />
                <div className="flex flex-col flex-1">
                    <span className="text-white font-medium text-sm leading-tight">{tag.name}</span>
                    <span className="text-gray-500 text-[10px] uppercase tracking-wider font-bold">{tag.category}</span>
                </div>
            </label>
        </div>
    );
};

const ReportTagsPreview: React.FC<ReportTagsPreviewProps> = ({ selectedTags, setSelectedTags }) => {
    const { isOpenModal, closeModal } = useContext(ModalContext)!;

    const [tagsData, setTagsData] = useState<TagModel[]>([]);
    const [categories, setCategories] = useState<CategoryModel[]>([]);

    const [view, setView] = useState<"list" | "create-tag" | "create-category">("list");
    const [searchParam, setSearchParam] = useState<string>("");
    const [searchResult, setSearchResult] = useState<TagModel[]>([]);

    const [isSaving, setIsSaving] = useState(false);

    const [newName, setNewName] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [newCategoryName, setNewCategoryName] = useState("");

    const isVisible = isOpenModal("ReportTagsPreview");

    useEffect(() => {
        if (isVisible) {
            fetchTags();
            fetchCategories();
        }
    }, [isVisible]);

    const fetchTags = async () => {
        try {
            const data = await ReportService.getTags();
            setTagsData(data || []);
        } catch (error) { console.error(error); }
    };

    const fetchCategories = async () => {
        try {
            const data = await ReportService.getCategories();
            setCategories(data || []);
        } catch (error) { console.error(error); }
    };

    useEffect(() => {
        const param = searchParam.trim().toUpperCase();
        if (param.length > 0) {
            const result = tagsData.filter(tag =>
                tag.name.toUpperCase().includes(param) ||
                tag.category.toUpperCase().includes(param)
            );
            setSearchResult(result);
        } else {
            setSearchResult(tagsData);
        }
    }, [searchParam, tagsData]);

    const handleCreateTag = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName || !selectedCategoryId) return;
        setIsSaving(true);
        try {
            await ReportService.createTag({ name: newName, category_id: selectedCategoryId });
            setNewName("");
            setView("list");
            fetchTags();
        } catch (error) { console.error(error); }
        finally { setIsSaving(false); }
    };

    const handleCreateCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName) return;
        setIsSaving(true);
        try {
            await ReportService.createCategory({ name: newCategoryName });
            setNewCategoryName("");
            await fetchCategories();
            setView("create-tag");
        } catch (error) { console.error(error); }
        finally { setIsSaving(false); }
    };

    const handleToggleTag = useCallback((tag: TagModel) => {
        setSelectedTags(prev => {
            const exists = prev.some(t => t.id === tag.id);
            if (exists) return prev.filter(t => t.id !== tag.id);
            return [...prev, tag];
        });
    }, [setSelectedTags]);

    const handleClose = () => {
        closeModal("ReportTagsPreview");
        setSearchParam("");
        setView("list");
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4 text-left overflow-auto">
            <div className="relative w-full max-w-lg animate-in fade-in zoom-in duration-200 overflow-auto">

                {view === "list" && (
                    <div className="flex flex-col h-[400px] overflow-auto">
                        <div className="flex gap-2 mb-4">
                            <div className="flex-1">
                                <SearchTagInput
                                    onChange={(e) => setSearchParam(e.target.value)}
                                    searchParam={searchParam}
                                    setSearchParam={setSearchParam}
                                />
                            </div>
                            <button
                                onClick={() => setView("create-tag")}
                                className="bg-blue hover:bg-blue-hover text-white px-4 rounded-xl transition-all shadow-lg shadow-blue/20 active:scale-95 cursor-pointer"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        <div className="p-4 border border-t-border-dark border-x-border-dark flex justify-between items-center bg-body-dark rounded-t-2xl">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                Tags Disponíveis ({searchResult.length})
                            </span>
                            {selectedTags.length > 0 && (
                                <span className="text-[10px] bg-blue px-2 py-0.5 rounded-full text-white font-bold">
                                    {selectedTags.length} selecionadas
                                </span>
                            )}
                        </div>

                        <div className="bg-aside-dark border border-border-dark rounded-b-2xl shadow-2xl overflow-auto">
                            <div className="py-2 overflow-auto">
                                {searchResult.length > 0 ? (
                                    <List
                                        rowComponent={RowComponent}
                                        rowCount={searchResult.length}
                                        rowHeight={60}
                                        rowProps={{
                                            data: {
                                                searchResult,
                                                selectedTags,
                                                onToggle: handleToggleTag
                                            }
                                        }}
                                        className="overflow-auto"
                                    />
                                ) : (
                                    <div className="h-[350px] flex flex-col items-center justify-center text-gray-500 gap-2">
                                        <X size={40} className="opacity-20" />
                                        <p className="text-sm italic">Nenhuma tag encontrada.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {view === "create-tag" && (
                    <form onSubmit={handleCreateTag} className="bg-aside-dark border border-border-dark rounded-2xl p-6 flex flex-col gap-5 shadow-2xl text-left">
                        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                            <button type="button" onClick={() => setView("list")} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                                <ArrowLeft size={20} />
                            </button>
                            <h2 className="text-white font-bold text-lg">Criar Nova Tag</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-1.5 text-left">
                                <label className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Nome da Tag</label>
                                <input
                                    autoFocus
                                    value={newName}
                                    onChange={e => setNewName(e.target.value)}
                                    placeholder="Ex: Faturamento"
                                    className="bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-blue outline-none transition-all placeholder:text-white/10"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5 text-left">
                                <div className="flex justify-between items-center">
                                    <label className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Categoria</label>
                                    <button
                                        type="button"
                                        onClick={() => setView("create-category")}
                                        className="text-blue hover:text-blue-hover text-[10px] font-bold uppercase flex items-center gap-1 transition-colors cursor-pointer"
                                    >
                                        <FolderPlus size={14} /> Nova Categoria
                                    </button>
                                </div>
                                <select
                                    value={selectedCategoryId}
                                    onChange={e => setSelectedCategoryId(e.target.value)}
                                    className="bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-blue outline-none transition-all cursor-pointer appearance-none"
                                >
                                    <option value="" className="bg-aside-dark">Selecione uma categoria...</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id} className="bg-aside-dark">{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <Button
                            text={isSaving ? "Salvando..." : "Salvar Tag"}
                            icon={Save}
                            onClick={() => { }}
                            loading={isSaving}
                            disabled={!newName || !selectedCategoryId}
                            className="w-full py-3"
                        />
                    </form>
                )}

                {view === "create-category" && (
                    <form onSubmit={handleCreateCategory} className="bg-aside-dark border border-border-dark rounded-2xl p-6 flex flex-col gap-5 shadow-2xl text-left">
                        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                            <button type="button" onClick={() => setView("create-tag")} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                                <ArrowLeft size={20} />
                            </button>
                            <h2 className="text-white font-bold text-lg">Nova Categoria</h2>
                        </div>

                        <div className="flex flex-col gap-1.5 text-left">
                            <label className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Nome da Categoria</label>
                            <input
                                autoFocus
                                value={newCategoryName}
                                onChange={e => setNewCategoryName(e.target.value)}
                                placeholder="Ex: Financeiro"
                                className="bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-blue outline-none transition-all placeholder:text-white/10"
                            />
                        </div>

                        <Button
                            text={isSaving ? "Criando..." : "Criar Categoria"}
                            icon={FolderPlus}
                            onClick={() => { }}
                            loading={isSaving}
                            disabled={!newCategoryName}
                            className="w-full py-3"
                        />
                    </form>
                )}
            </div>

            <div className="fixed inset-0 -z-10" onClick={handleClose} />
        </div>
    );
};

export default ReportTagsPreview;