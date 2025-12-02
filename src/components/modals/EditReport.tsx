import React, { useContext, useState, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { X } from "lucide-react";
import { ReportContext } from "../../contexts/ReportContext";
import { ModalContext } from "../../contexts/ModalContext";
import { ReportService } from "../../services/ReportService";
import toast from "react-hot-toast";

const EditReport: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [updating, setUpdating] = useState<boolean>(false);

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

            setUpdating(false);
            closeModal("EditReport");
        } catch (error) {
            setUpdating(false);
            toast.error("Erro ao atualizar o relatório. Tente novamente.");
        }
    }

    if (!isOpenModal("EditReport")) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-25">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
                onClick={() => closeModal("EditReport")}
            />

            <div className="relative bg-card-dark border border-border-dark rounded-md p-6 w-3/4 max-w-5xl text-white z-50 h-4/5 overflow-y-auto">
                <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Editar Relatório</h2>

                    <button
                        className="p-1 hover:bg-error/12 rounded-md hover:text-error cursor-pointer transition-colors"
                        onClick={() => closeModal("EditReport")}
                    >
                        <X size={28} />
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-300">Título do Relatório</label>
                        <input
                            type="text"
                            className="py-2 px-4 border border-border-dark rounded-md w-full outline-none focus:border-blue transition-colors bg-card-dark placeholder:text-dark-gray text-white"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Digite o título..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 h-140">
                        <div className="flex flex-col h-full">
                            <label className="text-sm text-gray mb-2">Descrição (Markdown)</label>
                            <textarea
                                className="bg-body-dark border border-border-dark rounded-md p-3 w-full h-full resize-none outline-none focus:border-blue"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Digite a descrição em Markdown..."
                            />
                        </div>

                        <div className="prose prose-invert max-w-none h-full overflow-y-auto border border-border-dark rounded-md p-4 bg-aside-dark">
                            <Markdown remarkPlugins={[remarkGfm]}>
                                {description || "_Pré-visualização do Markdown..._"}
                            </Markdown>
                        </div>

                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        className="text-sm font-medium bg-blue hover:bg-blue-hover transition-colors rounded-md p-2 cursor-pointer flex items-center justify-center min-w-40"
                        onClick={handleUpdateReport}
                        disabled={updating}
                    >
                        {updating ? (
                            <span className="loader border-2 w-4 h-4 rounded-full border-transparent border-l-white animate-spin"></span>
                        ) : (
                            "💾 Salvar Alterações"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditReport;
