import { PredefinedAnswerModel } from "./predefined-answer.model";

export interface QuestionModel {
    id: number;
    questionTypeId: number;
    questionGroupId: number;
    chartLabel: string;
    nameEN: string;
    nameVN: string;
    description: string;
    // isEdited: boolean;
    predefinedAnswers: PredefinedAnswerModel[];
    checked: boolean;
    priority: number;
}