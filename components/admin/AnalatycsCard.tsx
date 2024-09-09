"use client";

import { Activity, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useGetDashboardAnalyticsQuery } from "@/redux/feature/analytics/analyticsApi";

const AnalatycsCard = () => {
    const { data, isLoading } = useGetDashboardAnalyticsQuery(undefined);

    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <h1 className="h-6 w-24 bg-gray-200 animate-pulse rounded"></h1>
                    ) : (
                        <h1 className="text-2xl font-bold">${data?.data?.revenue}</h1>
                    )}
                </CardContent>
            </Card>

            <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Orders</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <h1 className="h-6 w-24 bg-gray-200 animate-pulse rounded"></h1>
                    ) : (
                        <h1 className="text-2xl font-bold">+{data?.data?.subscription}</h1>
                    )}
                </CardContent>
            </Card>

            <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active User</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <h1 className="h-6 w-24 bg-gray-200 animate-pulse rounded"></h1>
                    ) : (
                        <h1 className="text-2xl font-bold">+{data?.data?.users}</h1>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AnalatycsCard;
