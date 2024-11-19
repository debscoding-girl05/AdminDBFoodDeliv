import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useCategStore } from "./categorieStore";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig"; // Ensure your Firebase config is correctly set up

// Define Dish interface
interface Dish {
  id: string;
  name: string;
  price: number;
  image: string;
  created_at: string; // Use string to match schema
  select_categs: { id: number; name: string }[];
}

// Define the DishStore interface
interface DishStore {
  dishes: Dish[];
  fetchDishes: () => void;
  addDish: (dish: Omit<Dish, "id">) => void;
  setImage: (id: number, image: string) => void;
  editDish: (id: number, dish: Dish) => void;
  deleteDish: (id: number) => void;
}

// Create the Zustand store
export const useDishStore = create(
  persist<DishStore>(
    (set, get) => ({
      dishes: [],

      // Fetch all dishes from Firestore
      fetchDishes: async () => {
        const dishesCollection = collection(db, "dishes");
        const snapshot = await getDocs(dishesCollection);
        const dishes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data() as Omit<Dish, "id">,
        })) as Dish[];
        set({ dishes });
      },

      // Add a new dish to Firestore
      addDish: async (dish: Omit<Dish, "id">) => {
        const categStore = useCategStore.getState();
        const catNames = dish.select_categs.map((cat) => ({
          id: cat.id,
          name: categStore.getCateg(cat.id)?.title || "",
        }));

        const newDish = {
          ...dish,
          created_at: new Date().toISOString(),
          select_categs: catNames,
        };

        const docRef = await addDoc(collection(db, "dishes"), newDish);
        set((state) => ({
          dishes: [...state.dishes, { ...newDish, id: docRef.id }],
        }));
      },

      // Edit an existing dish in Firestore
      editDish: async (id: number, dish: Dish) => {
        const { id: _, ...dishData } = dish; // Omit the id field
        const dishRef = doc(db, "dishes", String(id));
        await updateDoc(dishRef, dishData); // Use dishData instead
        set((state) => ({
          dishes: state.dishes.map((d) => (d.id === String(id) ? dish : d)),
        }));
      },
      // Set the image for a dish
      setImage: async (id: number, image: string) => {
        const dishRef = doc(db, "dishes", String(id));
        await updateDoc(dishRef, { image });

        set((state) => ({
          dishes: state.dishes.map((dish) =>
            dish.id === String(id) ? { ...dish, image } : dish
          ),
        }));
      },

      // Delete a dish from Firestore
      deleteDish: async (id: number) => {
        const dishRef = doc(db, "dishes", String(id));
        await deleteDoc(dishRef);

        set((state) => ({
          dishes: state.dishes.filter((dish) =>  dish.id === String(id)),
        }));
      },
    }),
    {
      name: "dishes-storage", // Updated store name
      storage: createJSONStorage(() => localStorage),
    }
  )
);
