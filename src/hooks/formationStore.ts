import {create} from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useTechStore } from "./techStore";
// Define Slug type
type Slug = string;

// Define Tag type
type Tag = {
    id: number;
    name: string;
};



//Formation interface
interface Formation{
    id:number;
    name:string;
    slug:Slug;
    duration:string;
    resume:string;
    content:string;
    meta_title:string;
    meta_description: string;
    image: string;
    status: boolean;
    publish:boolean;
    meta_keywords:  Tag[];
    level:string;
    defaultTechnology:string;
     technologies: { id: number; name: string }[];
}

// Define the tutoStore interface
interface FormationStore {
    formations: Formation[];
    addFormation: (Formation: Omit<Formation, 'id'>) => void;
    editFormation: (id: number, formation: Formation) => void;
    deleteFormation: (id: number) => void;
    setImage: (id: number, image: string) => void;
    getFormation:(id:number)=>Formation | undefined;
}


// Create the Zustand store with persistence
export const useFormationStore = create(persist<FormationStore>(
    (set,get) => ({
        formations: [],
        addFormation: (formation: Omit<Formation, 'id'>) => set((state) => {
            const techStore = useTechStore.getState();
            const techsWithNames = formation.technologies.map(tech => ({
                id: tech.id,
                name: techStore.getTechnology(tech.id)?.name || ''
            }));
            return { 
                formations: [...state.formations, {
                    ...formation,
                    id: Date.now(),
                    technologies: techsWithNames
                }]
            };
        }),
        editFormation: (id: number, formation: Formation) => set((state) => ({ 
            formations: state.formations.map(
                f => f.id === id ? formation : f
            ) 
        })),
        deleteFormation: (id: number) => set((state) => ({ 
            formations: state.formations.filter(f => f.id !== id) 
        })),
        setImage: (id: number, image: string) =>
      set((state) => ({
        formations: state.formations.map((formt) =>
          formt.id === id ? { ...formt, image } : formt
        ),
      })),
      getFormation:(id:number)=>get().formations.find((formt)=> formt.id === id),
    }),
    {
        name: "formations",
        storage: createJSONStorage(() => localStorage),
    }
));