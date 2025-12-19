import React, { useContext, useState, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { ReportContext } from "../../contexts/ReportContext";
import { ModalContext } from "../../contexts/ModalContext";
import { ReportService } from "../../services/ReportService";
import toast from "react-hot-toast";
import AddTag from "../AddTag";
import FieldTag from "../Field";
import type { ReportModel } from "../../models/ReportModel";
import type { TagModel } from "../../models/TagModel";
import ReportTagsPreview from "./ReportTagsPreview";

const EditReport: React.FC = () => {
    const { report, setReport, setReports } = useContext(ReportContext)!;
    const { isOpenModal, closeModal } = useContext(ModalContext)!;

    const [updating, setUpdating] = useState<boolean>(false);
    const [openDescription, setOpenDescription] = useState<boolean>(false);
    const [openTags, setOpenTags] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [type, setType] = useState<string>(report.type);
    const [selectedTags, setSelectedTags] = useState<TagModel[]>([]);

    useEffect(() => {
        if (report) {
            setTitle(report.title || report.xml || "");
            setDescription(report.description || "");
            setSelectedTags(report.tags || []);
            setType(report.type || 'R');
        }
    }, [report]);

    async function handleUpdateReport() {
        try {
            setUpdating(true);

            const data: ReportModel = {
                ...report,
                title,
                description,
                type,
                tags: selectedTags
            }

            await ReportService.updateReport(report.folder, data);
            await handleRefreshReports();

            toast.success("Relatório atualizado com sucesso!");
            closeModal("EditReport");
        } catch {
            toast.error("Erro ao atualizar o relatório. Tente novamente.");
        } finally {
            setUpdating(false);
        }
    }

    async function handleRefreshReports() {
        const data: ReportModel[] = await ReportService.getReports();
        setReports(data);
    }

    function handleCloseModal() {
        setReport({} as ReportModel);
        closeModal("EditReport");
    }

    if (!isOpenModal("EditReport")) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-25">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
                    onClick={handleCloseModal}
                />

                <div className="relative bg-card-dark border border-border-dark rounded-xl w-3/4 max-w-5xl text-white z-30 h-4/5 overflow-y-auto">
                    <div className="flex flex-row justify-between items-center px-6 py-4 border-b border-border-dark bg-aside-dark/50">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold">Editar Relatório</h2>
                        </div>
                        <button
                            className="p-1.5 hover:bg-error/20 rounded-lg hover:text-error text-gray transition-all cursor-pointer"
                            onClick={handleCloseModal}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-6 overflow-hidden flex flex-col flex-1">
                        <div className="flex flex-col gap-2 mb-4">
                            <label className="text-sm text-gray-300">Título do Relatório</label>
                            <div className="flex flex-row">
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Digite o título..."
                                    className="py-2 px-4 border border-border-dark rounded-xl w-full outline-none focus:border-blue transition-colors bg-card-dark placeholder:text-dark-gray text-white"
                                />
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="py-2 pl-4 pr-10 border border-border-dark rounded-xl outline-none focus:border-blue transition-colors bg-card-dark text-white ml-2 cursor-pointer"
                                >
                                    <option value="R" className="bg-card-dark">Relatório</option>
                                    <option value="E" className="bg-card-dark">Exportação</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => setOpenDescription(!openDescription)}
                                className="cursor-pointer  w-full flex justify-between items-center bg-aside-dark px-4 py-2 rounded-lg border border-border-dark hover:border-blue transition-colors"
                            >
                                <span className="font-medium">Descrição (Markdown)</span>
                                {openDescription ? <ChevronUp /> : <ChevronDown />}
                            </button>

                            <div
                                className={`grid transition-all duration-300 overflow-hidden ${openDescription ? "grid-rows-1 mt-3" : "grid-rows-[0fr]"
                                    }`}
                            >
                                <div className="grid grid-cols-2 gap-4 overflow-hidden">
                                    <textarea
                                        className="bg-body-dark border border-border-dark rounded-xl p-3 w-full h-96 resize-none outline-none focus:border-blue"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Digite a descrição em Markdown..."
                                    />

                                    <div className="prose prose-invert max-w-none h-96 overflow-y-auto border border-border-dark rounded-xl p-3 bg-aside-dark">
                                        <Markdown remarkPlugins={[remarkGfm]}>
                                            {description || "_Pré-visualização do Markdown..._"}
                                        </Markdown>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setOpenTags(!openTags)}
                                className="cursor-pointer w-full flex justify-between items-center bg-aside-dark px-4 py-2 rounded-lg border border-border-dark hover:border-blue transition-colors"
                            >
                                <span className="font-medium">Tags</span>
                                {openTags ? <ChevronUp /> : <ChevronDown />}
                            </button>

                            {openTags && (
                                <div className="flex transition-all duration-300 mt-3">
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
                            )}
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                onClick={handleUpdateReport}
                                disabled={updating}
                                className="text-sm font-medium bg-blue hover:bg-blue-hover transition-colors rounded-xl p-2 min-w-40 flex items-center justify-center cursor-pointer"
                            >
                                {updating ? (
                                    <span className="loader border-2 w-4 h-4 rounded-full border-transparent border-l-white animate-spin"></span>
                                ) : "💾 Salvar Alterações"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ReportTagsPreview
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
            />
        </>
    );
};

export default EditReport;
