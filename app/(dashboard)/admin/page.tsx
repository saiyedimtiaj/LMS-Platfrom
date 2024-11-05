import AnalatycsCard from '@/components/admin/AnalatycsCard';
import DashbaordOrders from '@/components/admin/DashbaordOrders';
import RecentOrder from '@/components/admin/RecentOrder';
import RevenueAnalytices from '@/components/anylatics/RevenueAnalytices';
import React from 'react';

const page = () => {
    return (
        <div>
            <AnalatycsCard />
            <DashbaordOrders />
            <RevenueAnalytices />
            <RecentOrder />
        </div>
    );
};

export default page;