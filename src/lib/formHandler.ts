import { z } from "zod";
import { userSchema } from "@/components/admin-panel/Users/NewUser";
import { useUserStore } from "@/hooks/userStore";
import { useCategStore } from "@/hooks/categorieStore";
import { catSchema } from "@/components/admin-panel/Categories/NewCat";
import { dishSchema } from "@/components/admin-panel/Dishes/NewDishes";
import { useDishStore } from "@/hooks/dishStore";


export const handleCategSubmit = (data: z.infer<typeof catSchema>)=>{
    const addCateg= useCategStore((state)=>state.addCateg);
    const catData= {
        ...data,
      
};
    addCateg(catData);
}


export const handleDishSubmit = (data: z.infer<typeof dishSchema>) => {
  const addDish = useDishStore((state) => state.addDish); // Use addDish here

  const dishData = {
    ...data,
    image: data.image || "", // Default image to an empty string if not provided
    created_at: new Date().toISOString().split("T")[0],
    select_categs: data.select_categs.map(({ title, id }) => ({
      id,
      name: title,
    })),
  };

  addDish(dishData);
};

export const handleUserSubmit=(data: z.infer<typeof userSchema>)=>{
  const addUser = useUserStore((state)=>state.addUser);
  const userData={
    ...data,
     image: data.image || "",
     tel: data.tel || "",
      name: data.name || "",
    surname: data.surname || "",
    email: data.email || "",
    password: data.password || "",
    status: data.status,
    role: data.role || "",
  };
  addUser(userData);
  
}