import React from "react";
import { useNavigate } from "react-router-dom";
import useCommandStore from "@/hooks/commandStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CommandTable = () => {
  const navigate = useNavigate();
  const { commands, updateCommandStatus, deleteOrder } = useCommandStore(); // Fetching commands and actions from Zustand store

  // Handle command row click
  const handleCommandClick = (commandId: string) => {
    navigate(`/all-commandes/command-details/${commandId}`);
  };

  // Handle status update
  const handleStatusUpdate = (id: string, status: string) => {
    updateCommandStatus(id, status);
  };

  // Handle order deletion
  const handleDeleteOrder = (id: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      deleteOrder(id);
    }
  };

  return (
    <div className="command-table">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {commands.map((command) => (
            <TableRow
              key={command.id}
              onClick={() => handleCommandClick(command.id)}
              className="cursor-pointer"
            >
              <TableCell>{command.id}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="capitalize">
                      {command.orderSummary.status}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {[
                      "Paid",
                      "Pending",
                      "In Progress",
                      "Completed",
                      "Cancelled",
                    ].map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => handleStatusUpdate(command.id, status)}
                      >
                        {status}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>{new Date().toLocaleDateString()}</TableCell>
              <TableCell>{command.orderSummary.totalPrice} FCFA</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click from triggering onDelete
                    handleDeleteOrder(command.id);
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommandTable;
