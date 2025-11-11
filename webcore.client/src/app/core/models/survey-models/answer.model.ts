export interface AnswerModel {
    id?: number;
    participantId: string;
    questionGroupId?: string;
    questionId: string;
    questionTypeId: number;
    answerId?: string;
    answer?: string;
    rating?: number;
}