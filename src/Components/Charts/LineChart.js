import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicArea(props) {

  const series = [
    {
      data: props.data.map(item => item.rsL_Deviation),
      label: 'RSL Deviation',
      id: 'RSLDeviationId',
      area: true,
    },
  ];

  const xLabels = props.data.map(item => item.time);

  const test = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];

  return (
    <LineChart
      xAxis={[
        {
          data: xLabels,
        }
      ]}
      series={series}
      width={500}
      height={300}
    />
  );
}