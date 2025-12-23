import type { AxiosResponse } from "axios";
import api from "../config/ApiConfig";
import type { ReportResponseDto } from "../dtos/ReportReponseDto";
import type { ReportModel } from "../models/ReportModel";

export class ReportService {
    static async getReports(): Promise<ReportModel[]> {
        try {
            const res: AxiosResponse<ReportResponseDto> = await api.get("/list");
            return res.data.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    static async updateReport(folder: string, report: ReportModel): Promise<ReportModel> {
        try {
            const {
                description,
                folderPath,
                type,
                tags,
                title
            } = report;

            const res: AxiosResponse<ReportModel> = await api.put("/save", {
                folder,
                report: {
                    description,
                    folderPath,
                    type,
                    tags,
                    title
                }
            });

            return res.data;
        } catch (error) {
            console.error(error);
            return {} as ReportModel;
        }
    }

    static async downloadFile(folder: string, filename: string) {
        const url = `${import.meta.env.VITE_API_DOMAIN}/download/${folder}/${filename}`;
        const response = await fetch(url);

        if (!response.ok) {
            console.error("Erro ao baixar arquivo");
            return;
        }

        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();

        URL.revokeObjectURL(link.href);
    }
    
    static async createReport(
        xml: File | null, 
        sql: File | null, 
        title: string, 
        type: string, 
        description: string
    ) {
        const formData = new FormData();
        
        if (xml) formData.append("xml", xml);
        if (sql) formData.append("sql", sql);
        
        const metadata = {
            title: title || "Sem Título",
            type: type,
            description: description
        };
        
        formData.append("metadata", JSON.stringify(metadata));

        const res: AxiosResponse<ReportResponseDto> = await api.post("/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return res.data;
    }
}