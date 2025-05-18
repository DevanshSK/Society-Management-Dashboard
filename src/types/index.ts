export type FlatType = '1BHK' | '2BHK' | '3BHK';
export type VehicleType = "Car" | "Bike";
export type PaymentMethodType = "Cash" | "UPI" | "Card" | "Bank Transfer";

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

export interface MergedVehicle extends Vehicle {
    flatNo: string | null;
    ownerName: string | null;
}

export interface MaintenanceTransaction{
    id: string;
    flatId: string;
    month: string;  // YYYY-MM
    amount: number;
    paid: boolean;
    paymentDate?: string;
    paymentMethod?: PaymentMethodType;
    notes?: string;
}

export interface FlatMaintenanceSummary {
  flatId: string;
  month: string; // YYYY-MM
  totalAmount: number;
  isFullyPaid: boolean;
  transactions: MaintenanceTransaction[];
  flatNo?: string;
  ownerName?: string;
}