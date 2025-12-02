interface XmlStatusProps {
    status: boolean;
}

const XmlStatus: React.FC<XmlStatusProps> = ({ status }) => {
    return (
        <span className={`flex items-center text-xs rounded-full py-1 px-2 ${status ? "bg-success/12" : "bg-error/12"}`} >
            {status ?
                <p className="font-semibold text-success text-center">XML OK</p>
                : <p className="font-semibold text-error text-center">Sem XML</p>
            }
        </span >
    );
}

export default XmlStatus;