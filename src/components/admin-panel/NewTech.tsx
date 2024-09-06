import { Navbar } from "./navbar";
import {z} from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";



const formSchema= z.object({
    name:z.string().min(3, {
        message: "It must have at least 3 characters."
    }).max(40),
    description:z.string().min(10, {
        message: "It must have at least 10 characters."
    }).max(60),
})

interface FormulProps{
    id?:number;
    initialData?:{
        name:string;
        description:string;
    };
    onSubmit: (name:string, description:string)=>void;
}

export function Formul({initialData, onSubmit }: FormulProps) {
    
  const addTodo = useTodoStore((state) => state.addTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
    },
  });
 
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.name, values.description);
    form.reset();
  };

const NewTech = () => {
 return (
   <div>
     <Navbar title="New Technology Form" />
     <Form {...form}>
       <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
         <FormField
           control={form.control}
           name="name"
           render={({ field }) => (
             <FormItem>
               <FormLabel>Name</FormLabel>
               <FormControl>
                 <Input placeholder="Walk dog" {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
         <FormField
           control={form.control}
           name="description"
           render={({ field }) => (
             <FormItem>
               <FormLabel>Description</FormLabel>
               <FormControl>
                 <Input placeholder="Walk dog at park for 1 hour" {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
         <Button type="submit">Submit</Button>
       </form>
     </Form>
   </div>
 );
};

export default NewTech;
