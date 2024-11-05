"use client"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
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
import { useGetDashboardRevenueAnalyticsQuery } from "@/redux/feature/analytics/analyticsApi"
import Loader from "../Loader/Loader"

const chartConfig = {
    desktop: {
        label: "Revenue :  ",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

const RevenueAnalytices = () => {
    const { data, isLoading } = useGetDashboardRevenueAnalyticsQuery(undefined)
    const postData = data?.data?.map((item: { month: string, amount: number }) => ({
        month: item.month,
        desktop: item?.amount,
    })) || [];

    if (isLoading) {
        return <Loader />
    }

    // Calculate the date range based on the data
    const startMonth = postData[0]?.month || "";
    const endMonth = postData[postData.length - 1]?.month || "";
    const currentYear = new Date().getFullYear();
    const dateRange = `${startMonth} - ${endMonth} ${currentYear}`;

    return (
        <Card className="h-[500px] mt-5">
            <CardHeader>
                <CardTitle>Revenue Chart</CardTitle>
                <CardDescription>
                    Showing total revenue for the last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer className="h-[320px] w-full" config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={postData}
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
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            {dateRange}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}

export default RevenueAnalytices
