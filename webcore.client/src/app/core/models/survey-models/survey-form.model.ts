import { BaseModel } from "@models/base.model";

export interface SurveyFormModel extends BaseModel {
    id: number;
    isPeriodic: boolean;
    name: string;
    titleEN: string;
    titleVN: string;
    descriptionEN: string;
    descriptionVN: string;
    startDate: Date;
    endDate: Date;
    surveyQuestions: SelectedQuestionModel[];
}

export interface SelectedQuestionModel {
    ID: number;
    questionGroupID: number;
    questionID: number;
    priority: number;
    checked: boolean;
}