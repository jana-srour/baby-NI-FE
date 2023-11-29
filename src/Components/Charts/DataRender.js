import React, { useState, useEffect} from 'react';
import LineDataset from './MultiLineChart';
import MenuItem from '@mui/material/MenuItem';


const stackStrategy = {
    stack: 'total',
    area: false,
    stackOffset: 'wiggle', //diverging
  };

  const formatAliasData = (data, state) => {
    const groupedData = data.filter((item) => item.neAlias.trim() !== '').reduce((acc, item) => {
      const time = item.dateTime_Key ? new Date(item.dateTime_Key) : null;
      const neAlias = String(item.neAlias);
      const rsL_Input_Power = item.rsL_Input_Power ? parseFloat(item.rsL_Input_Power) : 0;
      const max_RX_Level = item.max_RX_Level ? parseFloat(item.max_RX_Level) : 0;
      const rsL_Deviation = item.rsL_Deviation ? parseFloat(item.rsL_Deviation) : 0;
  
      if (!acc[neAlias]) {
        acc[neAlias] = [];
      }
  
      acc[neAlias].push({
        time,
        rsL_Input_Power,
        max_RX_Level,
        rsL_Deviation,
        state,
      });
  
      return acc;
    }, {});
  
    return Object.entries(groupedData).map(([neAlias, values]) => ({
      neAlias,
      values,
    }));
  };
  
  const formatTypeData = (data, state) => {
    const groupedData = data.filter((item) => item.neType.trim() !== '').reduce((acc, item) => {
      const time = item.dateTime_Key ? new Date(item.dateTime_Key) : null;
      const neType = String(item.neType);
      const rsL_Input_Power = item.rsL_Input_Power ? parseFloat(item.rsL_Input_Power) : 0;
      const max_RX_Level = item.max_RX_Level ? parseFloat(item.max_RX_Level) : 0;
      const rsL_Deviation = item.rsL_Deviation ? parseFloat(item.rsL_Deviation) : 0;
  
      if (!acc[neType]) {
        acc[neType] = [];
      }
  
      acc[neType].push({
        time,
        rsL_Input_Power,
        max_RX_Level,
        rsL_Deviation,
        state,
      });
  
      return acc;
    }, {});
  
    return Object.entries(groupedData).map(([neType, values]) => ({
      neType,
      values,
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
    series = formattedData.reduce((acc, entry) => {
      const { neAlias, neType, values } = entry;
      const neIdentifier = neAlias || neType;

      selectedKPIs.forEach(kpi => {
        acc.push({
          dataKey: `${kpi}_${neIdentifier}`,
          label: `${neIdentifier} - ${kpi}`,
          color: generateColor(neIdentifier, kpi),
          showMark: true,
          ...stackStrategy,
          type: 'line',
          strokeWidth: 2,
          connectNulls: true,
          dot: true,
        });
      });

      return acc;
    }, []);

    // Prepare the dataset and series for chart visualization
    dataset = formattedData.reduce((acc, entry) => {
      const { neAlias, neType, values } = entry;
      const neIdentifier = neAlias || neType;
  
      values.forEach((dataPoint, index) => {
        const existingDataPoint = acc.find((item) => item.time.getTime() === dataPoint.time.getTime());
  
        if (existingDataPoint) {
          // If a data point with the same date exists, update its values
          selectedKPIs.forEach(kpi => {
            existingDataPoint[`${kpi}_${neIdentifier}`] = dataPoint[kpi];
          });
        } else {
          // If not, create a new data point
          const newDataPoint = {
            time: dataPoint.time,
          };
  
          selectedKPIs.forEach(kpi => {
            newDataPoint[`${kpi}_${neIdentifier}`] = dataPoint[kpi];
          });
  
          acc.push(newDataPoint);
        }
      });
  
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
