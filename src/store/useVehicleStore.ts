import { create } from "zustand";
import type { Vehicle } from "../types";
import { initialVehicles } from "../data";

interface VehicleState {
    vehicles: Vehicle[];
    loading: boolean;
    loadVehicles: () => void;

    addOpen: boolean;
    setAddOpen: (value: boolean) => void;

    isEditing: boolean;
    editingVehicle: Vehicle | null;
    setEditingVehicle: (vehicle: Vehicle | null) => void;

    addVehicle: (vehicle: Vehicle) => void;
    updateVehicle: (id: string, updatedVehicle: Vehicle) => void;
    deleteVehicle: (id: string) => void;

    resetVehicles: () => void;
}

const useVehicleStore = create<VehicleState>((set) => ({
    vehicles: [],
    loading: false,
    addOpen: false,

    setAddOpen: (value) => set({ addOpen: value }),

    isEditing: false,
    editingVehicle: null,
    setEditingVehicle: (vehicle) => {
        set({
            editingVehicle: vehicle, isEditing: !!vehicle,
        });
    },
    loadVehicles: () => {
        set({ loading: true });
        setTimeout(() => {
            set({ vehicles: initialVehicles, loading: false });
        }, 500);
    },

    addVehicle: async (vehicle) => {
        set({ loading: true })
        await new Promise((resolve) => setTimeout(resolve, 400));
        set((state) => ({
            vehicles: [...state.vehicles, vehicle],
            loading: false,
        }));
    },
    updateVehicle: async (id, vehicle) => {
        set({ loading: true });
        await new Promise((resolve) => setTimeout(resolve, 400));
        set((state) => ({
            vehicles: state.vehicles.map((f) => (f.id === id ? { ...f, ...vehicle } : f)),
            editingVehicle: null,
            isEditing: false,
            loading: false,
        }));
    },
    deleteVehicle: async (id) => {
        set({ loading: true });
        await new Promise((resolve) => setTimeout(resolve, 400));
        set((state) => ({
            vehicles: state.vehicles.filter((f) => f.id !== id),
            loading: false,
        }));
    },
    resetVehicles: () => {
        set({ vehicles: [], loading: false });
    }
}))

export default useVehicleStore;