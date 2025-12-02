import { X } from "lucide-react";
import React, { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { ReportContext } from "../../contexts/ReportContext";

const SqlPreview: React.FC = () => {
    const { report } = useContext(ReportContext)!;
    const { isOpenModal, closeModal } = useContext(ModalContext)!;

    if (!isOpenModal("SqlPreview")) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-25 backdrop-blur-xs">
            <div className="bg-card-dark border border-border-dark rounded-md p-6 w-3/4 max-w-4xl text-white z-50">
                <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Preview SQL</h2>
                    <span className="p-1 hover:bg-error/12 rounded-md hover:text-error cursor-pointer transition-colors" onClick={() => closeModal("SqlPreview")}>
                        <X size={28} />
                    </span>
                </div>
                <div>
                    <pre className="bg-light-black border border-border-dark p-4 rounded-md max-h-96 overflow-y-auto text-sm font-medium text-light-blue">
                        {report.sql || "-- Nenhum SQL encontrado."}
                    </pre>
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