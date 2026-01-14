import React, { useContext } from "react";
import { AlertTriangle } from "lucide-react";
import { ModalContext } from "../../contexts/ModalContext";
import Button from "../buttons/Button";
import type { ReportModel } from "../../models/ReportModel";

interface ConfirmDeleteProps {
    report: ReportModel;
    deleteFunction: () => void;
    loading?: boolean;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ report, deleteFunction, loading }) => {
    const { isOpenModal, closeModal } = useContext(ModalContext)!;

    if (!isOpenModal("ConfirmDelete")) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            />

            <div className="relative bg-card-dark border border-border-dark rounded-xl w-full max-w-md p-6 text-white z-50 shadow-2xl scale-in-center">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center text-error mb-2">
                        <AlertTriangle size={32} />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-xl font-bold">Excluir Relatório?</h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Você está prestes a excluir o relatório <span className="text-white font-semibold">"{report.title}"</span>.
                            Esta ação é irreversível e removerá todos os arquivos (XML, SQL) e metadados da pasta.
                        </p>
                    </div>

                    <div className="flex w-full gap-3 mt-4">
                        <Button
                            text="Cancelar"
                            variant="outline"
                            onClick={() => closeModal("ConfirmDelete")}
                            className="w-full"
                        />
                        <Button
                            text="Excluir Relatório"
                            variant="danger"
                            onClick={deleteFunction}
                            className="w-full"
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;