import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useUserStore } from "@/hooks/userStore";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const userSchema = z.object({
  name: z.string().min(3, { message: "Name must have at least 3 characters." }),
  surname: z
    .string()
    .min(3, { message: "Surname must have at least 3 characters." }),
  email: z
  .string()
  .email({ message: "Please enter a valid email address." }),
  image: z.string().optional(),
  password: z
    .string()
    .regex(passwordRegex, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    })
    .min(6, { message: "Password must be at least 8 characters long." })
    .max(64, { message: "Password must not exceed 64 characters." }),
  tel: z
    .string()
    .regex(/^\d+$/, {
      message: "Telephone number can only contain digits.",
    })
    .min(8, { message: "Telephone number must have at least 8 digits." })
    .max(9, { message: "Telephone number cannot exceed 9 digits." })
    .optional(),
  status: z.boolean(),
});

interface UserProps {
  initialData?: {
    id?: string;
    name: string;
    surname:string;
    email: string;
    password: string;
    tel: string;
    status: boolean;
    image: string;
  };
  onSubmit: (data: z.infer<typeof userSchema>) => void;
}


export const NewUser = ({ initialData, onSubmit }: UserProps) => {
  const [isActive, setIsActive] = useState(initialData?.status || false);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    initialData?.image || null
  );
  const { id } = useParams<{ id: string }>();

  const { toast } = useToast();
  const navigate = useNavigate();

  const addUser= useUserStore((state)=> state.addUser);
  const editUser = useUserStore((state)=> state.editUser);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: initialData?.name || "",
      surname: initialData?.surname || "",
      image: initialData?.image || "",
      status: initialData?.status || false,
      email: initialData?.email || "",
      password: initialData?.password || "",
      tel: initialData?.tel || "",
    },
  });

  useEffect(()=>{
    
    if(id){
    const userToEdit = useUserStore
        .getState()
        .users.find((user: { id: number }) => user.id === Number(id));

     if(userToEdit){
        form.reset({
            ...userToEdit,
        });
        setSelectedImage(userToEdit.image || null);
        setIsActive(userToEdit.status);
     }   
    }
   
  })

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if (file) {
       const reader = new FileReader();
       reader.onloadend = () => {
         const base64Image = reader.result as string;
         setSelectedImage(base64Image);
         localStorage.setItem("userImage", base64Image);
       };
       reader.readAsDataURL(file);
     }
   };


   const handleUserFormSubmit=(data: z.infer<typeof userSchema>) =>{
    const userData = {
        ...data,
        id: id ? parseInt(id) : Date.now(),
        image: selectedImage || "",
        tel: data.tel || "", // Ensure tel is always a string
    };

    if(id){
        editUser(parseInt(id),userData);
    }
    else{
        addUser(userData)
    }
     toast({
       description: `User ${id ? "updated" : "added"} successfully!`,
     });
     navigate("/users/all-users");
   };


  return (
    <div>
      <div className="pb-5">
        <Navbar title={id ? "Edit User" : "New User Form"} />
        <div className="flex justify-center bg-gray-100 p-2 rounded-lg shadow-xl  text-cyan-900 text-center ">
          <h1 className="text-2xl font-bold mt-3 text-center ">
            {id ? "Edit User" : "Add A New User"}
          </h1>
        </div>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUserFormSubmit)}
            className="space-y-5 bg-grey p-2 rounded-lg shadow-md "
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter User's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    Surname
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter surname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    Telephone N°
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter telephone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    E-mail
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
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
            {/* Display Selected Image */}
            {selectedImage && (
              <div className="mt-4">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-auto h-auto"
                />
              </div>
            )}
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
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-cyan-500 hover:to-red-500 ...text-white font-bold py-2 px-4 rounded ml-5 mt-3 mb-3 transition ease-in-out delay-120 hover:scale-105 ring-2 hover:ring-4"
            >
              {id ? "Update User" : "Add User"}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};
