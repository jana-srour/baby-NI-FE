import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';

// Customize the chart
const customize = {
  height: 700,
  legend: { hidden: false },
  margin: { top: 150 },
  stackingOrder: 'descending',
};

export default function LineDataset(props) {

      // Format the Time for the x-axis according to the choice hourly or daily
      const formatTime = (timestamp) => {
        if (!timestamp) {
          return '';
        }
    
        const date = new Date(timestamp);
        const options = {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
          hour: props.state === 'hourly' ? 'numeric' : undefined,
          minute: props.state === 'hourly' ? 'numeric' : undefined,
          hour12: props.state === 'hourly',
        };
    
        return date.toLocaleDateString('en-US', options);
      };


  return (
    <Paper elevation={3} style={{ padding: '16px', backgroundColor: '#fff', marginRight: '50px' }}>

          <Select
            multiple
            value={props.selectValue}
            onChange={props.selectOnChange}
            renderValue={(selected) => selected.join(', ')}
            style={{ marginBottom: '10px', marginLeft: '20px' }}
          >
            {props.selectItems}
          </Select>

          <LineChart
            xAxis={[
                {
                dataKey: 'time',
                valueFormatter: (v) => (v ? formatTime(v) : ''),
                label: 'Time',
                },
              ]}
              yAxis={[
                {
                //min: props.minKpiValue,
                //max: props.maxKpiValue,
                label: 'KPIs',
                },
            ]}
            series={props.series}
            dataset={props.dataset}
            {...customize}
          />

      </Paper>
    
  );
}