import type { MergedVehicle, Vehicle } from "../types";


export function toVehicle(merged: MergedVehicle): Vehicle {
  const { id, flatId, vehicleNo, type } = merged;
  return { id, flatId, vehicleNo, type };
}