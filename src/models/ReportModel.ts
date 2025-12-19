import type { TagModel } from "./TagModel";

export interface ReportModel {
    folder: string;
    xml: string;
    hasXml: boolean;
    sql: string;
    sqlFile: string;
    description: string;
    folderPath: string;
    type: string;
    tags: TagModel[];
    title: string;
}