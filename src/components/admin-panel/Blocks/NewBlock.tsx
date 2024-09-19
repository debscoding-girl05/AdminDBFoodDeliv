import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { Navbar } from "../navbar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TagInput, Tag } from "emblor";
import { Switch } from "../../ui/switch";
import { useFormationStore } from "@/hooks/formationStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useBlockStore } from "@/hooks/blockStore";
import { useLessonStore } from "@/hooks/lessonStore";

export const blockSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must have at least 3 characters." }),
  content: z
    .string()
    .min(5, { message: "Content must have at least 5 characters." }),
  duration: z
    .string()
    .min(2, { message: "duration must have at least 2 characters." }),
  status: z
  .boolean()
  .default(false),
  select_lessons: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});

interface BlockProps {
  initialData?: {
    id?: string;
    title: string;
    content: string;
    status: boolean;
    duration: string;
    select_lessons: { id: number; name: string }[];
  };

  onSubmit: (data: z.infer<typeof blockSchema>) => void;
}

export const NewBlock =({ initialData, onSubmit }:BlockProps) => {

      const [isActive, setIsActive] = useState(initialData?.status || false);

       const {lessons} = useLessonStore();
       const { id } = useParams<{ id: string }>();

       const { toast } = useToast();
       const navigate = useNavigate();

       const addBlock= useBlockStore((state)=> state.addBlock);
       const editBlock =useBlockStore((state)=> state.editBlock);

       const select_lessons = lessons.map((lesson) => ({
         value: lesson.id.toString(),
         label: lesson.title,
       }));

       const form = useForm<z.infer<typeof blockSchema>>({
         resolver: zodResolver(blockSchema),
         defaultValues: {
           title: initialData?.title || "",
           content: initialData?.content || "",
           duration: initialData?.duration || "",
           status: initialData?.status || false,
           select_lessons:initialData?.select_lessons || [],
         },
       });

       useEffect(() => {
         if (id) {
           const blockToEdit = useBlockStore
             .getState()
             .blocks.find((block: { id: number }) => block.id === Number(id));
           if (blockToEdit) {
             form.reset({
               ...blockToEdit,
               select_lessons: blockToEdit.select_lessons.map((block) => ({
                 id: block.id,
                 name: block.name,
               })),
             });
             setIsActive(blockToEdit.status);
           }
         }
       }, [id, form]);

       
   const handleSubmit = (data: z.infer<typeof blockSchema>) => {
     const blockData = {
       ...data,
       id: id ? parseInt(id) : Date.now(),
     };
     if (id) {
       editBlock(parseInt(id), blockData);
     } else {
       addBlock(blockData);
     }
     toast({
       description: `Block ${id ? "updated" : "added"} successfully!`,
     });
     navigate("/blocks/all-blocks");
   };
   return (
     <div>
       <div className="pb-5">
         <Navbar title={id ? "Edit Block" : "New Block Form"} />
         <div className="flex justify-center bg-gray-100 p-2 rounded-lg shadow-xl  text-cyan-900 text-center ">
           <h1 className="text-2xl font-bold mt-3 text-center ">
             {id ? "Edit Block" : "Add A New Block"}
           </h1>
         </div>
       </div>
       <div>
         <Form {...form}>
           <form
             onSubmit={form.handleSubmit(handleSubmit)}
             className="space-y-5 bg-grey p-2 rounded-lg shadow-md "
           >
             <div className="border-2 border-gray-300 rounded-lg p-2 m-2 pb-5 divide-y divide-blue-200">
               <h3 className="text-cyan-900 font-bold font-serif pt-1 mb-1 ">
                 Textual Aspect
               </h3>

               <div className="grid grid-cols-2 gap-4 pt-5">
                 <FormField
                   control={form.control}
                   name="title"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel className="text-gray-700 font-semibold">
                         Name of Block
                       </FormLabel>
                       <FormControl>
                         <Input placeholder="Enter lesson name" {...field} />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />

                 <FormField
                   control={form.control}
                   name="content"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel className="text-gray-700 font-semibold">
                         Content
                       </FormLabel>
                       <FormControl>
                         <textarea
                           cols={100}
                           rows={6}
                           placeholder="Enter Block content"
                           {...field}
                         />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
               </div>
             </div>
             <div className="border-2 border-gray-300 rounded-lg p-2 m-2 pb-5 divide-y divide-blue-200 ">
               <h3 className="text-cyan-900 font-bold font-serif  mb-2 ">
                 Status/Media
               </h3>
               <div>
                 <FormField
                   control={form.control}
                   name="duration"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel className="text-gray-700 font-semibold">
                         Duration
                       </FormLabel>
                       <FormControl>
                         <Input placeholder="Enter Block duration" {...field} />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
               </div>

               <div className="flex flex-row gap-3">
                 {/* Active toggle (Switch) */}
                 <FormField
                   control={form.control}
                   name="status"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel
                         className={`text-gray-700 font-light font-serif mr-3 text-sm ${
                           isActive ? "text-green-400" : "text-gray-500"
                         }`}
                       >
                         {isActive ? "Active" : "Not active"}
                       </FormLabel>
                       <FormControl>
                         <Switch
                           checked={field.value}
                           onCheckedChange={(checked) => {
                             field.onChange(checked);
                             setIsActive(checked); // Change label based on active state
                           }}
                         />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
               </div>
             </div>

             <div className="border-2 border-gray-300 rounded-lg p-2 m-2 pb-5 divide-y divide-blue-200">
               <h3 className="text-cyan-900 font-bold font-serif  mb-2  ">
                 Dependencies
               </h3>
               <div className="flex flex-col gap-3 pt-5 space-y-5">
                 <FormField
                   control={form.control}
                   name="select_lessons"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel className="text-gray-700 font-semibold">
                         Lessons
                       </FormLabel>
                       <Select
                         {...field}
                         options={select_lessons}
                         isMulti={true}
                         placeholder="Select Tutorials"
                         onChange={(options) =>
                           field.onChange(
                             options.map((option) => ({
                               id: Number(option.value),
                               name: option.label,
                             }))
                           )
                         }
                         value={field.value.map((les) => ({
                           value: les.id.toString(),
                           label: les.name,
                         }))}
                       />
                       <FormMessage />
                     </FormItem>
                   )}
                 />
               </div>
             </div>
             <button
               type="submit"
               className="bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-cyan-500 hover:to-red-500 ...text-white font-bold py-2 px-4 rounded ml-5 mt-3 mb-3 transition ease-in-out delay-120 hover:scale-105 ring-2 hover:ring-4"
             >
               {id ? "Update Block" : "Add Block"}
             </button>
           </form>
         </Form>
       </div>
     </div>
   );
};