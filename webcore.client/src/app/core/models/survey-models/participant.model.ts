import { AnswerModel } from "./answer.model";
import { ParticipantInfoModel } from "./participant-info.model";

export interface ParticipantModel {
    id?: string;
    surveyFormId: number;
    createdAt: Date;
    isCompleted: boolean;
    isRejected: boolean;
    isHighlighted: boolean;
    reason?: string;
    answers?: AnswerModel[];
    participantInfos?: ParticipantInfoModel[];
}

export function initializeParticipantModel(): ParticipantModel {
    return {
        surveyFormId: 0,
        createdAt: new Date(),
        isCompleted: false,
        isRejected: false,
        isHighlighted: false
    };
}