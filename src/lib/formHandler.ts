import { useTechStore } from "../hooks/techStore";
import { useTutoStore } from "../hooks/tutoStore";
import { z } from "zod";
import { formSchema } from "../components/admin-panel/Tutorials/NewTuto";
import { formationSchema } from "@/components/admin-panel/Formations/NewFormation";
import { useFormationStore } from "@/hooks/formationStore";
import { useLessonStore } from "@/hooks/lessonStore";
import { lessonSchema } from "@/components/admin-panel/Lessons/NewLesson";
import { blockSchema } from "@/components/admin-panel/Blocks/NewBlock";
import { useBlockStore } from "@/hooks/blockStore";

export const handleSubmit = (
  name: string,
  slug: string,
  image: string | null,
  active: boolean,
  created_At: string
) => {
  const addTech = useTechStore((state) => state.addTech);
  addTech(name, image || "", slug, active, created_At);
};

export const handleTutorialSubmit = (data: z.infer<typeof formSchema>) => {
  const addTutorial = useTutoStore((state) => state.addTutorial);
  const technology_id = Number(data.technologies[0]?.id) || 0;
  const adjustedData = {
    ...data,
    technology_id,
    meta_keywords: data.meta_keywords.map(({ id, text }) => ({
      id: Number(id),
      name: text,
    })),
    image: data.image || "", // Provide default empty string
    defaultTechnology: data.defaultTechnology || "", // Ensure defaultTechnology is a string
  };
  addTutorial(adjustedData);
};

export const handleFormationSubmit= (data: z.infer<typeof formationSchema>) => {
  const addFormation = useFormationStore((state) => state.addFormation);
  const technology_id = Number(data.technologies[0]?.id) || 0;
  const adjustedData = {
    ...data,
    technology_id,
    meta_keywords: data.meta_keywords.map(({ id, text }) => ({
      id: Number(id),
      name: text,
    })),
    image: data.image || "", // Provide default empty string
    defaultTechnology: data.defaultTechnology || "", // Ensure defaultTechnology is a string
  };
  addFormation(adjustedData);
};

export const handleLessonSubmit=(data: z.infer<typeof lessonSchema>)=>{
  const addLesson=useLessonStore((state)=> state.addLesson);
  const formData ={
    ...data,
     meta_keywords: data.meta_keywords.map(({ id, text }) => ({
      id: Number(id),
      name: text,
    })),
  };
  addLesson(formData);
};

export const handleBlockSubmit = (data: z.infer<typeof blockSchema>)=>{
    const addBlock= useBlockStore((state)=>state.addBlock);
    const blockData= {
        ...data,
      
};
    addBlock(blockData);
}