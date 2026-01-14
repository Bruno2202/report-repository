import { useContext, useEffect, useState } from "react";
import Button from "./buttons/Button";
import toast from "react-hot-toast";
import { ModalContext } from "../contexts/ModalContext";
import Github from "./Github";
import { Check, Copy } from "lucide-react";
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

    const handleCopyPath = () => {
        if (!currentPath || currentPath === "Carregando...") return;

        try {
            const textArea = document.createElement("textarea");
            textArea.value = currentPath;
            
            textArea.style.position = "fixed";
            textArea.style.left = "-9999px";
            textArea.style.top = "0";
            
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            if (successful) {
                setCopied(true);
                toast.success("Caminho copiado!");
                setTimeout(() => setCopied(false), 2000);
            } else {
                throw new Error();
            }
        } catch (err) {
            toast.error("Não foi possível copiar o caminho.");
            console.error("Fallback de cópia falhou:", err);
        }
    };

    return (
        <aside className='flex flex-col p-4 border-rd ark:border-gray-700 w-72 h-full bg-aside-dark border-0 border-r border-border-dark'>
            <h1 className='text-lg font-bold text-white mb-2'>📂 Relatórios</h1>

            <div 
                onClick={handleCopyPath}
                className="group relative bg-black/30 p-3 rounded-xl mb-6 border border-white/5 cursor-pointer hover:border-blue/40 hover:bg-black/50 transition-all"
            >
                <div className="flex justify-between items-center mb-1">
                    <p className='text-[10px] uppercase tracking-tighter font-bold text-gray-500'>Caminho de Rede</p>
                    {copied ? (
                        <Check size={12} className="text-green-500" />
                    ) : (
                        <Copy size={12} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
                    )}
                </div>
                <p className='text-[11px] font-mono text-blue-400/80 break-all leading-tight'>
                    {currentPath}
                </p>
                <span className="absolute inset-0 bg-blue-400/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
            </div>
            
            <div className='flex flex-col text-white gap-4 my-8'>
                <Button
                    text="📂 Selecionar Pasta"
                    onClick={handleSelectPath}
                />
                <Button
                    text="📋 Adicionar Relatório"
                    onClick={() => openModal("AddReport")}
                />
                <Button
                    onClick={refreshReports}
                    text="🔄 Atualizar"
                    variant="outline"
                />
            </div>

            <div className='flex flex-1 justify-center items-end'>
                <Github />
            </div>
        </aside>
    );
}

export default Sidebar;