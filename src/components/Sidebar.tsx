import { useContext } from "react";
import Button from "./buttons/Button";
import Footer from "./Footer";
import toast from "react-hot-toast";
import { ModalContext } from "../contexts/ModalContext";

interface SidebarProps {
    refreshReports: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ refreshReports }) => {
    const { openModal } = useContext(ModalContext)!;

    return (
        <aside className='flex flex-col p-4 border-rd ark:border-gray-700 w-72 h-full bg-aside-dark border border-border-dark'>
            <h1 className='text-lg font-bold text-white mb-2'>📂 Relatórios</h1>
            <p className='text-sm font-medium text-gray'>Nenhuma pasta selecionada.</p>

            <div className='flex flex-col text-white gap-2 my-8'>
                <Button
                    text="📂 Selecionar Pasta"
                    onClick={() => toast("Funcionalidade indisponível")}
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
                <Footer />
            </div>
        </aside>
    );
}

export default Sidebar;