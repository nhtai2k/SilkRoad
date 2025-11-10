import { BaseModel } from "@models/base.model";
import { QuestionGroupModel } from "./question-group.model";
import { QuestionModel } from "./question.model";

export interface SurveyFormModel extends BaseModel {
    id: number;
    storeId?: number;
    formStyleId: number;
    name: string;
    titleEN: string;
    titleVN: string;
    descriptionEN: string;
    descriptionVN: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    isLimited: boolean;
    isPublished: boolean;
    maxParticipants: number;
    note?: string;
    questionGroups: QuestionGroupModel[];
    questions: QuestionModel[];
}

// export interface SelectedQuestionModel {
//     ID: number;
//     questionGroupID: number;
//     questionID: number;
//     priority: number;
//     checked: boolean;
// }