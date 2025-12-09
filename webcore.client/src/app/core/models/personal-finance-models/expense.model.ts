export interface ExpenseModel {
    id: any;
    paymentMethodId: number;
    userId: number;
    categoryId: number;
    subCategoryId?: number;
    amount: number;
    date: Date;
    note?: string;
    createdAt?: Date;
    updatedAt?: Date;
}