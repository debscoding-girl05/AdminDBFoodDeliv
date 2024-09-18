import { Navbar } from "../navbar"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTechStore } from "@/hooks/techStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Define Zod schema for form validation
const Slug = z
  .string()
  .min(3, { message: "Slug must be at least 3 characters." })
  .max(60, { message: "Slug must not exceed 60 characters." })
  .regex(/^[a-z0-9-]+$/, {
    message: "Slug can only contain lowercase letters, numbers, and hyphens.",
  });

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must have at least 3 characters." })
    .max(40),
  slug: Slug,
  image: z.string().optional(),
  active: z.boolean().default(false),
  created_at: z.string().optional(),
});

// Define form props
interface FormulProps {
  initialData?: {
    id ?: string;
    name: string;
    slug: string;
    image: string;
    active: boolean;
    created_at: string;
  };
  onSubmit: (
    name: string,
    slug: string,
    image: string | null,
    active: boolean,
    created_at: string
  ) => void;
}

// NewTech component
export const NewTech = ({ initialData, onSubmit }: FormulProps) => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();

  const addTech = useTechStore((state) => state.addTech);
  const editTech = useTechStore((state) => state.editTech);

  const [isActive, setIsActive] = useState(initialData?.active || false);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    initialData?.image || null
  );

  // Initialize form with default values and validation schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
      image: "",
      active: false,
      created_at: new Date().toISOString(),
    },
  });

 
  useEffect(() => {
    if (id) {
      // Edit mode: Find and set the technology data
      const techToEdit = useTechStore.getState().techs.find((tech: { id: number }) => tech.id === Number(id));
      if (techToEdit) {
        setSelectedImage(techToEdit.image);
        setIsActive(techToEdit.active);
        form.reset(techToEdit);
      }
    }
  }, [id, form]);

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setSelectedImage(base64Image);
        localStorage.setItem("techImage", base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (id) {
      // Edit mode
      editTech(
        parseInt(id), // id
        values.name, // name
        selectedImage || "", // image
        values.slug, // slug
        values.active, // active
        values.created_at || "" // created_at (ensure it's not undefined)
      );
      
      toast({
        title: "Technology updated!",
        description: "The technology has been updated successfully.",
       
      });
       navigate("/techs/all-tech");
      
    } else {
      // Add new tech
      addTech(
        values.name,
        selectedImage || "",
        values.slug,
        values.active,
        values.created_at || ""
      );
      toast({
        title: "Technology added!",
        description: "The technology has been added successfully.",
       
      });
       navigate("/techs/all-tech");
     
    }
    form.reset();
   
  };

  return (
    <div>
      <Navbar title={id ? "Edit Technology" : "New Technology Form"} />
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold mt-3">
          {id ? "Edit Technology" : "Add A New Technology"}
        </h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 bg-grey p-4 rounded-lg shadow-md"
        >
          {/* Name field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-bold">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter technology name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Slug field */}
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-bold">Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Enter slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image field */}
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel className="text-gray-700 font-bold">
                  Image File
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Created At field */}
          <FormField
            control={form.control}
            name="created_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-bold">
                  Created At
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    value={
                      initialData
                        ? initialData.created_at
                        : new Date().toISOString()
                    }
                    readOnly
                    className="text-gray-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Active toggle (Switch) */}
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`text-gray-700 font-bold mr-3 ${
                    isActive ? "text-green-500" : "text-red-500"
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

          {/* Submit Button */}
          <Button
            className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 ..."
            type="submit"
          >
            {initialData ? "Update" : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
