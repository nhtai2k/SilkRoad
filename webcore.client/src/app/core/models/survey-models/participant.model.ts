export interface ParticipantModel {
    id: string;
    surveyFormId: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    createdOn: Date;
    note: string;
}