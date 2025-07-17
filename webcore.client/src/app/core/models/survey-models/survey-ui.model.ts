export interface SurveyUIModel {
    ID: number;
    SurveyFormID: number;
    FullName: string;
    PhoneNumber: string;
    Email: string;
    Title: string;
    Description: string;
    questionGroupUIs: QuestionGroupUIModel[];
}

export  interface QuestionGroupUIModel {
    questionGroupID: number;
    questionGroupName: string;
    questionUIs: QuestionUIModel[];
}

export interface QuestionUIModel {
    selectQuestionID: number;
    questionID: number;
    questionTypeID: number;
    questionName: string;
    answerID: number;
    answerOfCustomer: string;
    rating: number;
    point: number;
    answers: AnswerUIModel[];
}

export interface AnswerUIModel {
    ID: number;
    name: string;
    checked: boolean;
    point: number;
}