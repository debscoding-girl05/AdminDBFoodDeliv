import { create } from "zustand";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

// Define types for cart items and order summary
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderSummary {
  status: string;
  totalPrice: number;  // Add a total price field
  deliveryFee: number;  // Delivery fee (optional)
}

interface Command {
  id: string;
  name?: string; // Optional field for order name
  orderSummary: OrderSummary;
  cartItems: CartItem[];  // Add cartItems field
}

// Define the state and actions
interface CommandStore {
  commands: Command[];
  fetchOrders: () => Promise<void>;
  updateCommandStatus: (id: string, status: string) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
}

// Create the Zustand store
const useCommandStore = create<CommandStore>((set) => ({
  commands: [],
  fetchOrders: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const commands: Command[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        orderSummary: {
          status: doc.data().orderSummary?.status || "paid",  // default status
          totalPrice: doc.data().orderSummary?.totalPrice || 0,
          deliveryFee: doc.data().orderSummary?.deliveryFee || 0,
        },
        cartItems: doc.data().cartItems || [],  // Default to empty array if no cartItems
        name: doc.data().name || "",  // Optional order name
      }));
      set({ commands });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  },
  updateCommandStatus: async (id, status) => {
    try {
      const orderRef = doc(db, "orders", id);
      await updateDoc(orderRef, {
        orderSummary: { status },
      });
      set((state) => ({
        commands: state.commands.map((command) =>
          command.id === id
            ? { ...command, orderSummary: { ...command.orderSummary, status } }
            : command
        ),
      }));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  },
  deleteOrder: async (id) => {
    try {
      const orderRef = doc(db, "orders", id);
      await deleteDoc(orderRef);
      set((state) => ({
        commands: state.commands.filter((command) => command.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  },
}));

export default useCommandStore;
