import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useTechStore } from "./techStore"; // Import techStore

// Define Slug type
type Slug = string;

// Define Tag type
type Tag = {
    id: number;
    name: string;
};

// Update the Tutorial interface
interface Tutorial {
    id: number;
    title: string;
    slug: Slug;
    created_at?: string;
    resume: string;
    meta_title: string;
    meta_description: string;
    meta_keywords:  Tag[];
    content: string;
    status: boolean;
    video_url: string;
    technology_id: number;
    image: string;
    publish: boolean;
    defaultTechnology:string,
    level:string,
    difficulty:number,
    technologies: { id: number; name: string }[];
    selectedTechs: { id: number; name: string }[];
    
}

// Define the tutoStore interface
interface TutoStore {
    tutorials: Tutorial[];
    addTutorial: (tutorial: Omit<Tutorial, 'id'>) => void;
    editTutorial: (id: number, tutorial: Tutorial) => void;
    deleteTutorial: (id: number) => void;
    setImage: (id: number, image: string) => void;
}

// Create the Zustand store with persistence
export const useTutoStore = create(persist<TutoStore>(
    (set) => ({
        tutorials: [],
        addTutorial: (tutorial: Omit<Tutorial, 'id'>) => set((state) => {
            const techStore = useTechStore.getState();
            const techsWithNames = tutorial.technologies.map(tech => ({
                id: tech.id,
                name: techStore.getTechnology(tech.id)?.name || ''
            }));
            return { 
                tutorials: [...state.tutorials, {
                    ...tutorial,
                    id: Date.now(),
                    technologies: techsWithNames
                }]
            };
        }),
        editTutorial: (id: number, tutorial: Tutorial) => set((state) => ({ 
            tutorials: state.tutorials.map(
                t => t.id === id ? tutorial : t
            ) 
        })),
        deleteTutorial: (id: number) => set((state) => ({ 
            tutorials: state.tutorials.filter(t => t.id !== id) 
        })),
        setImage: (id: number, image: string) =>
      set((state) => ({
        tutorials: state.tutorials.map((tuto) =>
          tuto.id === id ? { ...tuto, image } : tuto
        ),
      })),
    }),
    {
        name: "tutorials",
        storage: createJSONStorage(() => localStorage),
    }
));