import React from 'react';
import { PieChartComponent } from './Charts/pieChart';
import { Navbar } from '../navbar';
import { PieComponent2 } from './Charts/pieChart';
import HeaderDashboard from './HeaderDashboard';
import { BarChartComponent } from './Charts/pieChart';
import { AreaChartComponent } from './Charts/pieChart';

export default function MainDashboard() {
  return (
    <div>
      <div>
        <Navbar title="Dashboard" />
      </div>
      <div className="m-2 mb-5">
        <HeaderDashboard />
      </div>
      <div className="grid grid-cols-2 gap-1 m-2">
        {" "}
        <PieChartComponent />
        <PieComponent2 />
      </div>
      <div className="grid grid-cols-4 ">
        <div className="col-start-1 col-end-3">
          <BarChartComponent />
        </div>
        <div className='col-start-4 col-end-5'>
          <AreaChartComponent />
        </div>
      </div>
    </div>
  );
}
