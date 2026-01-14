import React, { useContext, useState, useEffect } from "react";
import { X } from "lucide-react";
import { ReportContext } from "../../../contexts/ReportContext";
import { ModalContext } from "../../../contexts/ModalContext";
import { ReportService } from "../../../services/ReportService";
import toast from "react-hot-toast";
import type { ReportModel } from "../../../models/ReportModel";
import type { TagModel } from "../../../models/TagModel";
import ReportTagsPreview from "../ReportTagsPreview";
import DropDown from "./DropDown";
import SelectFiles from "./SelectFiles";
import EditDescription from "./EditDescription";
import SelectTags from "./SelectTags";
import Button from "../../buttons/Button";
import ConfirmDelete from "../ConfirmDelete";

const EditReport: React.FC = () => {
    const { report, setReport, setReports } = useContext(ReportContext)!;
    const { isOpenModal, closeModal, openModal } = useContext(ModalContext)!;

    const [updating, setUpdating] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [type, setType] = useState<string>(report.type);
    const [selectedTags, setSelectedTags] = useState<TagModel[]>([]);

    const [dragCounter, setDragCounter] = useState(0);
    const [xml, setXml] = useState<File | null>(null);
    const [sql, setSql] = useState<File | null>(null);

    useEffect(() => {
        if (report) {
            setTitle(report.title || "");
            setDescription(report.description || "");
            setSelectedTags(report.tags || []);
            setType(report.type || 'R');
            setXml(null);
            setSql(null);
        }
    }, [report]);

    const processFiles = (files: FileList | File[]) => {
        const fileArray = Array.from(files);

        fileArray.forEach(file => {
            const name = file.name.toLowerCase();
            if (name.endsWith('.xml')) {
                setXml(file);
            } else if (name.endsWith('.sql')) {
                setSql(file);
            } else {
                toast.error(`O arquivo ${file.name} não é suportado (.xml ou .sql)`);
            }
        });
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter(prev => prev + 1);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter(prev => prev - 1);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter(0);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    async function handleDeleteReport() {
        try {
            setDeleting(true);
            await ReportService.deleteReport(report.folder);
            await handleRefreshReports();
            toast.success("Relatório excluído com sucesso!");
            closeModal("ConfirmDelete")
            handleCloseModal();
        } catch (error) {
            console.error(error);
            toast.error("Erro ao excluir o relatório. Tente novamente.");
        } finally {
            setDeleting(false);
        }
    }

    async function handleUpdateReport() {
        try {
            setUpdating(true);
            const data: ReportModel = {
                ...report,
                title,
                description,
                type,
                tags: selectedTags
            };

            await ReportService.updateReport(report.folder, data, xml, sql);
            await handleRefreshReports();

            toast.success("Relatório atualizado com sucesso!");
            handleCloseModal();
        } catch (error) {
            console.error(error);
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
        setXml(null);
        setSql(null);
        setDragCounter(0);
        closeModal("EditReport");
    }

    if (!isOpenModal("EditReport")) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-25">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
                onClick={handleCloseModal}
            />

            <div
                className="relative bg-card-dark border border-border-dark rounded-xl w-3/4 max-w-5xl text-white z-30 h-4/5 overflow-hidden flex flex-col"
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="flex flex-row justify-between items-center px-6 py-4 border-b border-border-dark bg-aside-dark/50 shrink-0">
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

                <div className="p-6 overflow-y-auto flex flex-col flex-1 custom-scrollbar">
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
                        <DropDown
                            description="Arquivos (Atualizar XML ou SQL)"
                        >
                            <SelectFiles
                                report={report}
                                setReport={setReport}
                                xml={xml}
                                setXml={setXml}
                                sql={sql}
                                setSql={setSql}
                                dragCounter={dragCounter}
                                onFilesSelected={processFiles}
                                onRefresh={handleRefreshReports}
                            />
                        </DropDown>

                        <DropDown
                            description="Descrição (Markdown)"
                        >
                            <EditDescription
                                description={description}
                                setDescription={setDescription}
                            />
                        </DropDown>

                        <DropDown
                            description="Tags"
                        >
                            <SelectTags
                                selectedTags={selectedTags}
                                setSelectedTags={setSelectedTags}
                            />
                        </DropDown>

                        <div className="flex justify-between mt-6">
                            <Button
                                onClick={() => openModal("ConfirmDelete")}
                                text="Excluir Relatório"
                                variant="danger"
                            />
                            <Button
                                onClick={handleUpdateReport}
                                text="💾 Salvar Alterações"
                                variant="primary"
                                loading={updating}
                                className="min-w-[160px]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ReportTagsPreview
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
            />
            <ConfirmDelete
                report={report}
                deleteFunction={handleDeleteReport}
                loading={deleting}
            />
        </div>
    );
}

export default EditReport;