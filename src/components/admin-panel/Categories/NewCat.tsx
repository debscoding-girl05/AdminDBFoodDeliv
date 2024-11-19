import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
import { Switch } from "../../ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useBlockStore } from "@/hooks/blockStore";

import { useCategStore } from "@/hooks/categorieStore";


export const catSchema = z.object({
  title: z
    .string()
    .min(3, { message: "le titredoit avoir au moins 3 lettres." }),
});

interface CatProps {
  initialData?: {
    id?: string;
    title: string;
  };

  onSubmit: (data: z.infer<typeof catSchema>) => void;
}

export const NewCat = ({ initialData, onSubmit }: CatProps) => {
  const { id } = useParams<{ id: string }>();

  const { toast } = useToast();
  const navigate = useNavigate();

  const addBlock = useCategStore((state) => state.addCateg);
  const editBlock = useCategStore((state) => state.editCateg);

  const form = useForm<z.infer<typeof catSchema>>({
    resolver: zodResolver(catSchema),
    defaultValues: {
      title: initialData?.title || "",
    },
  });

  useEffect(() => {
    if (id) {
      const blockToEdit = useCategStore
        .getState()
        .categs.find((categ: { id: number }) => categ.id === Number(id));
      if (blockToEdit) {
        form.reset({
          ...blockToEdit,
        });
      }
    }
  }, [id, form]);

  const handleSubmit = (data: z.infer<typeof catSchema>) => {
    const catData = {
      ...data,
      id: id ? parseInt(id) : Date.now(),
    };
    if (id) {
      editBlock(parseInt(id), catData);
    } else {
      addBlock(catData);
    }
    toast({
      description: `Categorie ${id ? "modifier" : "ajouter"} avec succès!`,
    });
    navigate("/categories/all-categories");
  };
  return (
    <div>
      <div className="pb-5">
        <Navbar title={id ? "Modifier Catégorie" : "Nouvelle Catégorie"} />
        <div className="flex justify-center bg-gray-100 p-2 rounded-lg shadow-xl  text-cyan-900 text-center ">
          <h1 className="text-2xl font-bold mt-3 text-center ">
            {id ? "Edit Categorie" : "Ajouter une Nouvelle Categorie"}
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

              <div
                className="flex flex-col
                gap-4 pt-5"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">
                        Nom de la Catégorie
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Entrez le nom" {...field} />
                      </FormControl>
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
              {id ? "Modifier Catégorie" : "Ajouter Catégorie"}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};
