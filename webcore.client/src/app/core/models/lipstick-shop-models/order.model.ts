export interface OrderModel {
    id: string;
    userId: number;
    paymentMethodId: number;
    orderStatusId: number;
    paymentStatusId: number;
    fullName: string;
    phoneNumber: string;
    email?: string;
    shippingAddress: string;
    provinceId: number;
    districtId: number;
    shippingDate?: Date;
    receiveDate?: Date;
    note?: string;
    amount: number;
    totalQuantity: number;
    createdOn: Date;
    modifiedOn: Date;
    createdBy?: string;
    modifiedBy?: string;
    orderDetails: OrderDetailModel[];
}

export interface OrderDetailModel {
    id: string;
    orderId: string;
    productId: number;
    nameEN: string;
    nameVN: string;
    avatar: string;
    quantity: number;
    price: number;
    saleOff: boolean;
    totalPrice: number;
    discountPercent?: number;
    salePrice?: number;
    isDeleted: boolean;
}