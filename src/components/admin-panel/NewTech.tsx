import { Navbar } from "./navbar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // Import Switch for active toggle
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
import { useState } from "react";

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
    .min(3, {
      message: "It must have at least 3 characters.",
    })
    .max(40),
  slug: Slug,
 
  image: z
    .string()
    .url({ message: "Image must be a valid URL." })
    .optional(),
  active: z.boolean().default(false),
  created_at: z.string().optional(),
});

// Define form props
interface FormulProps {
  initialData?: {
    name: string;
    slug: string;
    image: string;
    active: boolean;
  };
  onSubmit: (
    name: string,
    slug: string,
    image: string | null,
    active: boolean
  ) => void;
}

// NewTech component
export const NewTech = ({ initialData, onSubmit }: FormulProps) => {
  const addTech = useTechStore((state) => state.addTech);
   const { setImage } = useTechStore();
  const [isActive, setIsActive] = useState(initialData?.active || false);
  const [selectedImage, setSelectedImage] = useState<string | null>(initialData?.image || null);

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

  //Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setSelectedImage(base64Image);
        setImage(Date.now(), base64Image);
        localStorage.setItem('techImage', base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(
      values.name,
      values.slug,
     selectedImage,
      values.active
    );
    form.reset();
  };

  

  return (
    <div>
      <Navbar title="New Technology Form" />
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold mt-3">New Technology</h1>
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

          {/* Image URL field */}
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
                    value={new Date().toISOString()} // Default value if not set
                    readOnly
                    className=" text-gray-500"
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
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
