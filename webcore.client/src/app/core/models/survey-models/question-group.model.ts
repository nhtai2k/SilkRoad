import { QuestionModel } from "./question.model";

export interface QuestionGroupModel {
    id: string;
    surveyFormId?: string;
    nameEN: string;
    nameVN: string;
    priority: number;
    questions: QuestionModel[];
}