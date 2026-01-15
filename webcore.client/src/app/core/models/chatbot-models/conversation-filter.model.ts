export interface ConversationFilterModel {
    pageSize?: number;
    pageIndex?: number;
    source: string;
    searchText?: string;
    startDate?: Date;
    endDate?: Date;
}
