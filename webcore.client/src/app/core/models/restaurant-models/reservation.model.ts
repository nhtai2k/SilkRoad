import { BaseModel } from "@models/base.model";

export interface ReservationModel extends BaseModel {
  id: number;
  tableId?: number;
  code?: string;
  fullName: string;
  phoneNumber?: string;
  numberOfGuests: number;
  reservationDate: Date;
  note?: string;
  hasCheckedIn: boolean;
  hasCheckedOut: boolean;
}
