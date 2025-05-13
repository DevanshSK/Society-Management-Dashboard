export type FlatType = '1BHK' | '2BHK' | '3BHK';
export type VehicleType = "Car" | "Bike";
export type PaymentMethodType = "Cash" | "UPI" | "Card";

export interface Flat{
    id: string;
    flatNo: string;
    type: FlatType;
    ownerName?: string;
    occupied: boolean;
}

export interface Vehicle{
    id: string;
    flatId: string;
    vehicleNo: string;
    type: VehicleType;
}

export interface MaintainenceTransaction{
    id: string;
    flatId: string;
    amountPaid: number;
    month: string;
    paymentDate: string;
    paymentMethod: PaymentMethodType;
}

