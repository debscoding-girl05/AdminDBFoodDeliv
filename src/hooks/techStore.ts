import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define Slug type
type Slug = string;

// Define Technology interface
interface Technology {
  id: number;
  name: string;
  slug: Slug;
  image: string;
  active: boolean;
  created_at: string; // Use string to match schema
}

// Define the techStore interface
interface TechStore {
  techs: Technology[];
  addTech: (name: string, image: string, slug: Slug, active: boolean, created_at: string) => void;
  setImage: (id: number, image: string) => void;
  editTech: (id: number, name: string, image: string, slug: Slug, active: boolean, created_at: string) => void;
  deleteTech: (id: number) => void;
}

// Create the Zustand store with persistence
export const useTechStore = create(persist<TechStore>(
  (set) => ({
    techs: [],
    addTech: (name: string, image: string, slug: Slug, active: boolean, created_at: string) =>
      set((state) => ({
        techs: [
          ...state.techs,
          {
            id: Date.now(), // Unique ID based on the current timestamp
            name,
            image,
            slug,
            active,
            created_at, // Use created_at string
          },
        ],
      })),
    setImage: (id: number, image: string) =>
      set((state) => ({
        techs: state.techs.map((tech) =>
          tech.id === id ? { ...tech, image } : tech
        ),
      })),
      editTech: (id: number, name: string, image: string, slug: string, active: boolean, created_at: string) =>
      set((state) => ({
        techs: state.techs.map((tech) =>
          tech.id === id ? { ...tech, name, image, slug, active, created_at } : tech
        ),
      })),
      deleteTech: (id: number) =>
      set((state) => ({
        techs: state.techs.filter((tech) => tech.id !== id),
      })),
  }),
  {
    name: 'tech-storage', // Updated store name
    storage: createJSONStorage(() => localStorage),
  }
));
