export interface ResourceModel {
    id: any;
    userId: number;
    typeId: number;
    amount: number;
    date: Date;
    inflow: boolean;
    note?: string;
    createdAt?: Date;
    updatedAt?: Date;
}