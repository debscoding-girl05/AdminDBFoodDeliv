import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useFormationStore } from "./formationStore";
import { useTutoStore } from "./tutoStore";

// Define Slug type
type Slug = string;

// Define Tag type
type Tag = {
    id: number;
    name: string;
};

interface Lesson {
    id:number;
    title:string;
    slug:Slug;
    duration:string;
    resume:string;
    content:string;
    level:string;
    status:boolean;
    meta_title: string;
    meta_description: string;
    meta_keywords:  Tag[];
    select_formations: { id: number; name: string }[];
    select_tutorials:{ id: number; name: string }[];
}

interface LessonStore {
    lessons: Lesson[];
    addLesson: (lesson: Omit<Lesson, 'id'>) => void;
    editLesson: (id: number, lesson: Lesson) => void;
    deleteLesson: (id: number) => void;
   
    getLesson:(id:number)=>Lesson  | undefined;
}

export const useLessonStore = create(persist<LessonStore>(
    (set,get) => ({
        lessons: [],
        addLesson: (lesson: Omit<Lesson, 'id'>) => set((state) => {
            const formtStore = useFormationStore.getState();
            const tutStore = useTutoStore.getState();
             
            const TutorialWithNames=lesson.select_tutorials.map(tuto =>({
                id:tuto.id,
                name:tutStore.getTutorial(tuto.id)?.title || ''
            }));

            const FormationsWithNames = lesson.select_formations.map(formt => ({
                id: formt.id,
                name: formtStore.getFormation(formt.id)?.name || ''
            }));
            return { 
                lessons: [...state.lessons, {
                    ...lesson,
                    id: Date.now(),
                    select_formations: FormationsWithNames,
                    select_tutorials:TutorialWithNames,
                }]
            };
        }),
        editLesson: (id: number, lesson: Lesson) => set((state) => ({ 
            lessons: state.lessons.map(
                l => l.id === id ? lesson : l
            ) 
        })),
        deleteLesson: (id: number) => set((state) => ({ 
            lessons: state.lessons.filter(l => l.id !== id) 
        })),
      getLesson: (id:number)=>get().lessons.find((les)=> les.id === id),
    }),
    {
        name: "lessons",
        storage: createJSONStorage(() => localStorage),
    }
));