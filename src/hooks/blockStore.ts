import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useLessonStore } from "./lessonStore";

interface Block {
    id:number;
    title:string;
    content:string;
    status:boolean;
    duration:string;
    select_lessons:{ id: number; name: string }[];
}

interface  BlockStore{
    blocks: Block[];
    addBlock: (block: Omit<Block, 'id'>) => void;
    editBlock: (id: number, block: Block) => void;
    deleteBlock: (id: number) => void;
}

export const useBlockStore = create(persist<BlockStore>(
    (set,get) => ({
        blocks: [],
        addBlock: (block: Omit<Block, 'id'>) => set((state) => {
            const lesStore = useLessonStore.getState();
             
            const LessonsWithNames=block.select_lessons.map(les =>({
                id:les.id,
                name:lesStore.getLesson(les.id)?.title || ''
            }));

            
            return { 
                blocks: [...state.blocks, {
                    ...block,
                    id: Date.now(),
                    select_lessons: LessonsWithNames,
                }]
            };
        }),
        editBlock: (id: number, block: Block) => set((state) => ({ 
            blocks: state.blocks.map(
                b => b.id === id ? block : b
            ) 
        })),
        deleteBlock: (id: number) => set((state) => ({ 
            blocks: state.blocks.filter(l => l.id !== id) 
        })),
   
    }),
    {
        name: "blocks",
        storage: createJSONStorage(() => localStorage),
    }
));