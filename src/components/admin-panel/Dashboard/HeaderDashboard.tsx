import React from 'react'
import { Users, SquareLibrary, NotebookTabs } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default function HeaderDashboard() {
  return (
    <div className="grid grid-cols-3  gap-1 w-full outline outline-gray-100">
      <Card className="hover:scale-105 hover:bg-slate-100   transition ease-in-out delay-120 bg-transparent outline outline-gray-100">
        <CardHeader>
          <CardTitle className="flex flex-row text-xl gap-2">
            {" "}
            <Users className="text-cyan-800 size-50" />
            Card Title
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>

      <Card className="hover:scale-105 hover:bg-slate-100   transition ease-in-out delay-120 bg-transparent outline outline-gray-100">
        <CardHeader>
          <CardTitle className="flex flex-row text-xl gap-2">
            {" "}
            <Users className="text-cyan-800 size-50" />
            Card Title
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>

      <Card className="hover:scale-105 hover:bg-slate-100   transition ease-in-out delay-120 bg-transparent outline outline-gray-100">
        <CardHeader>
          <CardTitle className="flex flex-row text-xl gap-2">
            {" "}
            <Users className="text-cyan-800 size-50" />
            Card Title
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
    </div>
  );
}
