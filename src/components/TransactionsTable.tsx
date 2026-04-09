"use client"

import { trpc } from "@/app/_trpc/client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import type { Transaction } from "@prisma/client"
import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { format } from "date-fns"
import { ChevronDown, ChevronsUpDown, MoreHorizontal } from "lucide-react"
import * as React from "react"
import { toast } from 'sonner'
import { categoriesList } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function TransactionsTable({ data }: { data: Transaction[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [cat, setCat] = React.useState("")
    const utils = trpc.useContext()
    const router = useRouter()
    const { mutate: removeTransaction } = trpc.removeTransaction.useMutation({
        onSuccess: () => {
            utils.getTransactions.invalidate()
            toast.success("Transaction has been removed.")
        }
    })

    const columns = React.useMemo<ColumnDef<Transaction>[]>(() => [
        {
            accessorKey: "index",
            header: () => <div>Index</div>,
            cell: ({ row }) => <div className="capitalize">{row.index + 1}.</div>,
        },
        {
            accessorKey: "receiver",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Paid to
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue("receiver")}</div>,
        },
        {
            accessorKey: "category",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Category
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue("category")}</div>,
        },
        {
            accessorKey: "date",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Date
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const date = row.getValue("date") as Date
                return <div>{format(date, "PPP").slice(0, -6)}</div>
            },
        },
        {
            accessorKey: "amount",
            header: () => <div>Amount</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("amount"))
                const formatted = new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                }).format(amount)
                return <div className="font-medium">{formatted}</div>
            },
        },
        {
            accessorKey: "method",
            header: () => <div>Method</div>,
            cell: ({ row }) => <div className="font-medium">{row.getValue("method")}</div>
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const transaction = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => router.push(`/dashboard/${transaction.id}`)}>Show Details</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => removeTransaction(transaction.id)}>Remove Transaction</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ], [router, removeTransaction])

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    })

    return (
        <div className="w-full">
            <div className="flex sm:items-center py-4 gap-4 flex-col sm:flex-row md">
                <Input
                    placeholder="Search transactions..."
                    onChange={(event) => table.setGlobalFilter(event.target.value)}
                    className="w-full sm:max-w-sm"
                />
                <div className="flex gap-2 justify-between w-full">
                    {/* Category Drop Down */}
                    <div className="flex lg:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    {cat.length ? cat : "Categories"} <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {categoriesList.map((category) => (
                                    <DropdownMenuCheckboxItem
                                        key={category}
                                        className="capitalize"
                                        checked={category === cat}
                                        onCheckedChange={() => {
                                            if (cat === category) {
                                                setCat("")
                                                table.getColumn("category")?.setFilterValue("")
                                            } else {
                                                setCat(category)
                                                table.getColumn("category")?.setFilterValue(category)
                                            }
                                        }}
                                    >
                                        {category}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* BUTTONS */}
                    <div className="hidden lg:flex gap-2 items-center overflow-auto">
                        {categoriesList.map(item =>
                            <button
                                key={item}
                                className={`${cat === item ? "bg-muted" : "bg-background"} text-sm hover:bg-muted text-foreground border border-muted-foreground rounded-full py-1 px-3`}
                                onClick={() => {
                                    if (cat === item) {
                                        setCat("")
                                        table.getColumn("category")?.setFilterValue("")
                                    } else {
                                        setCat(item)
                                        table.getColumn("category")?.setFilterValue(item)
                                    }
                                }}
                            >
                                <span>{item}</span>
                            </button>)
                        }
                    </div>

                    {/* Columns Drop Down */}
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
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
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
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
