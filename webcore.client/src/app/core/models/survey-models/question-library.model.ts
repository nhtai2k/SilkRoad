import { BaseModel } from "@models/base.model";
import { PredefinedAnswerLibraryModel } from "./predefined-answer-library.model";

export interface QuestionLibraryModel extends BaseModel {
    id: number;
    questionGroupLibraryId: number;
    questionTypeId: number;
    nameVN: string;
    nameEN: string;
    note: string;
    predefinedAnswerLibraries?: PredefinedAnswerLibraryModel[];
}