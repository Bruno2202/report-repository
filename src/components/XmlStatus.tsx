import { Download } from "lucide-react";
import { ReportService } from "../services/ReportService";
import type { ReportModel } from "../models/ReportModel";

interface XmlStatusProps {
    report: ReportModel;
}

const XmlStatus: React.FC<XmlStatusProps> = ({ report }) => {
    async function handleDownloadXml() {
        await ReportService.downloadFile(report.folder, report.xml)
    }

    return (
        <span
            onClick={() => {
                if (report.hasXml) {
                    handleDownloadXml()
                }
            }}
            className={`group flex items-center text-xs rounded-full py-1 px-2 transition-colors ${report.hasXml
                ? "bg-success/12 hover:bg-blue hover:text-white cursor-pointer"
                : "bg-error/12"
                }`}
        >
            {report.hasXml ? (
                <>
                    <p className="font-semibold text-success group-hover:hidden">
                        XML OK
                    </p>

                    <Download
                        size={16}
                        className="hidden group-hover:block text-white text-sm min-w-12"
                    />
                </>
            ) : (
                <p className="font-semibold text-error">Sem XML</p>
            )}
        </span>
    );
};

export default XmlStatus;
