export interface IncomeModel {
    id: number;
    source: string;
    amount: number;
    date: Date;
    note?: string;
}