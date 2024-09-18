import {create} from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
// Define Slug type
type Slug = string;

// Define Tag type
type Tag = {
    id: number;
    name: string;
};



//Formation interface
interface Formation{
    id:number;
    name:string;
    
}