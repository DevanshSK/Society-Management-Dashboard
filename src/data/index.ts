import type { Flat, Vehicle } from "../types";

export const initialFlats: Flat[] = [
  { id: "1", flatNo: "101", type: "1BHK", occupied: true, ownerName: "Harry" },
  { id: "2", flatNo: "102", type: "3BHK", occupied: false },
  { id: "3", flatNo: "103", type: "2BHK", occupied: true, ownerName: "Lily" },
  { id: "4", flatNo: "104", type: "1BHK", occupied: false },
  { id: "5", flatNo: "105", type: "2BHK", occupied: true, ownerName: "Ron" },
  { id: "6", flatNo: "106", type: "3BHK", occupied: true, ownerName: "Hermione" },
  { id: "7", flatNo: "107", type: "1BHK", occupied: true, ownerName: "Neville" },
  { id: "8", flatNo: "108", type: "2BHK", occupied: false },
  { id: "9", flatNo: "109", type: "3BHK", occupied: true, ownerName: "Ginny" },
  { id: "10", flatNo: "110", type: "1BHK", occupied: false },
  { id: "11", flatNo: "201", type: "2BHK", occupied: true, ownerName: "Luna" },
  { id: "12", flatNo: "202", type: "3BHK", occupied: false },
  { id: "13", flatNo: "203", type: "1BHK", occupied: true, ownerName: "Fred" },
  { id: "14", flatNo: "204", type: "2BHK", occupied: false },
  { id: "15", flatNo: "205", type: "3BHK", occupied: true, ownerName: "George" },
  { id: "16", flatNo: "206", type: "2BHK", occupied: true, ownerName: "Cho" },
  { id: "17", flatNo: "207", type: "1BHK", occupied: false },
  { id: "18", flatNo: "208", type: "2BHK", occupied: false },
  { id: "19", flatNo: "209", type: "3BHK", occupied: true, ownerName: "Severus" },
  { id: "20", flatNo: "210", type: "1BHK", occupied: true, ownerName: "Dobby" },
];


export const initialVehicles: Vehicle[] = [
  { id: "v1", flatId: "1", vehicleNo: "MH12AB1234", type: "Car" },
  { id: "v2", flatId: "3", vehicleNo: "MH12CD5678", type: "Bike" },
  { id: "v3", flatId: "5", vehicleNo: "MH12EF9101", type: "Car" },
  { id: "v4", flatId: "6", vehicleNo: "MH12GH2345", type: "Bike" },
  { id: "v5", flatId: "7", vehicleNo: "MH12IJ6789", type: "Car" },
  { id: "v6", flatId: "9", vehicleNo: "MH12KL1122", type: "Bike" },
  { id: "v7", flatId: "11", vehicleNo: "MH12MN3344", type: "Car" },
  { id: "v8", flatId: "13", vehicleNo: "MH12OP5566", type: "Bike" },
  { id: "v9", flatId: "15", vehicleNo: "MH12QR7788", type: "Car" },
  { id: "v10", flatId: "16", vehicleNo: "MH12ST9900", type: "Bike" },
  { id: "v11", flatId: "19", vehicleNo: "MH12UV2233", type: "Car" },
  { id: "v12", flatId: "20", vehicleNo: "MH12WX4455", type: "Bike" },
];