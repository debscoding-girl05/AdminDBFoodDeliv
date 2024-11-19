import {create} from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Categ {
    id:number;
    title:string;
}

interface CategStore {
    categs: Categ[];
    addCateg: (categ: Omit<Categ, "id">)=>void;
    editCateg:(id:number, categ:Categ)=>void;
    deleteCateg:(id:number)=>void;
    getCateg:(id:number)=>Categ | undefined;
}


export const useCategStore = create(
    persist<CategStore>(
    (set,get) => ({
        categs:[],
        addCateg :(categ: Omit<Categ, "id">) =>
            set((state)=>{
                return {
                    categs:[
                        ...state.categs,
                        {
                            ...categ,
                            id:Date.now(),
                        },
                    ],
                };
            }),
        editCateg:(id: number, categ: Categ) =>
        set((state) => ({
          categs: state.categs.map((l) => (l.id === id ? categ : l)),
        })),
        deleteCateg:(id:number)=>
            set((state)=>({
                categs: state.categs.filter((ct)=> ct.id !== id),
            })),
         getCateg: (id: number) => get().categs.find((categ) => categ.id === id),
       
    }),
    {
      name: "categs-storage",
      storage: createJSONStorage(() => localStorage),
    }
))