import { Navbar } from '../navbar';
import {PiechartCoursSuivis} from './Charts/PiechartCoursSuivis';
import HeaderDashboard from './HeaderDashboard';
import LinechartUtil from './Charts/LinechartUtil';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import chartData from "@/data/chartData.json"
import AreachartInscrip from './Charts/AreachartInscrip';
import { useState } from 'react';
import { PiechartCoursLikes } from './Charts/PiechartCoursLikes';
import BarchartTutoLike from './Charts/BarchartTutoLike';
import HoriBarchartTutoCom from './Charts/HoriBarchartTutoCom';


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function MainDashboard() {
    const [selectedMonth, setSelectedMonth] = useState(months[0]);
  return (
    <div>
      <div>
        <Navbar title="Dashboard" />
      </div>
      <div>
        {/* Global Month Filter */}

        <div className="m-2 mb-8 ">
          <div className="flex items-center my-4 ml-3">
            <span className="text-lg font-extralight">
              Statistiques de Base
            </span>
            <div className="border-t border-gray-300 flex-grow ml-2"></div>
          </div>
          <HeaderDashboard />
        </div>
        <div className="flex justify-end mb-4">
          <h2 className="mr-5 mt-2 font-semibold">Filtre :</h2>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-8 m-2">
          <div className="flex items-center my-4 ml-3">
            <span className="text-lg font-extralight">Vue Globale</span>
            <div className="border-t border-gray-300 flex-grow ml-2"></div>
          </div>
          <div className="grid grid-cols-2 gap-1 ">
            <AreachartInscrip data={chartData.inscriptionConsultationsData} />
            <LinechartUtil data={chartData.usersData} />
          </div>
        </div>
        <div className="mb-8 m-2">
          <div className="flex items-center my-4 ml-3">
            <span className="text-lg font-extralight">Cours et Popularité</span>
            <div className="border-t border-gray-300 flex-grow ml-2"></div>
          </div>
          <div className="grid grid-cols-2 gap-1 ">
            <PiechartCoursSuivis/>
            <PiechartCoursLikes />
          </div>
        </div>
        <div className="m-2 mb-3">
          <div className="flex items-center my-4 ml-3">
            <span className="text-lg font-extralight">
              Tutoriels et Popularité
            </span>
            <div className="border-t border-gray-300 flex-grow ml-2"></div>
          </div>
          <div className="grid grid-cols-2 gap-1 h-auto">
            <BarchartTutoLike/>
            <HoriBarchartTutoCom />
          </div>
        </div>
      </div>
    </div>
  );
}
