import { QuestionModel } from "./question.model";

export interface QuestionGroupModel {
    id: number;
    nameEN: string;
    nameVN: string;
    description: string;
    priority: number;
    isActive: boolean;
    questions: QuestionModel[];
}