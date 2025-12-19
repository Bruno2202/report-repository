import { Download, X } from "lucide-react";
import React, { useContext, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { ReportContext } from "../../contexts/ReportContext";
import toast from "react-hot-toast";
import { ReportService } from "../../services/ReportService";

const SqlPreview: React.FC = () => {
    const { report } = useContext(ReportContext)!;
    const { isOpenModal, closeModal } = useContext(ModalContext)!;

    const [loading, setLoading] = useState<boolean>(false);

    function handleCopySql() {
        const textToCopy = report.sql;
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                toast("🔗 SQL copiado");
            } else {
                toast.error("Falha ao copiar");
            }
        } catch (err) {
            toast.error("Erro ao copiar");
        }

        document.body.removeChild(textArea);
    }


    async function handleDownloadSql() {
        setLoading(true);
        await ReportService.downloadFile(report.folder, report.sqlFile)
        setLoading(false);
    }


    if (!isOpenModal("SqlPreview")) return null;

    const sqlLines = (report.sql || "-- Nenhum SQL encontrado.").split("\n");

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4">
            <div className="bg-card-dark border border-border-dark rounded-2xl shadow-2xl w-full max-w-5xl text-white z-50 overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex flex-row justify-between items-center px-6 py-4 border-b border-border-dark bg-aside-dark/50 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold">Preview SQL</h2>
                    </div>
                    <button
                        className="p-1.5 hover:bg-error/20 rounded-lg hover:text-error text-gray transition-all cursor-pointer"
                        onClick={() => closeModal("SqlPreview")}
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 overflow-hidden flex flex-col flex-1">
                    <div className="relative bg-black/40 border border-border-dark rounded-xl overflow-hidden font-mono text-sm flex-1 flex flex-col">
                        <div className="overflow-auto custom-scrollbar flex-1 bg-black/20" style={{ scrollbarGutter: 'stable' }}>
                            <div className="flex min-w-full w-fit">
                                <div className="bg-aside-dark/50 px-3 py-4 text-right select-none border-r border-border-dark text-dark-gray sticky left-0 z-10 min-w-[50px]">
                                    {sqlLines.map((_, i) => (
                                        <div key={i} className="leading-relaxed">{i + 1}</div>
                                    ))}
                                </div>

                                <pre className="p-4 text-light-blue leading-relaxed whitespace-pre pr-8 flex-1">
                                    <code>{report.sql || "-- Nenhum SQL encontrado."}</code>
                                </pre>
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-end mt-6 gap-4">
                        <button
                            className="group relative flex items-center justify-center gap-2 text-sm font-bold bg-blue hover:bg-blue-hover active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 transition-all rounded-xl py-2.5 px-6 cursor-pointer overflow-hidden min-w-[160px]"
                            onClick={handleDownloadSql}
                            disabled={loading}
                            aria-live="polite"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                </div>
                            ) : (
                                <>
                                    <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                                    <span>Baixar SQL</span>
                                </>
                            )}
                        </button>

                        <button
                            className="flex items-center justify-center gap-2 text-sm font-bold bg-blue hover:bg-blue-hover active:scale-95 transition-all rounded-xl py-2.5 px-6 cursor-pointer"
                            onClick={handleCopySql}
                        >
                            📋 Copiar SQL
                        </button>
                    </div>
                </div>
            </div>

            <div className="fixed inset-0" onClick={() => closeModal("SqlPreview")} />

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 10px;
                    height: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.2);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #2d2d2d;
                    border-radius: 5px;
                    border: 2px solid transparent;
                    background-clip: content-box;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #3d3d3d;
                    background-clip: content-box;
                }
                /* Remove a área branca no encontro do X com Y */
                .custom-scrollbar::-webkit-scrollbar-corner {
                    background: rgba(0, 0, 0, 0);
                }
            `}</style>
        </div>
    );
}

export default SqlPreview;