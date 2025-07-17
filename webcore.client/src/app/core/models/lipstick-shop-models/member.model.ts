export interface MemberModel {
    id: number;
    genderId: number;
    provinceId: number;
    districtId: number;
    phoneNumber: string;
    email: string;
    address: string;
    fullName: string;
    birthday: Date;
    createdOn: Date;
    isActive: boolean;
}