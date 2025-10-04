export interface SurveyFormModel {
    id: number;
    isPeriodic: boolean;
    name: string;
    titleEN: string;
    titleVN: string;
    descriptionEN: string;
    descriptionVN: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    surveyQuestions: SelectedQuestionModel[];
}

export interface SelectedQuestionModel {
    ID: number;
    questionGroupID: number;
    questionID: number;
    priority: number;
    checked: boolean;
}