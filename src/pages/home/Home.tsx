import { CarOutlined, DollarOutlined, HomeOutlined } from "@ant-design/icons";
import { Card, Statistic } from 'antd';
import useFlatStore from "../../store/useFlatStore";
import useVehicleStore from "../../store/useVehicleStore";
import useMaintenanceStore from "../../store/useMaintainenceStore";
import { useMemo } from "react";
import dayjs from "dayjs";


const Home = () => {
    const { flats } = useFlatStore();
    const { vehicles } = useVehicleStore();
    const { maintenances } = useMaintenanceStore();

    const flatStats = useMemo(() => {
        const totalFlats = flats.length;
        const occupiedFlats = flats.filter(flat => flat.occupied).length;
        const occupancyRate = (occupiedFlats / totalFlats) * 100;

        // Flat type distribution
        const flatTypes = flats.reduce((acc, flat) => {
            acc[flat.type] = (acc[flat.type] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return {
            totalFlats,
            occupiedFlats,
            occupancyRate,
            flatTypes
        };
    }, [flats]);

    const vehicleStats = useMemo(() => {
        const totalVehicles = vehicles.length;
        const vehicleTypes = vehicles.reduce((acc, vehicle) => {
            acc[vehicle.type] = (acc[vehicle.type] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return {
            totalVehicles,
            vehicleTypes
        };
    }, [vehicles]);

    const maintenanceStats = useMemo(() => {
        const currentMonth = dayjs().format('YYYY-MM');
        const currentMonthMaintenance = maintenances.filter(m => m.month === currentMonth);

        const totalCollection = currentMonthMaintenance.reduce((sum, m) => sum + m.amount, 0);
        const paidCount = currentMonthMaintenance.filter(m => m.paid).length;
        const unpaidCount = currentMonthMaintenance.length - paidCount;

        // Payment method distribution
        const paymentMethods = currentMonthMaintenance
            .filter(m => m.paid && m.paymentMethod)
            .reduce((acc, m) => {
                acc[m.paymentMethod!] = (acc[m.paymentMethod!] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

        // Top 5 defaulters
        const defaulters = currentMonthMaintenance
            .filter(m => !m.paid)
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 5);

        return {
            totalCollection,
            paidCount,
            unpaidCount,
            paymentMethods,
            defaulters
        };
    }, [maintenances]);

    return (
        <div className="min-h-screen p-4 pt-[77px] sm:p-6 sm:pt-[85px] bg-neutral-100">
            <div className="max-w-3xl">
                <h1 className="text-2xl sm:text-3xl font-semibold mb-4" >Society Overview</h1>

                {/* Flats Overview */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <HomeOutlined /> Flats Overview
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                            <Statistic
                                title="Total Flats"
                                value={flatStats.totalFlats}
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                        <Card>
                            <Statistic
                                title="Occupied Flats"
                                value={flatStats.occupiedFlats}
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                        <Card>
                            <Statistic
                                title="Occupancy Rate"
                                value={flatStats.occupancyRate}
                                precision={2}
                                suffix="%"
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                        <Card>
                            <Statistic
                                title="Available Flats"
                                value={flatStats.totalFlats - flatStats.occupiedFlats}
                                valueStyle={{ color: '#cf1322' }}
                            />
                        </Card>
                    </div>
                </div>
                {/* Flats Overview */}

                {/* Vehicle Overview */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <CarOutlined /> Vehicle Overview
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <Statistic
                                title="Total Vehicles"
                                value={vehicleStats.totalVehicles}
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                        <Card>
                            <Statistic
                                title="Vehicle Distribution"
                                value={`${vehicleStats.vehicleTypes['Car'] || 0} Cars & ${vehicleStats.vehicleTypes['Bike'] || 0} Bikes`}
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                    </div>
                </div>
                {/* Vehicle Overview */}

                {/* Maintainence Overview */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <DollarOutlined /> Maintenance Overview
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                            <Statistic
                                title="Current Month Collection"
                                value={maintenanceStats.totalCollection}
                                precision={2}
                                prefix="₹"
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                        <Card>
                            <Statistic
                                title="Paid Transactions"
                                value={maintenanceStats.paidCount}
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                        <Card>
                            <Statistic
                                title="Pending Transactions"
                                value={maintenanceStats.unpaidCount}
                                valueStyle={{ color: '#cf1322' }}
                            />
                        </Card>
                        <Card>
                            <Statistic
                                title="Collection Rate"
                                value={(maintenanceStats.paidCount / (maintenanceStats.paidCount + maintenanceStats.unpaidCount)) * 100}
                                precision={2}
                                suffix="%"
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                    </div>
                </div>
                {/* Maintainence Overview */}
            </div>
        </div>
    )
}

export default Home