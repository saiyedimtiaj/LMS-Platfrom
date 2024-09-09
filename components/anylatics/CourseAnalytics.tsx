"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetCoursesAnalyticsQuery } from "@/redux/feature/analytics/analyticsApi"
import Loader from "../Loader/Loader"

const chartConfig = {
    desktop: {
        label: "courses",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export default function CourseAnalytics() {
    const { data, isLoading } = useGetCoursesAnalyticsQuery({});

    const chartData = data?.data?.last12Months?.map((item: any) => ({
        month: item.month,
        desktop: item.count,
    })) || [];

    if (isLoading) {
        return <Loader />
    }

    return (
        <Card className="bg-none border-0">
            <CardHeader>
                <CardTitle>Courses Analytics</CardTitle>
                <CardDescription>
                    Showing total visitors for the last 12 months
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="lg:h-[400px] w-full">
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="desktop"
                            type="natural"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
