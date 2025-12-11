export interface IncomeModel {
    id: any;
    userId: number;
    sourceId: number;
    amount: number;
    date: Date;
    note?: string;
    createdAt?: Date;
    updatedAt?: Date;
}