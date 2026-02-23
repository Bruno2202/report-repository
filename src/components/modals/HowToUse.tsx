import React, { useContext } from "react";
import { X, BookOpen, FileCode, Tags, Upload, Save, PlusCircle } from "lucide-react";
import { ModalContext } from "../../contexts/ModalContext";
import Button from "../buttons/Button";

const HowToUse: React.FC = () => {
    const { isOpenModal, closeModal } = useContext(ModalContext)!;

    if (!isOpenModal("HowToUse")) return null;

    const steps = [
        {
            icon: <PlusCircle className="text-blue" size={20} />,
            title: "Novo Relatório",
            description: "Clique no botão '+' na tela principal para iniciar a criação. Defina um título e o tipo (Relatório ou Exportação) para começar."
        },
        {
            icon: <FileCode className="text-blue" size={20} />,
            title: "Edição de Arquivos",
            description: "Atualize arquivos XML e SQL arrastando-os para a tela ou clicando nos campos de upload durante a edição."
        },
        {
            icon: <Tags className="text-blue" size={20} />,
            title: "Organização por Tags",
            description: "Categorize seus relatórios. Use o botão '+' dentro do relatório para gerenciar e aplicar tags identificadoras."
        },
        {
            icon: <BookOpen className="text-blue" size={20} />,
            title: "Descrição Markdown",
            description: "Utilize formatação Markdown para documentar o relatório. O painel ao lado mostra a prévia em tempo real."
        },
        {
            icon: <Upload className="text-blue" size={20} />,
            title: "Exportação de arquivos",
            description: 'É possível realizar o download do arquivo XML (caso o status esteja "XML OK") ou do arquivo SQL direto da listagem.'
        }
    ];

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                onClick={() => closeModal("HowToUse")}
            />

            <div className="relative bg-card-dark border border-border-dark rounded-2xl w-full max-w-2xl text-white z-50 overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="flex flex-row justify-between items-center px-6 py-4 border-b border-border-dark bg-aside-dark/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue/10 rounded-lg">
                            <BookOpen size={20} className="text-blue" />
                        </div>
                        <h2 className="text-xl font-bold">Como utilizar a aplicação</h2>
                    </div>
                    <button
                        className="p-1.5 hover:bg-white/10 rounded-lg text-gray transition-all cursor-pointer"
                        onClick={() => closeModal("HowToUse")}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {steps.map((step, index) => (
                            <div 
                                key={index} 
                                className={`p-4 rounded-xl border border-border-dark bg-aside-dark/30 hover:bg-aside-dark/50 transition-colors ${
                                    index === 0 ? "md:col-span-2" : ""
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    {step.icon}
                                    <h3 className="font-semibold text-sm">{step.title}</h3>
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-blue/5 border border-blue/20 rounded-xl p-4 flex items-start gap-3">
                        <Save size={18} className="text-blue shrink-0 mt-0.5" />
                        <p className="text-xs text-blue/80 italic">
                            Dica: Lembre-se de sempre clicar em "Salvar Alterações" para aplicar as modificações e sincronizar os arquivos com o servidor.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end px-6 py-4 border-t border-border-dark bg-aside-dark/50">
                    <Button 
                        text="Entendido!" 
                        onClick={() => closeModal("HowToUse")} 
                        variant="primary"
                    />
                </div>
            </div>
        </div>
    );
};

export default HowToUse;