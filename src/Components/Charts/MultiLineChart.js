import * as React from 'react';
import { LineChart, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Line } from 'recharts'; // Import necessary components from recharts
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import './MultiLineChart.css';

// Customize the chart
const customize = {
  height: 700,
  //legend: { hidden: false },
  margin: { top: 30, left: 20, right: 10, bottom: 20 },
  stackingOrder: 'descending',
};

const CustomLegend = ({ payload }) => (
  <div className="custom-legend">
    {payload.map((entry, index) => (
      <div key={index} className="legend-item">
        <div className="legend-color-box" style={{ backgroundColor: entry.color }} />
        <p className="legend-label">{entry.value}</p>
      </div>
    ))}
  </div>
);

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

  const renderTooltip = (props) => {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload; // Assuming all points have the same timestamp
      const time = dataPoint.time;

      return (
        <div className="custom-tooltip">
        <p className="label">{`Time: ${formatTime(time)}`}</p>
        {payload.map((entry, index) => (
          <div key={index} className="tooltip-entry">
            <div className="tooltip-color-box" style={{ backgroundColor: entry.color }} />
            <p className="tooltip-label">{`${entry.dataKey}:`}</p>
            <p className="tooltip-info">{`${entry.value}`}</p>
          </div>
        ))}
      </div>
      );
    }

    return null;
  };

  // Sort the dataset based on the 'time' property
  const sortedDataset = props.dataset.slice().sort((a, b) => a.time - b.time);

  // Add a formattedTime property to each data point
  const datasetWithFormattedTime = sortedDataset.map((dataPoint) => ({
    ...dataPoint,
    formattedTime: formatTime(dataPoint.time),
  }));

  // Extract unique formatted timestamps for x-axis ticks
  const uniqueXTicks = [...new Set(datasetWithFormattedTime.map((dataPoint) => dataPoint.formattedTime))];

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

      <ResponsiveContainer width="100%" height={customize.height}>
        <LineChart
          data={datasetWithFormattedTime}
          margin={customize.margin}
        >
          <XAxis
            dataKey="formattedTime"
            type="category"
            ticks={uniqueXTicks}
            tickFormatter={(timestamp) => formatTime(timestamp)}
          />
          <YAxis label={{ value: 'KPIs', angle: -90, position: 'insideLeft' }} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={renderTooltip} />
          <Legend content={<CustomLegend />} />
          {props.series.map((entry, index) => (
            <Line
              key={index}
              type={entry.type}
              dataKey={entry.dataKey}
              stroke={entry.color}
              strokeWidth={entry.strokeWidth}
              connectNulls={entry.connectNulls}
              dot={entry.dot}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}
