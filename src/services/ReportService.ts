import type { AxiosResponse } from "axios";
import api from "../config/ApiConfig";
import type { ReportResponseDto } from "../dtos/ReportReponseDto";
import type { ReportModel } from "../models/ReportModel";

export class ReportService {
    static getReportsPath(): string {
        return localStorage.getItem("reportsPath") || import.meta.env.VITE_DEFAULT_REPORT_PATH;
    }

    static setReportsPath(newPath: string) {
        localStorage.setItem("reportsPath", newPath);
    }

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
        const domain = import.meta.env.VITE_API_DOMAIN;
        const reportsPath = localStorage.getItem("reportsPath") || "";

        const baseUrl = domain.endsWith('/') ? domain.slice(0, -1) : domain;
        const url = `${baseUrl}/download/${folder}/${filename}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-Report-Path': reportsPath
                }
            });

            if (!response.ok) {
                console.error("Erro ao baixar:", response.status);
                return;
            }

            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        } catch (err) {
            console.error("Erro de conexão:", err);
        }
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