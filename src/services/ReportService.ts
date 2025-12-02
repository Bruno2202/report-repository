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
            console.log(
                folder,
                description)

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
}