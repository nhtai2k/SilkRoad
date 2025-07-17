import { SepayViewModel } from "./Sepay.Model";

export interface PaymentViewModel {
    id: string;
    paymentTypeId: number;
    statusId: number;
    amount: number;
    sepayObject?: string;
    note?: string;
    createdOn: string; // ISO date string
    modifiedOn: string; // ISO date string
    createdBy?: string;
    modifiedBy?: string;
    sepayModel?: SepayViewModel;
}