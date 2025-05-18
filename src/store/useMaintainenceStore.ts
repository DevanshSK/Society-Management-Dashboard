import { create } from "zustand";
import { type FlatMaintenanceSummary, type MaintenanceTransaction } from "../types";
import { initialMaintenances } from "../data";
import useFlatStore from "./useFlatStore";


interface MaintenanceState {
    maintenances: MaintenanceTransaction[];
    loading: boolean;

    addOpen: boolean;
    setAddOpen: (value: boolean) => void;

    isEditing: boolean;
    editingMaintenance: MaintenanceTransaction | null;
    setEditingMaintenance: (m: MaintenanceTransaction | null) => void;

    loadMaintenances: () => void;
    addMaintenance: (maintenance: MaintenanceTransaction) => void;
    updateMaintenance: (id: string, updated: MaintenanceTransaction) => void;
    deleteMaintenance: (id: string) => void;

    getByFlatId: (flatId: string) => MaintenanceTransaction[];
    getByMonth: (month: string) => MaintenanceTransaction[];

    getSummariesByMonth: (month: string) => FlatMaintenanceSummary[];
    getDueFlatsByMonth: (month: string) => string[];

    resetMaintenances: () => void;
}

const useMaintenanceStore = create<MaintenanceState>((set, get) => ({
    maintenances: [],
    loading: false,

    addOpen: false,
    setAddOpen: (value) => set({ addOpen: value }),

    isEditing: false,
    editingMaintenance: null,
    setEditingMaintenance: (m) =>
        set({ editingMaintenance: m, isEditing: !!m }),

    loadMaintenances: () => {
        set({ loading: true });
        setTimeout(() => {
            set({ maintenances: initialMaintenances, loading: false });
        }, 500);
    },

    addMaintenance: async (maintenance) => {
        set({ loading: true });
        await new Promise((res) => setTimeout(res, 400));
        set((state) => ({
            maintenances: [...state.maintenances, maintenance],
            loading: false,
        }));
    },

    updateMaintenance: async (id, updated) => {
        set({ loading: true });
        await new Promise((res) => setTimeout(res, 400));
        set((state) => ({
            maintenances: state.maintenances.map((m) =>
                m.id === id ? { ...m, ...updated } : m
            ),
            editingMaintenance: null,
            isEditing: false,
            loading: false,
        }));
    },

    deleteMaintenance: async (id) => {
        set({ loading: true });
        await new Promise((res) => setTimeout(res, 400));
        set((state) => ({
            maintenances: state.maintenances.filter((m) => m.id !== id),
            loading: false,
        }));
    },

    getByFlatId: (flatId) =>
        get().maintenances.filter((m) => m.flatId === flatId),

    getByMonth: (month) =>
        get().maintenances.filter((m) => m.month === month),

    getSummariesByMonth: (month) => {
        const records = get().maintenances.filter((m) => m.month === month);
        const map = new Map<string, FlatMaintenanceSummary>();

        records.forEach((tx) => {
            const key = tx.flatId;
            const existing = map.get(key);
            const flat = useFlatStore.getState().getFlatById(key);

            if(existing){
                existing.totalAmount += tx.amount;
                existing.transactions.push(tx);
                if(!tx.paid) existing.isFullyPaid = false;
            } else {
                map.set(key, {
                    flatId: tx.flatId,
                    month,
                    totalAmount: tx.amount,
                    isFullyPaid: tx.paid,
                    transactions: [tx],
                    flatNo: flat?.flatNo,
                    ownerName: flat?.ownerName,
                })
            };
        });

        return Array.from(map.values());
    },

    getDueFlatsByMonth: (month) => {
        const summaries = get().getSummariesByMonth(month);
        return summaries
            .filter((summary) => !summary.isFullyPaid)
            .map((s) => s.flatId);
    },

    resetMaintenances: () => {
        set({ maintenances: [], loading: false });
    },
}));

export default useMaintenanceStore;


// import { create } from "zustand";

// const useMaintenanceStore = create((set) => ({
//     transactions: [],

//     setTransactions: (data) => set({ transactions: data }),

//     addTransaction: (txn) =>
//         set((state) => ({ transactions: [...state.transactions, txn] })),

//     getTransactionsForMonth: (month) =>
//         get().transactions.filter((t) => t.month === month),

//     isPaid: (flatId, month) =>
//         get().transactions.some((t) => t.flatId === flatId && t.month === month)
// }));



// Method 2:
// useMaintenanceStore.js
// const useMaintenanceStore = create((set, get) => ({
//   transactions: [],

//   setTransactions: (data) => set({ transactions: data }),

//   addTransaction: (txn) =>
//     set((state) => ({
//       transactions: [...state.transactions, txn]
//     })),

//   getTransactionsByMonth: (month) =>
//     get().transactions.filter((t) => t.month === month),

//   hasPaid: (flatId, month) =>
//     get().transactions.some(
//       (txn) => txn.flatId === flatId && txn.month === month
//     )
// }));


// Fetch all flats:
// const { flats } = useFlatStore();
// const { getTransactionsByMonth, hasPaid, addTransaction } = useMaintenanceStore();

// const [selectedMonth, setSelectedMonth] = useState("2025-05");

// const txns = getTransactionsByMonth(selectedMonth);


