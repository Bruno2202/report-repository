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

    static async updateReport(folder: string, description: string): Promise<ReportModel> {
        try {
            const res: AxiosResponse<ReportModel> = await api.put("/save", {
                folder,
                description
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
}