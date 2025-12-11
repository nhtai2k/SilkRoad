export interface ExpenseModel {
    id: any;
    paymentMethodId: number;
    userId: number;
    categoryId: number;
    subCategoryId?: number;
    amount: number;
    date: Date;
    hasRefund: boolean;
    refundAmount?: number;
    note?: string;
    createdAt?: Date;
    updatedAt?: Date;
}