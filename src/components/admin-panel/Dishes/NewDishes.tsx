import React, { useState, useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDishStore } from "@/hooks/dishStore";
import { useCategStore } from "@/hooks/categorieStore";

export const dishSchema = z.object({
  name: z.string().min(3, { message: "Name must have at least 3 letters." }),
  price: z.number().min(2, { message: "Price must be at least 2 digits." }),
  image: z.string().optional(),
  select_categs: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
    })
  ),
});

interface DishProps {
  initialData?: {
    id?: string;
    name: string;
    price: number;
    image: string;
    select_categs: { id: number; title: string }[];
  };
  onSubmit: (data: z.infer<typeof dishSchema>) => void;
}

export const NewDish = ({ initialData }: DishProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { categs } = useCategStore();

  const fetchDishes = useDishStore((state) => state.fetchDishes);
  const addDish = useDishStore((state) => state.addDish);
  const editDish = useDishStore((state) => state.editDish);
  const dishes = useDishStore((state) => state.dishes);

  const [selectedImage, setSelectedImage] = useState<string | null>(
    initialData?.image || null
  );

  useEffect(() => {
    fetchDishes();
    if (id) {
      const dishToEdit = dishes.find((dish) => dish.id === id);
      if (dishToEdit) {
        form.reset(dishToEdit);
        setSelectedImage(dishToEdit.image || null);
      }
    }
  }, [id, fetchDishes, dishes]);

  const categoryOptions = categs.map((categ) => ({
    value: categ.id,
    label: categ.title,
  }));

  const form = useForm<z.infer<typeof dishSchema>>({
    resolver: zodResolver(dishSchema),
    defaultValues: {
      name: initialData?.name || "",
      price: initialData?.price || 0,
      image: initialData?.image || "",
      select_categs: initialData?.select_categs || [],
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setSelectedImage(base64Image);
        form.setValue("image", base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDishSubmit = async (data: z.infer<typeof dishSchema>) => {
    const dishData = {
      ...data,
      id: id || Date.now().toString(),
      created_at: new Date().toISOString(),
      select_categs: data.select_categs.map((categ) => ({
        id: categ.id,
        name: categ.title,
      })),
    };
    
    if (id) {
      editDish(Number(id), { ...dishData, image: dishData.image || "" });
    } else {
      addDish({ ...dishData, image: dishData.image || "" });
    }

    toast({
      description: `Dish ${id ? "updated" : "added"} successfully!`,
    });
    navigate("/plats/all-plat");
  };

  return (
    <div>
      <Navbar title={id ? "Edit Dish" : "New Dish Form"} />
      <div className="flex justify-center bg-gray-100 p-2 rounded-lg shadow-xl text-cyan-900 text-center">
        <h1 className="text-2xl font-bold mt-3">
          {id ? "Edit Dish" : "Add a New Dish"}
        </h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleDishSubmit)}
          className="space-y-5 bg-grey p-4 rounded-lg shadow-md"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter dish name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter dish price"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="select_categs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <Controller
                  name="select_categs"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={categoryOptions}
                      placeholder="Select categories"
                      onChange={(selectedOptions) =>
                        field.onChange(
                          selectedOptions.map((option) => ({
                            id: option.value,
                            title: option.label,
                          }))
                        )
                      }
                      value={field.value.map((categ) => ({
                        value: categ.id,
                        label: categ.title,
                      }))}
                    />
                  )}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <label className="block font-medium text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Dish Preview"
                className="mt-4 h-32 w-32 object-cover"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-bold py-2 px-4 rounded hover:scale-105 transition"
          >
            {id ? "Update Dish" : "Add Dish"}
          </button>
        </form>
      </Form>
    </div>
  );
};
