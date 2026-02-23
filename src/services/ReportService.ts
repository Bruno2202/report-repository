import type { AxiosResponse } from "axios";
import api from "../config/ApiConfig";
import type { ReportResponseDto } from "../dtos/ReportReponseDto";
import type { ReportModel } from "../models/ReportModel";
import type { TagModel } from "../models/TagModel";

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

    static async updateReport(
        folder: string,
        report: ReportModel,
        xmlFile?: File | null,
        sqlFile?: File | null
    ): Promise<ReportModel> {
        try {
            const formData = new FormData();

            formData.append('folder', folder);

            const reportMetadata = {
                description: report.description,
                folderPath: report.folderPath,
                type: report.type,
                tags: report.tags,
                title: report.title
            };

            formData.append('report', JSON.stringify(reportMetadata));

            if (xmlFile) {
                formData.append('xml', xmlFile);
            }

            if (sqlFile) {
                formData.append('sql', sqlFile);
            }

            const res: AxiosResponse<ReportModel> = await api.put("/save", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return res.data;
        } catch (error) {
            console.error("Erro ao atualizar relatório:", error);
            throw error;
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

            let forcedFilename = filename;
            if (filename.toLowerCase().endsWith('.xml')) {
                forcedFilename = filename.replace(/\.[^/.]+$/, "") + ".xml";
            } else if (filename.toLowerCase().endsWith('.sql')) {
                forcedFilename = filename.replace(/\.[^/.]+$/, "") + ".sql";
            }
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            
            link.download = forcedFilename; 
            
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

    static async deleteFile(folder: string, filename: string) {
        const res = await api.delete("/delete-file", {
            data: { folder, filename }
        });
        return res.data;
    }

    static async deleteReport(folder: string) {
        const res = await api.delete("/delete-report", {
            data: { folder }
        });
        return res.data;
    }

    static async getTags() {
        try {
            const res = await api.get("/tags");
            return res.data.tags as TagModel[];
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    static async createTag(tag: { name: string; category_id: string }) {
        try {
            const res = await api.post("/tags", tag);
            return res.data;
        } catch (error) {
            console.error("Erro ao criar tag:", error);
            throw error;
        }
    }

    static async createCategory(category: { name: string }) {
        try {
            const res = await api.post("/categories", category);
            return res.data;
        } catch (error) {
            console.error("Erro ao criar categoria:", error);
            throw error;
        }
    }

    static async getCategories() {
        try {
            const res = await api.get("/categories");
            return res.data.categories;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}