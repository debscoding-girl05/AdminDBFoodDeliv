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
import { useTutoStore } from "@/hooks/tutoStore";
import { useLessonStore } from "@/hooks/lessonStore";
import EditorComp from "../EditorComp/EditorComp";

const Slug = z
  .string()
  .min(3, { message: "Slug must be at least 3 characters." })
  .max(60, { message: "Slug must not exceed 60 characters." })
  .regex(/^[a-z0-9-]+$/, {
    message: "Slug can only contain lowercase letters, numbers, and hyphens.",
  });

  export const lessonSchema = z.object({
    title: z
      .string()
      .min(3, { message: "Title must have at least 3 characters." }),
    slug: Slug,
    content: z
      .string()
      .min(5, { message: "Content must have at least 5 characters." }),
    resume: z
      .string()
      .min(5, { message: "resume must have at least 5 characters." }),
    meta_title: z
      .string()
      .min(5, { message: "meta_title must have at least 5 characters." }),
    meta_description: z
      .string()
      .min(5, { message: "meta_description must have at least 5 characters." }),
    meta_keywords: z.array(z.object({ id: z.string(), text: z.string() })),
    duration: z
      .string()
      .min(2, { message: "duration must have at least 2 characters." }),
    level: z.string().min(1),
    status: z.boolean().default(false),
    select_formations: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    ),
    select_tutorials: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    ),
  });

  interface LessonProps {
    initialData?: {
      id?: string;
      title: string;
      slug: string;
      content: string;
      resume: string;
      meta_title: string;
      meta_description: string;
      meta_keywords: Tag[];
      level: string;
      duration: string;
      status: boolean;
      select_formations: { id: number; name: string }[];
      select_tutorials: { id: number; name: string }[];
    };
    onSubmit: (data: z.infer<typeof lessonSchema>) => void;
  }
  
  export const NewLesson = ({ initialData, onSubmit }: LessonProps) => {
  const [tags, setTags] = React.useState<Tag[]>(
    initialData?.meta_keywords || []
  );
  const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(
    null
  );
   const [isActive, setIsActive] = useState(initialData?.status || false);

   const {formations} = useFormationStore();
   const {tutorials} = useTutoStore();
   const { id } = useParams<{ id: string }>();

   const { toast } = useToast();
   const navigate = useNavigate();

   const addLesson = useLessonStore((state)=>state.addLesson);
   const editLesson = useLessonStore((state) => state.editLesson);

   const select_tutorials= tutorials.map((tuto)=>({
    value:tuto.id.toString(),
    label:tuto.title,
   }));
   
   const select_formations = formations.map((formt) => ({
     value: formt.id.toString(),
     label: formt.name,
   }));

   const levelOptions = [
     { value: "beginner", label: "Beginner" },
     { value: "intermediary", label: "Intermediary" },
     { value: "advanced", label: "Advanced" },
     { value: "expert", label: "Expert" },
   ];

   const form = useForm<z.infer<typeof lessonSchema>>({
     resolver: zodResolver(lessonSchema),
     defaultValues: {
       title: initialData?.title || "",
       slug: initialData?.slug || "",
       content: initialData?.content || "",
       resume: initialData?.resume || "",
       meta_title: initialData?.meta_title || "",
       meta_description: initialData?.meta_description || "",
       meta_keywords: initialData?.meta_keywords || [],
       level: initialData?.level || "beginner",
       duration: initialData?.duration || "",
       status: initialData?.status || false,
       select_formations:initialData?.select_formations || [],
       select_tutorials:initialData?.select_tutorials || [],
     },
   });

   useEffect(()=>{
      if(id){
        const lessonToEdit= useLessonStore
        .getState()
        .lessons.find((les: {id: number})=> les.id === Number(id));
    if(lessonToEdit){
        form.reset({
          ...lessonToEdit,
          meta_keywords: lessonToEdit.meta_keywords.map((keyword) => ({
            id: keyword.id.toString(),
            text: keyword.name,
          })),
          select_formations: lessonToEdit.select_formations.map((formt) => ({
            id: formt.id,
            name: formt.name,
          })),
          select_tutorials: lessonToEdit.select_tutorials.map((tuto) => ({
            id: tuto.id,
            name: tuto.name,
          })),
        });
         setTags(
           lessonToEdit.meta_keywords.map((keyword) => ({
             id: keyword.id.toString(),
             text: keyword.name,
           }))
         );
         setIsActive(lessonToEdit.status);
    }
      }
   },[id, form]);

   const handleSubmit = (data: z.infer<typeof lessonSchema>) =>{
        const lessonData = {
          ...data,
          id: id ? parseInt(id) : Date.now(),
          meta_keywords: data.meta_keywords.map((keyword) => ({
            id: parseInt(keyword.id),
            name: keyword.text,
          })),
        };
        if(id){
            editLesson(parseInt(id), lessonData);
        } else{
            addLesson(lessonData);

        }
        toast({
          description: `Lesson ${id ? "updated" : "added"} successfully!`,
        });
        navigate("/lessons/all-lessons"); 

   };

    return (
      <div>
        <div className="pb-5">
          <Navbar title={id ? "Edit Lesson" : "New Lesson Form"} />
          <div className="flex justify-center bg-gray-100 p-2 rounded-lg shadow-xl  text-cyan-900 text-center ">
            <h1 className="text-2xl font-bold mt-3 text-center ">
              {id ? "Edit Lesson" : "Add A New Lesson"}
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
                          Name of Lesson
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
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          Slug
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter lesson slug" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="meta_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          Meta_title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter lesson meta_title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="meta_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          Meta_description
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter lesson meta_description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Add the level select */}
                  <FormField
                    control={form.control}
                    name="level"
                    render={(
                      { field } // Added render prop
                    ) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          Level
                        </FormLabel>
                        <FormControl>
                          <Select
                            options={levelOptions}
                            defaultValue={levelOptions.find(
                              (option) => option.value === field.value // Use field.value instead of form.getValues
                            )}
                            onChange={(selectedOption) =>
                              field.onChange(
                                selectedOption?.value || "beginner"
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="meta_keywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          Meta Keywords
                        </FormLabel>
                        <FormControl>
                          <TagInput
                            {...field}
                            placeholder="Enter a keyword"
                            tags={tags}
                            setTags={(newTags) => {
                              setTags(newTags);
                              form.setValue(
                                "meta_keywords",
                                (newTags as Tag[]).map((tag: Tag) => ({
                                  id: tag.id,
                                  text: tag.text,
                                }))
                              );
                            }}
                            activeTagIndex={activeTagIndex}
                            setActiveTagIndex={setActiveTagIndex}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Content
                    </FormLabel>
                    <FormControl>
                      <EditorComp name="content" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Resume
                    </FormLabel>
                    <FormControl>
                      <EditorComp name="resume" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
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
                          <Input
                            placeholder="Enter lesson duration"
                            {...field}
                          />
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
                    name="select_formations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          Formations
                        </FormLabel>
                        <Select
                          {...field}
                          options={select_formations}
                          isMulti={true}
                          placeholder="Select Formations"
                          onChange={(options) =>
                            field.onChange(
                              options.map((option) => ({
                                id: Number(option.value),
                                name: option.label,
                              }))
                            )
                          }
                          value={field.value.map((formt) => ({
                            value: formt.id.toString(),
                            label: formt.name,
                          }))}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="select_tutorials"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          Tutorials
                        </FormLabel>
                        <Select
                          {...field}
                          options={select_tutorials}
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
                          value={field.value.map((tuto) => ({
                            value: tuto.id.toString(),
                            label: tuto.name,
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
                {id ? "Update Lesson" : "Add Lesson"}
              </button>
            </form>
          </Form>
        </div>
      </div>
    );
  };
  