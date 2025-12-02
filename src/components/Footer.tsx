import { GrGithub } from "react-icons/gr";

const Footer: React.FC = () => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center text-dark-gray text-xs cursor-pointer">
            <div
                className="flex flex-row justify-center items-center gap-1 font-semibold hover:text-gray transition-all"
                onClick={() => window.open('https://github.com/Bruno2202/report-repository')}
            >
                <GrGithub size={24} />
                Github
            </div>
        </div>
    );
}

export default Footer;