import { X } from "lucide-react";
import React, { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { ReportContext } from "../../contexts/ReportContext";
import toast from "react-hot-toast";

const SqlPreview: React.FC = () => {
    const { report } = useContext(ReportContext)!;
    const { isOpenModal, closeModal } = useContext(ModalContext)!;

    function handleCopySql() {
        navigator.clipboard.writeText(report.sql).then(() => {
            toast("🔗 SQL copiado");
        });
    }

    if (!isOpenModal("SqlPreview")) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-25 backdrop-blur-xs">
            <div className="bg-card-dark border border-border-dark rounded-xl p-6 w-3/4 max-w-4xl text-white z-50">
                <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Preview SQL</h2>

                    <span className="p-1 hover:bg-error/12 rounded-xl hover:text-error cursor-pointer transition-colors" onClick={() => closeModal("SqlPreview")}>
                        <X size={28} />
                    </span>
                </div>
                <div className="flex flex-col gap-4">
                    <pre className="bg-light-black border border-border-dark p-4 rounded-xl max-h-100 overflow-y-auto text-sm font-medium text-light-blue">
                        {report.sql || "-- Nenhum SQL encontrado."}
                    </pre>
                    <div className="flex justify-end">
                        <button
                            className="text-sm font-medium bg-blue hover:bg-blue-hover transition-colors rounded-xl p-2 cursor-pointer w-40"
                            onClick={handleCopySql}
                        >
                            📋 Copiar SQL
                        </button>
                    </div>
                </div>
            </div>
            <div
                className="fixed inset-0 cursor-pointer"
                onClick={() => closeModal("SqlPreview")}
            />
        </div>
    );
}

export default SqlPreview;