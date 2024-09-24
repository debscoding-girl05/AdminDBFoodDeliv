import { HoriBarchartComponent, PieChartComponent } from './Charts/pieChart';
import { Navbar } from '../navbar';
import { PieComponent2 } from './Charts/pieChart';
import HeaderDashboard from './HeaderDashboard';
import { BarChartComponent } from './Charts/pieChart';
import { LineChartComponent } from './Charts/pieChart';
import { AreaChartComponent } from './Charts/pieChart';

export default function MainDashboard() {
  return (
    <div>
      <div>
        <Navbar title="Dashboard" />
      </div>
      <div className="m-2 mb-8 ">
        <div className="flex items-center my-4 ml-3">
          <span className="text-lg font-extralight">Statistiques de Base</span>
          <div className="border-t border-gray-300 flex-grow ml-2"></div>
        </div>
        <HeaderDashboard />
      </div>
      <div className="mb-8 m-2">
        <div className="flex items-center my-4 ml-3">
          <span className="text-lg font-extralight">Vue Globale</span>
          <div className="border-t border-gray-300 flex-grow ml-2"></div>
        </div>
        <div className="grid grid-cols-2 gap-1 ">
          <AreaChartComponent />
          <LineChartComponent />
        </div>
      </div>
      <div className="mb-8 m-2">
        <div className="flex items-center my-4 ml-3">
          <span className="text-lg font-extralight">Cours et Popularité</span>
          <div className="border-t border-gray-300 flex-grow ml-2"></div>
        </div>
        <div className="grid grid-cols-2 gap-1 ">
          <PieChartComponent />
          <PieComponent2 />
        </div>
      </div>
      <div className='m-2 mb-3'>
        <div className="flex items-center my-4 ml-3">
          <span className="text-lg font-extralight">Tutoriels et Popularité</span>
          <div className="border-t border-gray-300 flex-grow ml-2"></div>
        </div>
        <div className='grid grid-cols-2 gap-1'>
            <BarChartComponent/>
            <HoriBarchartComponent/>
        </div>
      </div>
    </div>
  );
}
