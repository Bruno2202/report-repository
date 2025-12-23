import type React from "react";
import { useContext, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { X, FileCode, Database, Upload, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { ReportService } from "../../services/ReportService";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import toast from "react-hot-toast";
import ReportTagsPreview from "./ReportTagsPreview";
import type { TagModel } from "../../models/TagModel";

interface AddReport {
    refreshReports: () => void
}

const AddReport: React.FC<AddReport> = ({ refreshReports }) => {
    const [xml, setXml] = useState<File | null>(null);
    const [sql, setSql] = useState<File | null>(null);
    const [dragCounter, setDragCounter] = useState(0);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [type, setType] = useState("R");
    const [description, setDescription] = useState("");
    const [openDescription, setOpenDescription] = useState(false);
    const [selectedTags, setSelectedTags] = useState<TagModel[]>([]);

    const { closeModal, isOpenModal } = useContext(ModalContext)!;

    const processFiles = (files: FileList | File[]) => {
        const fileArray = Array.from(files);
        fileArray.forEach(file => {
            const name = file.name.toLowerCase();
            if (name.endsWith('.xml')) {
                setXml(file);
                if (!title) setTitle(file.name.replace('.xml', '').replace(/_/g, ' '));
            } else if (name.endsWith('.sql')) {
                setSql(file);
            }
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) processFiles(e.target.files);
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        setDragCounter(prev => prev + 1);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragCounter(prev => prev - 1);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragCounter(0);
        if (e.dataTransfer.files) processFiles(e.dataTransfer.files);
    };

    function handleCloseModal() {
        setXml(null);
        setSql(null);
        setTitle("");
        setDescription("");
        setDragCounter(0);
        closeModal("AddReport");
    }

    async function createReport() {
        if (loading || !title) return;

        try {
            setLoading(true);
            await ReportService.createReport(xml, sql, title, type, description);

            handleCloseModal();
            toast.success("Relatório criado com sucesso!");
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar.");
        } finally {
            refreshReports();
            setLoading(false);
        }
    }

    if (!isOpenModal("AddReport")) return null;

    const isDragging = dragCounter > 0;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={handleCloseModal} />

                {/* Modal Container */}
                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className="relative bg-card-dark border border-border-dark rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col text-white z-30 shadow-2xl overflow-hidden"
                >
                    {/* Header - FIXO */}
                    <div className="flex flex-row justify-between items-center px-6 py-4 border-b border-white/5 bg-white/5 shrink-0">
                        <div>
                            <h2 className="text-lg font-bold tracking-tight">Novo Relatório</h2>
                            <p className="text-xs text-gray-400 mt-0.5">Configure os detalhes e anexe os arquivos necessários.</p>
                        </div>
                        <button className="p-2 hover:bg-error/20 rounded-xl text-gray hover:text-error transition-all cursor-pointer" onClick={handleCloseModal}>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Conteúdo com Scroll Interno */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">

                        {/* Título e Tipo */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-3 space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">Título</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Ex: Relatório de Vendas Mensal"
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue transition-all"
                                />
                            </div>
                            <div className="md:col-span-1 space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">Tipo</label>
                                <div className="relative">
                                    <select
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="w-full bg-aside-dark border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue transition-all cursor-pointer text-white appearance-none"
                                    >
                                        <option value="R" className="bg-[#1a1a1a]">📊 Relatório</option>
                                        <option value="E" className="bg-[#1a1a1a]">📥 Exportação</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                        <ChevronDown size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dropzone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                            {isDragging && (
                                <div className="absolute inset-0 bg-blue/10 backdrop-blur-[2px] z-10 flex items-center justify-center pointer-events-none rounded-xl border-2 border-blue border-dashed">
                                    <div className="bg-blue text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2">
                                        <Upload size={18} />
                                        <span className="font-bold text-sm">Solte os arquivos</span>
                                    </div>
                                </div>
                            )}

                            {/* XML */}
                            <label className={`relative flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-xl cursor-pointer transition-all ${xml ? 'border-green-500/40 bg-green-500/5' : 'border-white/5 bg-white/[0.02] hover:border-blue/40'}`}>
                                <input type="file" className="hidden" accept=".xml" onChange={handleFileChange} />
                                {xml ? (
                                    <div className="flex items-center gap-2 text-green-400 font-medium text-sm">
                                        <CheckCircle2 size={18} />
                                        <span className="truncate max-w-[120px]">{xml.name}</span>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <FileCode className="text-gray-600 mx-auto mb-1" size={20} />
                                        <span className="text-[11px] text-gray-500 block">XML de Configuração</span>
                                    </div>
                                )}
                            </label>

                            {/* SQL */}
                            <label className={`relative flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-xl cursor-pointer transition-all ${sql ? 'border-green-500/40 bg-green-500/5' : 'border-white/5 bg-white/[0.02] hover:border-blue/40'}`}>
                                <input type="file" className="hidden" accept=".sql" onChange={handleFileChange} />
                                {sql ? (
                                    <div className="flex items-center gap-2 text-green-400 font-medium text-sm">
                                        <CheckCircle2 size={18} />
                                        <span className="truncate max-w-[120px]">{sql.name}</span>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <Database className="text-gray-600 mx-auto mb-1" size={20} />
                                        <span className="text-[11px] text-gray-500 block">SQL de Consulta</span>
                                    </div>
                                )}
                            </label>
                        </div>

                        {/* Descrição */}
                        <div className="space-y-3">
                            <button
                                onClick={() => setOpenDescription(!openDescription)}
                                className="flex items-center justify-between w-full p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-all"
                            >
                                <span className="text-xs font-semibold flex items-center gap-2 text-gray-300">📝 Descrição e Documentação</span>
                                {openDescription ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>

                            {openDescription && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2">
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Instruções de uso..."
                                        className="h-32 bg-body-dark border border-white/10 rounded-xl p-3 text-xs outline-none focus:border-blue resize-none"
                                    />
                                    <div className="h-32 bg-aside-dark/50 border border-white/5 rounded-xl p-3 overflow-y-auto prose prose-invert prose-xs max-w-none scrollbar-thin">
                                        <Markdown remarkPlugins={[remarkGfm]}>
                                            {description || "*Preview markdown...*"}
                                        </Markdown>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer - FIXO */}
                    <div className="px-6 py-4 border-t border-white/5 bg-white/5 flex justify-end items-center gap-3 shrink-0">
                        <button
                            onClick={handleCloseModal}
                            className="px-5 py-2 text-xs font-semibold text-gray hover:text-error transition-colors cursor-pointer"
                        >
                            Cancelar
                        </button>

                        <button
                            disabled={!title || loading}
                            onClick={createReport}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${title && !loading ? ' bg-blue text-white cursor-pointer' : 'bg-white/5 text-gray-600 cursor-not-allowed'}`}
                        >
                            {loading ? <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Upload size={14} />}
                            {loading ? 'Salvando...' : 'Criar Relatório'}
                        </button>
                    </div>
                </div>
            </div>

            <ReportTagsPreview
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
            />
        </>
    );
};

export default AddReport;