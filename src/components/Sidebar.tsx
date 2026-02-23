import { useContext, useEffect, useState } from "react";
import Button from "./buttons/Button";
import toast from "react-hot-toast";
import { ModalContext } from "../contexts/ModalContext";
import Github from "./Github";
import packageInfo from "../../package.json";

import {
    Check,
    Copy,
    FolderOpen,
    PlusCircle,
    RefreshCw,
    HelpCircle,
    Database
} from "lucide-react";
import { ReportService } from "../services/ReportService";

interface SidebarProps {
    refreshReports: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ refreshReports }) => {
    const [currentPath, setCurrentPath] = useState<string>("");
    const [copied, setCopied] = useState(false);
    const { openModal } = useContext(ModalContext)!;

    useEffect(() => {
        fetchPath();
    }, []);

    const fetchPath = () => {
        const path = ReportService.getReportsPath();
        setCurrentPath(path);
    };

    const handleSelectPath = () => {
        const newPath = window.prompt("Digite o seu caminho de rede:", currentPath);

        if (newPath) {
            ReportService.setReportsPath(newPath);
            setCurrentPath(newPath);
            refreshReports();
            toast.success("Seu caminho foi atualizado!");
        }
    };

    function handleCopyPath() {
        if (!currentPath || currentPath === "Carregando...") return;
        
        const textToCopy = currentPath;
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                toast.success("Caminho copiado!");
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } else {
                toast.error("Falha ao copiar");
            }
        } catch (err) {
            toast.error("Erro ao copiar");
        }

        document.body.removeChild(textArea);
    }

    return (
        <aside className='flex flex-col w-72 h-full bg-aside-dark border-r border-border-dark'>
            <div className="p-6 pb-2">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue/20 rounded-lg">
                        <Database size={20} className="text-blue" />
                    </div>
                    <h1 className='text-xl font-bold text-white tracking-tight'>Relatórios</h1>
                </div>

                <div
                    onClick={handleCopyPath}
                    className="group relative bg-black/20 p-3 rounded-xl border border-white/5 cursor-pointer hover:border-blue/30 hover:bg-black/40 transition-all"
                >
                    <div className="flex justify-between items-center mb-1.5">
                        <p className='text-[10px] uppercase tracking-wider font-bold text-gray-500'>Caminho de Rede</p>
                        {copied ? (
                            <Check size={12} className="text-green-500" />
                        ) : (
                            <Copy size={12} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
                        )}
                    </div>
                    <p className='text-[11px] font-mono text-blue-400/80 break-all leading-tight'>
                        {currentPath || "Não definido"}
                    </p>
                </div>
            </div>

            <div className='flex flex-col gap-8 p-4 mt-4'>
                <div className="flex flex-col gap-3">
                    <span className="px-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest">Ações</span>
                    <Button
                        icon={FolderOpen}
                        text="Selecionar Pasta"
                        onClick={handleSelectPath}
                        className="justify-start px-4"
                    />
                    <Button
                        icon={PlusCircle}
                        text="Adicionar Relatório"
                        onClick={() => openModal("AddReport")}
                        className="justify-start px-4"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <span className="px-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest">Sistema</span>
                    <Button
                        icon={RefreshCw}
                        onClick={refreshReports}
                        text="Atualizar Lista"
                        variant="outline"
                        className="justify-start px-4"
                    />
                    <Button
                        icon={HelpCircle}
                        onClick={() => openModal("HowToUse")}
                        text="Como Usar"
                        variant="outline"
                        className="justify-start px-4"
                    />
                </div>
            </div>

            <div className='mt-auto p-6 flex flex-col items-center gap-4 border-t border-white/5'>
                <Github />
                <span className="text-[10px] text-gray-600 font-medium">
                    REPORT REPOSITORY V{packageInfo.version}
                </span>
            </div>
        </aside>
    );
}

export default Sidebar;