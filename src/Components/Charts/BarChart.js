import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';


export default function BarAnimation(props) {

  const series = [
    {
      data: props.data.map(item => item.rsL_Input_Power),
      label: 'RSL Input Power',
      id: 'RSLInputPowerId',
    },
    {
      data: props.data.map(item => item.max_RX_Level),
      label: 'Max RX Level',
      id: 'MaxRXLevelId',
    },
  ];

  const xLabels = props.data.map(item => item.time);
  const test = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];

   // Extract distinct time values from props.data
   const distinctTimes = [...new Set(xLabels)];

  return (
    <BarChart
      width={500}
      height={300}
      series={series}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
  );
}
