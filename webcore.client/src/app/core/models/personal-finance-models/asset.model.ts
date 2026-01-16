export interface AssetModel {
    id: any;
    userId: number;
    typeId: number;
    name: string;
    quantity: number;
    amount: number;
    hasLoan: boolean;
    loanAmount?: number;
    date: Date;
    note?: string;
    createdAt?: Date;
    updatedAt?: Date;
}