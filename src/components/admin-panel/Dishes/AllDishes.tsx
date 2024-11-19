import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDishStore } from "@/hooks/dishStore";
import { Navbar } from "../navbar";

const AllDishes: React.FC = () => {
  const { dishes } = useDishStore();

  return (
    <div>
      <Navbar title="Tous les plats" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {dishes.map((dish) => (
          <Card
            key={dish.id}
            className="shadow-md hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <CardTitle className="text-lg font-bold">{dish.name}</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {dish.select_categs.map((categ) => categ.name).join(", ")}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-48 flex items-center justify-center bg-gray-100 rounded-md">
              <img
                src={dish.image}
                alt={`${dish.name} image`}
                className="max-h-full max-w-full object-cover rounded-md"
              />
            </CardContent>
            <CardFooter>
              <p className="text-md font-semibold text-green-600">
                Prix: {dish.price} FCFA
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllDishes;
