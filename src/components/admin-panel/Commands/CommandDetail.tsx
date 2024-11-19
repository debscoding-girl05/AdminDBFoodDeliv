import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useCommandStore from "@/hooks/commandStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CommandDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { commands, updateCommandStatus, fetchOrders } = useCommandStore();
  const { toast } = useToast();

  const [command, setCommand] = useState<any | null>(null);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
     console.log(commands);
    const foundCommand = commands.find((order) => order.id === id);
    setCommand(foundCommand || null);
  }, [id, commands]);

  if (!command) {
    return <div>Loading...</div>;
  }

  const { customerName, orderSummary, cartItems, status } = command;

  const handleStatusChange = (newStatus: string) => {
    updateCommandStatus(id!, newStatus)
      .then(() => {
        toast({
          title: "Status updated successfully!",
          description: `The status has been updated to "${newStatus}".`,
        });
      })
      .catch((error) => {
        toast({
          title: "Error updating status",
          description: error.message,
          variant: "destructive",
        });
      });
  };

  return (
    <div className="space-y-8">
      <Button variant="outline" onClick={() => navigate(-1)}>
        Back to Orders
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{`Order Details - ${id}`}</CardTitle>
          <CardDescription>
            Here are the details for the order placed by {customerName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold text-lg">Customer Info</h2>
              <div className="text-sm">
                <strong>Name: </strong>
                {customerName}
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-lg">Order Summary</h2>
              <div className="text-sm">
                <strong>Status: </strong>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">{status}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {[
                      "Paid",
                      "Pending",
                      "In Progress",
                      "Completed",
                      "Cancelled",
                    ].map((statusOption) => (
                      <DropdownMenuItem
                        key={statusOption}
                        onClick={() => handleStatusChange(statusOption)}
                      >
                        {statusOption}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-lg">Cart Items</h2>
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map(
                    (
                      item: { name: string; price: number; quantity: number },
                      index: number
                    ) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.price} FCFA</TableCell>
                        <TableCell>{item.price * item.quantity} FCFA</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-x-4 justify-center flex-col">
        <Button variant="destructive" onClick={() => navigate(-1)}>
          Cancel Order
        </Button>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back to Orders
        </Button>
      </div>
    </div>
  );
};

export default CommandDetail;
