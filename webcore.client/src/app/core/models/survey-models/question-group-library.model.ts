import { BaseModel } from "@models/base.model";
import { QuestionLibraryModel } from "./question-library.model";

export interface QuestionGroupLibraryModel extends BaseModel {
    id: number;
    nameVN: string;
    nameEN: string;
    note: string;
    priority: number;
    questionLibraries?: QuestionLibraryModel[];
}