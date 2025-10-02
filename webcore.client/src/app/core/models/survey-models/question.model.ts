import { PredefinedAnswerModel } from "./predefined-answer.model";

export interface QuestionModel {
    id?: string;
    questionGroupId?: string;
    surveyFormId?: string;
    questionTypeId: number;
    priority: number;
    nameEN: string;
    nameVN: string;
    predefinedAnswers?: PredefinedAnswerModel[];
    expanded?: boolean; // For UI purpose
}