import React, { useState, useEffect} from 'react';
import LineDataset from './MultiLineChart';
import MenuItem from '@mui/material/MenuItem';


const stackStrategy = {
    stack: 'total',
    area: false,
    stackOffset: 'wiggle', //diverging
  };


  // Format Alias Data sets
const formatAliasData = (data, state) => {
    return data
      .filter((item) => item.neAlias.trim() !== '')
      .map((item) => ({
        time: item.time ? new Date(item.time) : null,
        neAlias: String(item.neAlias),
        rsL_Input_Power: item.rsL_Input_Power ? parseFloat(item.rsL_Input_Power) : 0,
        max_RX_Level: item.max_RX_Level ? parseFloat(item.max_RX_Level) : 0,
        rsL_Deviation: item.rsL_Deviation ? parseFloat(item.rsL_Deviation) : 0,
        state,
      }));
  };

  // Format Type Data sets
  const formatTypeData = (data, state) => {
    return data
      .filter((item) => item.neType.trim() !== '')
      .map((item) => ({
        time: item.time ? new Date(item.time) : null,
        neType: String(item.neType),
        rsL_Input_Power: item.rsL_Input_Power ? parseFloat(item.rsL_Input_Power) : 0,
        max_RX_Level: item.max_RX_Level ? parseFloat(item.max_RX_Level) : 0,
        rsL_Deviation: item.rsL_Deviation ? parseFloat(item.rsL_Deviation) : 0,
        state,
      }));
  };

const colors = {
    rsL_Input_Power: 'black',
    max_RX_Level: 'orange',
    rsL_Deviation: 'blue',
};

export default function DataRenderer(props) {

    let formattedData;
    let series, dataset;

    // Format the data recieved to be prepared for graph preview
    if(props.Group === "NeAlias"){
        formattedData = formatAliasData(props.data, props.state);
    }else if(props.Group === "NeType"){
        formattedData = formatTypeData(props.data, props.state);
    }

      // KPI Drop Content
      const kpiMenuItems = Object.keys(colors).map(kpi => (
        <MenuItem key={kpi} value={kpi}>
          {kpi}
        </MenuItem>
      ));
    
      // Set UseState for handling KPI Selection
      const [selectedKPIs, setSelectedKPIs] = React.useState(Object.keys(colors));
    
      const handleKPISelectChange = (event) => {
        setSelectedKPIs(event.target.value);
      };

    // Generate colors for each Ne Group KPI
    const generateColor = (neGroup, kpi) => {
        const combinedString = neGroup + kpi;
        let hash = 0;
    
        for (let i = 0; i < combinedString.length; i++) {
            hash = combinedString.charCodeAt(i) + ((hash << 5) - hash);
        }
    
        let color;
        do {
            hash = Math.floor(Math.abs(Math.sin(hash) * 16777215) % 16777215);
            color = '#' + hash.toString(16);
        } while (color === '#FFFFFF' || color === '#FEFEFE' || color === '#FFFFFF');
    
        return color;
    };
    

      // Prepare the dataset and series for chart visualization
      series = formattedData.reduce((acc, dataPoint) => {
        selectedKPIs.forEach(kpi => {
            acc.push({
                dataKey: `${kpi}_${dataPoint.neAlias || dataPoint.neType}`,
                label: `${dataPoint.neAlias || dataPoint.neType} - ${kpi}`,
                //color: colors[kpi] || 'lightgray',
                color: generateColor(dataPoint.neAlias || dataPoint.neType, kpi),
                showMark: true,
                ...stackStrategy,
                type: 'line',
                strokeWidth: 2,
                connectNulls: true,
                dot: false,
            });
        });
        
        return acc;
    }, []);
    
    dataset = formattedData.reduce((acc, dataPoint) => {
        let newDataPoint = { ...dataPoint }; // Create a copy to avoid modifying the original data
        selectedKPIs.forEach(kpi => {
            newDataPoint[`${kpi}_${dataPoint.neAlias || dataPoint.neType}`] = dataPoint[kpi];
        });
        acc.push(newDataPoint);
        return acc;
    }, []);
    
      const kpiValues = formattedData.reduce((acc, dataPoint) => {
        selectedKPIs.forEach(kpi => {
          acc.push(dataPoint[kpi]);
        });
        return acc;
      }, []);
    
      const minKpiValue = Math.min(...kpiValues);
      const maxKpiValue = Math.max(...kpiValues);

  return (
    <LineDataset 
        selectValue={selectedKPIs}
        selectOnChange={handleKPISelectChange}
        selectItems={kpiMenuItems}
        selectedKPIs={selectedKPIs}
        series={series}
        dataset={dataset}
        state={props.state}
    />
  );
}
