"use client"

import { useEffect, useState } from "react"
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
import { ArrowUpDown, ChevronDown, Edit, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import Loader from "@/components/Loader/Loader";
import { useDeleteCourseMutation, useGetAllCoursesQuery } from "@/redux/feature/courses/coursesApi";
import ConfirmModal from "@/components/dialog/ConfirmModal"
import { toast } from "sonner"
import Link from "next/link"
import Image from "next/image"


export type Payment = {
    _id: string
    name: string
    role: string
    price: number
    createdAt: string
    thumbnail: {
        url: string
        public_id: string
    }
}

const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "thumbnail",
        header: () => <div className="text-left">Image</div>,
        cell: ({ row }) => {
            return <div>
                <Image width={48} height={48} className="h-12 w-12 object-cover" src={row.original.thumbnail.url} alt="image" />
            </div>
        },
    },
    {
        accessorKey: "name",
        header: "name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="text-left font-medium">$ {row.getValue("price")}</div>
        },
    },
    {
        accessorKey: "createdAt",
        header: () => <div className="text-left">Created At</div>,
        cell: ({ row }) => {
            return <div className="text-left font-medium">{row.getValue("createdAt")}</div>
        },
    },
    {
        id: "actions",
        header: () => <div className="text-left">Action</div>,
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <Button size="sm" className="px-[6px] h-[26px]" ><Edit size={16} /></Button>
                    <Button size="sm" className="px-[6px] h-[26px]" ><Trash size={16} /></Button>
                </div>
            )
        },
    },
]

const CoursesData = () => {
    const { data, isLoading, error } = useGetAllCoursesQuery(undefined);
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId, setUserId] = useState('');
    const [deleteUser, { isSuccess, isError, error: courseError, }] = useDeleteCourseMutation()

    const handleModal = (id: string) => {
        setUserId(id)
        setIsModalOpen(true)
    }

    const handleConfirm = async () => {
        await deleteUser(userId)
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("User delete Sucessfully!")
        }
        if (isError) {
            console.log(courseError);
            toast.error("Something went wrong!")
        }
    }, [isSuccess, isError, courseError])


    const columns: ColumnDef<Payment>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "thumbnail",
            header: () => <div className="text-left">Image</div>,
            cell: ({ row }) => {
                return <div>
                    <Image width={48} height={48} className="h-12 w-12 object-cover" src={row.original.thumbnail.url} alt="image" />
                </div>
            },
        },
        {
            accessorKey: "name",
            header: "name",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "price",
            header: ({ column }) => {
                return (
                    <Button
                        className="text-left"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Price
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return <div className="text-left font-medium">$ {row.getValue("price")}</div>
            },
        },
        {
            accessorKey: "createdAt",
            header: () => <div className="text-left">Created At</div>,
            cell: ({ row }) => {
                return <div className="text-left font-medium">{row.getValue("createdAt")}</div>
            },
        },
        {
            id: "actions",
            header: () => <div className="text-left">Action</div>,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <Link href={`/admin/courses/${row.original._id}`}>
                            <Button size="sm" className="px-[6px] h-[26px]" ><Edit size={16} /></Button>
                        </Link>
                        <Button onClick={() => handleModal(row.original._id)} size="sm" className="px-[6px] h-[26px]" ><Trash size={16} /></Button>
                    </div>
                )
            },
        },
    ]

    const table = useReactTable({
        data: data?.data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    if (isLoading) {
        return <p>Loading....</p>
    }


    if (error) {
        return "Something went wrong!"
    }
    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter Name..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table?.getHeaderGroups()?.map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table?.getRowModel()?.rows?.length ? (
                            table?.getRowModel()?.rows.map((row) => (
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
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
            <ConfirmModal open={isModalOpen} setOpen={setIsModalOpen} handleConfirm={handleConfirm} />
        </div>
    );
};

export default CoursesData;