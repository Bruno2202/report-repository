import React, { createContext, useState } from "react";
import type { ReportModel } from "../models/ReportModel";

interface Props {
    children: React.ReactNode;
}

interface ReportContextType {
    report: ReportModel;
    setReport: React.Dispatch<React.SetStateAction<ReportModel>>;
}

export const ReportContext = createContext<ReportContextType | null>(null);

export default function ReportProvider({ children }: Props) {
    const [report, setReport] = useState<ReportModel>({} as ReportModel);

    return (
        <ReportContext.Provider
            value={{
                report,
                setReport
            }}
        >
            {children}
        </ReportContext.Provider>
    )
}