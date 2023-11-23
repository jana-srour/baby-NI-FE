import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { Grid, Typography } from '@mui/material';

export default function DateFilter(props) {
  
  // Controls the states for the start and end dates pickers
  const [selectedStartDate, setSelectedStartDate] = React.useState(null);
  const [selectedEndDate, setSelectedEndDate] = React.useState(null);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleDateChange = (startDate, endDate) => {
    props.filterTableData(startDate, endDate);
  };

  React.useEffect(() => {
    handleDateChange(selectedStartDate, selectedEndDate);
  }, [selectedStartDate, selectedEndDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography style={{ color: 'black', fontWeight: 'bold' }}>Date:</Typography>
        </Grid>
        <Grid item>
          <MobileDatePicker
            value={selectedStartDate}
            onChange={handleStartDateChange}
            label="From"
            inputFormat="MM/DD/YYYY"
          />
        </Grid>
        <Grid item>
          <Typography style={{ color: 'black', fontWeight: 'bold' }}>to</Typography>
        </Grid>
        <Grid item>
          <MobileDatePicker
            value={selectedEndDate}
            onChange={handleEndDateChange}
            label="To"
            inputFormat="MM/DD/YYYY"
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
