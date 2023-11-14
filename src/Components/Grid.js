import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import CustomizedTables from './Tables/Table';

// Prepare the Grid Styling
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// Headers for the data to be presented in the grid according to the choice
const aliasHeaders = ['Time', 'NeAlias', 'Input Power', 'Max RX Level', 'Deviation'];
const typeHeaders = ['Time', 'NeType', 'Input Power', 'Max RX Level', 'Deviation'];

export default function NestedGridColumns(props) {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: '20px' }}>
      <Grid container spacing={2} columns={24}>
        <Grid xs={24}>
          <Item>
              {props.Group === "NeAlias" && (
                <CustomizedTables headers={aliasHeaders} data={props.data} state={props.state} Group={props.Group}/>
              )}
              {props.Group === "NeType" && (
                <CustomizedTables headers={typeHeaders} data={props.data} state={props.state} Group={props.Group}/>
              )}
            
          </Item>
        </Grid>        
      </Grid>
    </Box>
  );
}
