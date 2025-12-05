import React, { useContext, useState, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { ReportContext } from "../../contexts/ReportContext";
import { ModalContext } from "../../contexts/ModalContext";
import { ReportService } from "../../services/ReportService";
import toast from "react-hot-toast";

const EditReport: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [updating, setUpdating] = useState<boolean>(false);

    const [openDescription, setOpenDescription] = useState<boolean>(false);
    const [openTags, setOpenTags] = useState<boolean>(false);

    const { report } = useContext(ReportContext)!;
    const { isOpenModal, closeModal } = useContext(ModalContext)!;

    useEffect(() => {
        if (report) {
            setTitle(report.xml || "");
            setDescription(report.description || "");
        }
    }, [report]);

    async function handleUpdateReport() {
        try {
            setUpdating(true);
            await ReportService.updateReport(report.folder, description);

            toast.success("Relatório atualizado com sucesso!");
            closeModal("EditReport");
        } catch {
            toast.error("Erro ao atualizar o relatório. Tente novamente.");
        } finally {
            setUpdating(false);
        }
    }

    if (!isOpenModal("EditReport")) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-25">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
                onClick={() => closeModal("EditReport")}
            />

            <div className="relative bg-card-dark border border-border-dark rounded-xl p-6 w-3/4 max-w-5xl text-white z-50 h-4/5 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Editar Relatório</h2>

                    <button
                        className="p-1 hover:bg-error/12 rounded-xl hover:text-error transition-colors cursor-pointer"
                        onClick={() => closeModal("EditReport")}
                    >
                        <X size={28} />
                    </button>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-sm text-gray-300">Título do Relatório</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Digite o título..."
                        className="py-2 px-4 border border-border-dark rounded-xl w-full outline-none focus:border-blue transition-colors bg-card-dark placeholder:text-dark-gray text-white"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => setOpenDescription(!openDescription)}
                        className="w-full flex justify-between items-center bg-aside-dark px-4 py-2 rounded-lg border border-border-dark hover:border-blue transition-colors"
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
                        className="w-full flex justify-between items-center bg-aside-dark px-4 py-2 rounded-lg border border-border-dark hover:border-blue transition-colors"
                    >
                        <span className="font-medium">Tags</span>
                        {openTags ? <ChevronUp /> : <ChevronDown />}
                    </button>

                    <div
                        className={`grid transition-all duration-300 overflow-hidden ${openTags ? "grid-rows-1 mt-3" : "grid-rows-[0fr]"
                            }`}
                    >
                    </div>
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
    );
};

export default EditReport;
