import React from "react";
import { CheckCircle2, Database, FileCode, Trash2, Upload, X } from "lucide-react";
import toast from "react-hot-toast";
import { ReportService } from "../../../services/ReportService";
import type { ReportModel } from "../../../models/ReportModel";

interface SelectFilesProps {
    report: ReportModel;
    setReport: React.Dispatch<React.SetStateAction<ReportModel>>;
    xml: File | null;
    setXml: React.Dispatch<React.SetStateAction<File | null>>;
    sql: File | null;
    setSql: React.Dispatch<React.SetStateAction<File | null>>;
    dragCounter: number;
    onFilesSelected: (files: FileList | File[]) => void;
    onRefresh: () => Promise<void>;
}

const SelectFiles: React.FC<SelectFilesProps> = ({
    report,
    setReport,
    xml,
    setXml,
    sql,
    setSql,
    dragCounter,
    onFilesSelected,
    onRefresh
}) => {
    
    const isDragging = dragCounter > 0;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFilesSelected(e.target.files);
        }
    };

    const handleRemoveFile = (type: 'xml' | 'sql', e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (type === 'xml') setXml(null);
        if (type === 'sql') setSql(null);
    };

    const handleDeletePhysicalFile = async (filename: string) => {
        if (!window.confirm(`Tem certeza que deseja excluir permanentemente o arquivo ${filename}?`)) return;

        try {
            await ReportService.deleteFile(report.folder, filename);
            toast.success("Arquivo removido com sucesso!");

            const updatedReport = { ...report };
            if (filename.toLowerCase().endsWith('.xml')) updatedReport.xml = "";
            if (filename.toLowerCase().endsWith('.sql')) updatedReport.sqlFile = "";

            setReport(updatedReport);
            
            await onRefresh();
        } catch (error) {
            console.error(error);
            toast.error("Erro ao remover arquivo físico.");
        }
    };

    return (
        <div className="relative">
            {/* Overlay de Drag & Drop */}
            {isDragging && (
                <div className="absolute inset-0 bg-blue/10 backdrop-blur-[2px] z-50 flex items-center justify-center pointer-events-none rounded-xl border-2 border-blue border-dashed m-4">
                    <div className="bg-blue text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2">
                        <Upload size={18} />
                        <span className="font-bold text-sm">Solte para atualizar os arquivos</span>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                {/* Coluna XML */}
                <div className="flex flex-col gap-2">
                    {report.xml && !xml ? (
                        <div className="flex items-center justify-between w-full h-28 px-4 border-2 border-blue/20 bg-blue/5 rounded-xl">
                            <div className="flex items-center gap-3">
                                <FileCode className="text-blue" size={24} />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-blue/70 uppercase font-bold tracking-wider">Arquivo no Servidor</span>
                                    <span className="text-sm font-medium truncate max-w-[180px]">{report.xml}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDeletePhysicalFile(report.xml!)}
                                className="p-2 hover:bg-error/20 rounded-lg text-error transition-colors cursor-pointer"
                                title="Excluir arquivo permanentemente"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ) : (
                        <label className={`relative flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-xl cursor-pointer transition-all ${xml ? 'border-green-500/40 bg-green-500/5' : 'border-white/5 bg-white/[0.02] hover:border-blue/40'}`}>
                            <input type="file" className="hidden" accept=".xml" onChange={handleFileChange} />
                            {xml ? (
                                <div className="flex items-center justify-between w-full px-4">
                                    <div className="flex items-center gap-2 text-green-400 font-medium text-sm">
                                        <CheckCircle2 size={18} />
                                        <div className="flex flex-col text-left">
                                            <span className="text-xs text-green-500/70 uppercase font-bold">Novo Arquivo</span>
                                            <span className="truncate max-w-[150px]">{xml.name}</span>
                                        </div>
                                    </div>
                                    <button onClick={(e) => handleRemoveFile('xml', e)} className="p-1.5 hover:bg-white/10 rounded-full text-gray-400 cursor-pointer"><X size={16} /></button>
                                </div>
                            ) : (
                                <div className="text-center group">
                                    <FileCode className="text-gray-600 group-hover:text-blue/70 transition-colors mx-auto mb-1" size={20} />
                                    <span className="text-[11px] text-gray-500 block">Clique para substituir o <strong>XML</strong></span>
                                </div>
                            )}
                        </label>
                    )}
                </div>

                {/* Coluna SQL */}
                <div className="flex flex-col gap-2">
                    {report.sqlFile && !sql ? (
                        <div className="flex items-center justify-between w-full h-28 px-4 border-2 border-blue/20 bg-blue/5 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Database className="text-blue" size={24} />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-blue/70 uppercase font-bold tracking-wider">Arquivo no Servidor</span>
                                    <span className="text-sm font-medium truncate max-w-[180px]">{report.sqlFile}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDeletePhysicalFile(report.sqlFile!)}
                                className="p-2 hover:bg-error/20 rounded-lg text-error transition-colors cursor-pointer"
                                title="Excluir arquivo permanentemente"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ) : (
                        <label className={`relative flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-xl cursor-pointer transition-all ${sql ? 'border-green-500/40 bg-green-500/5' : 'border-white/5 bg-white/[0.02] hover:border-blue/40'}`}>
                            <input type="file" className="hidden" accept=".sql" onChange={handleFileChange} />
                            {sql ? (
                                <div className="flex items-center justify-between w-full px-4">
                                    <div className="flex items-center gap-2 text-green-400 font-medium text-sm">
                                        <CheckCircle2 size={18} />
                                        <div className="flex flex-col text-left">
                                            <span className="text-xs text-green-500/70 uppercase font-bold">Novo Arquivo</span>
                                            <span className="truncate max-w-[150px]">{sql.name}</span>
                                        </div>
                                    </div>
                                    <button onClick={(e) => handleRemoveFile('sql', e)} className="p-1.5 hover:bg-white/10 rounded-full text-gray-400 cursor-pointer"><X size={16} /></button>
                                </div>
                            ) : (
                                <div className="text-center group">
                                    <Database className="text-gray-600 group-hover:text-blue/70 transition-colors mx-auto mb-1" size={20} />
                                    <span className="text-[11px] text-gray-500 block">Clique para substituir o <strong>SQL</strong></span>
                                </div>
                            )}
                        </label>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SelectFiles;