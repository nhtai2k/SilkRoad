export interface IncomeModel {
    id: any;
    userId: number;
    source: string;
    amount: number;
    date: Date;
    note?: string;
    createdAt?: Date;
    updatedAt?: Date;
}