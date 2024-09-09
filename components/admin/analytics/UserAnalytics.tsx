"use client";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetUsersAnalyticsQuery } from "@/redux/feature/analytics/analyticsApi";
import Loader from "@/components/Loader/Loader";


const chartConfig = {
    desktop: {
        label: "User",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export default function UserAnalytics() {
    const { data, isLoading } = useGetUsersAnalyticsQuery({});

    const chartData = data?.data?.last12Months?.map((item: any) => ({
        month: item.month,
        desktop: item.count,
    })) || [];
    return (
        isLoading ? <Loader /> : <Card className="bg-none border-0">
            <CardHeader>
                <CardTitle>User Analytics</CardTitle>
                <CardDescription>
                    Showing total visitors for the last 12 months
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer className="lg:h-[400px] w-full" config={chartConfig} >
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} stroke="var(--grid-color)" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey="desktop"
                            type="natural"
                            fill="var(--color-desktop)"
                            fillOpacity={0.4}
                            stroke="var(--color-desktop)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
