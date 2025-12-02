import { X } from "lucide-react";
import { useContext } from "react";
import { ReportContext } from "../../contexts/ReportContext";
import { ModalContext } from "../../contexts/ModalContext";
import Markdown from "react-markdown";
import  remarkGfm  from  'remark-gfm'

const DescriptionPreview: React.FC = () => {
  const { report } = useContext(ReportContext)!;
  const { isOpenModal, closeModal } = useContext(ModalContext)!;

  if (!isOpenModal("DescriptionPreview")) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-25">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
        onClick={() => closeModal("DescriptionPreview")}
      />

      <div className="relative bg-card-dark border border-border-dark rounded-md p-6 w-3/4 max-w-4xl text-white z-50 h-4/5 overflow-y-auto">
        <div className="flex flex-row justify-end items-center mb-4">
          <button
            className="p-1 hover:bg-error/12 rounded-md hover:text-error cursor-pointer transition-colors"
            onClick={() => closeModal("DescriptionPreview")}
          >
            <X size={28} />
          </button>
        </div>

        <div className="prose prose-invert max-w-none">
            <Markdown remarkPlugins={[remarkGfm]}>
                {report.description || "Nenhuma descrição encontrada."}
            </Markdown>
        </div>
      </div>
    </div>
  );
};

export default DescriptionPreview;