import React, { createContext, useState } from "react";
import type { ReportModel } from "../models/ReportModel";

interface Props {
    children: React.ReactNode;
}

interface ReportContextType {
    reports: ReportModel[];
    setReports: React.Dispatch<React.SetStateAction<ReportModel[]>>;
    report: ReportModel;
    setReport: React.Dispatch<React.SetStateAction<ReportModel>>;
}

export const ReportContext = createContext<ReportContextType | null>(null);

export default function ReportProvider({ children }: Props) {
    const [reports, setReports] = useState<ReportModel[]>({} as ReportModel[]);
    const [report, setReport] = useState<ReportModel>({} as ReportModel);

    return (
        <ReportContext.Provider
            value={{
                reports,
                setReports,  
                report,
                setReport
            }}
        >
            {children}
        </ReportContext.Provider>
    )
}