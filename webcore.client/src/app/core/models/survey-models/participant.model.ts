import { AnswerModel } from "./answer.model";
import { ParticipantInfoModel } from "./participant-info.model";
import { SurveyFormModel } from "./survey-form.model";

export interface ParticipantModel {
    id: any;
    surveyFormId: number;
    createdAt?: Date;
    createdBy?: string;
    isCompleted?: boolean;
    isRejected?: boolean;
    isHighlighted?: boolean;
    isReviewMode?: boolean;
    reason?: string;
    surveyForm?: SurveyFormModel;
    answers?: AnswerModel[];
    participantInfos?: ParticipantInfoModel[];
}

// export function initializeParticipantModel(): ParticipantModel {
//     return {
//         surveyFormId: 0,
//         createdAt: new Date(),
//         isCompleted: false,
//         isRejected: false,
//         isHighlighted: false
//     };
// }