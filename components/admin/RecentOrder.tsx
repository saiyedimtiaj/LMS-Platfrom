"use client"
import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Payment } from "./Invoices"
import { useGetAllOrdersQuery } from "@/redux/feature/orders/ordersApi"

const RecentOrder = () => {
    const { data, isLoading, error } = useGetAllOrdersQuery(undefined)

    const columns: ColumnDef<Payment>[] = [
        {
            accessorKey: "name",
            header: () => <div>Course Name</div>,
            cell: ({ row }) => <div className="font-medium">
                {row?.original?.courseId?.name}
            </div>,
        },
        {
            accessorKey: "email",
            header: () => <div>Email</div>,
            cell: ({ row }) => <div className="font-medium">
                {row?.original?.userId?.email}
            </div>,
        },
        {
            accessorKey: "amount",
            header: () => <div>Amount</div>,
            cell: ({ row }) => <div className="font-medium">
                {row?.original?.amount}
            </div>,
        },
        {
            accessorKey: "Date",
            header: () => <div>Date</div>,
            cell: ({ row }) => <div className="font-medium">
                {row?.original?.createdAt}
            </div>,
        },
    ]


    const table = useReactTable({
        data: data?.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    });

    if (isLoading) {
        return <p>Loading....</p>;
    }
    if (error) {
        console.log(error);
        return <p>Somthing went wrong</p>;
    }

    return (
        <div className="w-full mt-8">
            <h1 className="text-2xl font-bold">Recent Bookings</h1>
            <div className="border mt-3">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel()?.rows?.length ? (
                            table.getRowModel()?.rows?.slice(0, 5)?.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default RecentOrder
