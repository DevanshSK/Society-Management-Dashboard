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


