import React from "react";
import {  useNavigate } from "react-router-dom";

import { Navbar } from "../navbar";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  MoreHorizontal,
  SquarePlus,
  Trash2,
  UserRoundPen,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTechStore } from "@/hooks/techStore";



const AllTechs = () => {
  const columns: ColumnDef<any>[] = [
    // Define columns as before
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: any) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <span>{row.getValue("id")}</span>,
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.getValue("image") as string;
        return imageUrl ? (
          <img
            src={imageUrl}
            alt="Technology"
            className="w-16 h-16 object-cover"
          />
        ) : (
          <div>No image</div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span>{row.getValue("name")}</span>,
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => <span>{row.getValue("slug")}</span>,
    },
    {
      accessorKey: "active",
      header: "Active",
      cell: ({ row }) => (
        <div
          className={row.getValue("active") ? "text-green-500" : "text-red-500"}
        >
          {row.getValue("active") ? "Active" : "Not Active"}
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Created On",
      cell: ({ row }) => (
        <div>{new Date(row.getValue("created_at")).toLocaleDateString()}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const technology = row.original;

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
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(technology.id)}
              >
                <Copy className="mr-2 size-5 text-neutral-500" />
                Copy Technology ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate(`/techs/edit-tech/${technology.id}`)}
              >
                <UserRoundPen className="mr-2 size-5 text-neutral-500" />
                Edit Technology
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (
                    confirm("Are you sure you want to delete this technology?")
                  ) {
                    deleteTech(technology.id);
                  }
                }}
              >
                <Trash2 className="mr-2 size-5 text-red-500" />
                Delete Technology
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
 
  const deleteTech = useTechStore((state) => state.deleteTech);
  const techs = useTechStore((state) => state.techs);
   console.log("Techs:", techs);
    const navigate = useNavigate();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: techs,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <Navbar title="All Technologies" />
      <div className="flex justify-center items-center mt-2 bg-gray-200 py-2 rounded-md">
        <h1 className="text-2xl font-bold text-gray-700 ">All Technologies</h1>
      </div>
      <div className="flex justify-start items-center mt-3">
        <button className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-orange-500 hover:to-red-500 text-white font-bold py-2 px-4 rounded ml-5 mt-3 mb-3 transition ease-in-out delay-120 hover:scale-105 flex items-center">
          {" "}
          <SquarePlus style={{ marginRight: "12px" }} />
          Add Technology
        </button>
      </div>
      <div>
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
  );
};

export default AllTechs;
