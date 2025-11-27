export interface ExpenseModel {
    id: number;
    categoryId: number;
    subCategoryId: number;
    amount: number;
    date: Date;
    note?: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    createdBy: string;
    modifiedBy: string;
}