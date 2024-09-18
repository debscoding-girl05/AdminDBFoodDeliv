import React from "react";
import { useNavigate } from "react-router-dom";
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
import { MoreHorizontal } from "lucide-react";
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
import { useTutoStore } from "@/hooks/tutoStore";

const AllTutos: React.FC = () => {
  const columns: ColumnDef<any>[] = [
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
            alt="Tutorial Image"
            className="w-16 h-16 object-cover"
          />
        ) : (
          <div>No image</div>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <span>{row.getValue("title")}</span>,
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => <span>{row.getValue("slug")}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div
          className={row.getValue("status") ? "text-green-500" : "text-red-500"}
        >
          {row.getValue("status") ? "Active" : "Not Active"}
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
        const tutorial = row.original;

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
                onClick={() => navigator.clipboard.writeText(tutorial.id)}
              >
                Copy Tutorial ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  navigate(`/tutorials/edit-tutorial/${tutorial.id}`)
                }
              >
                Edit Tutorial
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (
                    confirm("Are you sure you want to delete this tutorial?")
                  ) {
                    deleteTutorial(tutorial.id);
                  }
                }}
              >
                Delete Tutorial
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const deleteTutorial = useTutoStore((state) => state.deleteTutorial);
  const tutorials = useTutoStore((state) => state.tutorials);
  const navigate = useNavigate();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: tutorials,
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
      <Navbar title="All Tutorials" />
      <div className="flex justify-center items-center mt-2 bg-gray-200 py-2 rounded-md shadow-xl">
        <h1 className="text-2xl font-bold text-gray-700 ">All Tutorials</h1>
      </div>
      <div className="flex justify-start items-center mt-3">
        <button
          onClick={() => navigate("/tutorials/add-tutorial")}
          className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-orange-500 hover:to-red-500 text-white font-bold py-2 px-4 rounded ml-5 mt-3 mb-3 transition ease-in-out delay-120 hover:scale-105"
        >
          Add Tutorial
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

export default AllTutos;
