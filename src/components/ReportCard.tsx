import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";
import XmlStatus from "./XmlStatus";
import { ReportContext } from "../contexts/ReportContext";
import type { ReportModel } from "../models/ReportModel";

interface ReportCardProps {
    report: ReportModel
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
    const { setReport } = useContext(ReportContext)!;
    const { openModal } = useContext(ModalContext)!;

    return (
        <div className="bg-card-dark border border-border-dark rounded-md p-4 text-white cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition-all">
            <div className="flex flex-row">
                <div className="flex flex-col w-2/3">
                    <h1 className="font-bold mb-2">📁 {report.folder}</h1>
                    <p className="text-xs text-gray font-medium truncate overflow-hidden max-w-2/3">
                        XML: {report.xml || "Sem XML informado"}
                    </p>
                </div>
                <div className="flex flex-1 items-start justify-end w-1/3">
                    <XmlStatus status={report.hasXml} />
                </div>
            </div>
            <div className="border-t border-border-dark mt-8 pt-4 flex gap-2">
                <button
                    className="flex flex-1 items-center justify-center rounded-md py-2 border bg-light-black border-border-dark cursor-pointer text-xs hover:border-border-hover transition-colors text-white/75 hover:text-white"
                    onClick={() => {
                        setReport(report)
                        openModal("DescriptionPreview")
                    }}
                >
                    🗒️ Ler
                </button>
                <button
                    className="flex flex-1 items-center justify-center rounded-md py-2 border bg-light-black border-border-dark cursor-pointer text-xs hover:border-border-hover transition-colors text-white/75 hover:text-white"
                    onClick={() => {
                        setReport(report)
                        openModal("EditReport")
                    }}
                >
                    ✏️ Editar
                </button>
                <button
                    className="flex flex-1 items-center justify-center rounded-md py-2 border bg-light-black border-border-dark cursor-pointer text-xs hover:border-border-hover transition-colors text-white/75 hover:text-white"
                    onClick={() => {
                        setReport(report)
                        openModal("SqlPreview")
                    }}
                >
                    💣 SQL
                </button>
            </div>
        </div >
    );
}

export default ReportCard;