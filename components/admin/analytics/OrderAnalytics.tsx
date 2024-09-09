"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetOrdersAnalyticsQuery } from "@/redux/feature/analytics/analyticsApi"
import Loader from "@/components/Loader/Loader"
const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]

const chartConfig = {
    desktop: {
        label: "orders",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

function OrderAnalytics() {
    const { data, isLoading } = useGetOrdersAnalyticsQuery({});

    const chartData = data?.data?.last12Months?.map((item: any) => ({
        month: item.month,
        desktop: item.count,
    })) || [];

    if (isLoading) {
        return <Loader />
    }

    const date = new Date()
    return (
        <Card className="bg-none border-0">
            <CardHeader>
                <CardTitle>Orders Analytics</CardTitle>
                <CardDescription>{data?.order?.last12Months[0].month} - {data?.order?.last12Months[11].month}  {date.getFullYear()}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="lg:h-[420px] w-full">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
export default OrderAnalytics
