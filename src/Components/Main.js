import * as React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider, styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import Options from './Header/Options';
import NestedGridColumns from './Grid/Grid';
import RowRadioButtonsGroup from './Filters/RadioButtons';
import DataRenderer from './Charts/DataRender';
import DateFilter from './Filters/DateFilter';

import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';


// Format and style the drawer
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const ContentContainer = styled('div')({
  marginLeft: drawerWidth,
  transition: 'margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
});

// Put a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#8B0000', // Replace with your desired color
    },
  },
});

// Style the header bar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

// Style the body container
const BodyContainer = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ open }) => ({
    marginLeft: open ? `${drawerWidth}px` : '100px',
    marginTop: '100px',
    transition: 'margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
    display: 'flex',
    flexDirection: 'column',
  })
);

const StyledListItem = styled(ListItem)(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.primary.main : 'inherit',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Style the filter container
const FilterContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  gap: '20px',
  alignItems: 'center',
  marginLeft: '5px',
  marginBottom: '20px',
  backgroundColor: '#f0f0f0',
  color: '#666',
  paddingLeft: '20px',
  width: '98%',
  height: '100px',
  borderRadius: '5px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
});

const RadioContainer = styled('div')({
  marginTop: '20px',
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'row',
  gap: '40px',
  marginRight: '-100px',
});

// Style the body container that includes the chart and the grid
const ChartContainer = styled('div')({
  marginTop: '50px',
  marginRight: '50px',
  marginLeft: '10px',
});

const GridContainer = styled('div')({
  marginTop: '50px',
  marginRight: '50px',
  marginLeft: '10px',
});

// Style the message box if no data present
const styleMessagePreview = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    marginRight: '20px',
    marginBottom: '20px',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
  },
  innerContainer: {
    textAlign: 'center',
  },
  title: {
    fontSize: '2em',
    color: '#333',
  },
  message: {
    fontSize: '1.2em',
    color: '#666',
    marginBottom: '20px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '10px',
  },
};

export default function Main(props) {
  //const theme = useTheme();
  const [open, setOpen] = useState(false);

  // Control the states of radio buttons
  const [selectedValue, setSelectedValue] = useState({
    group1: 'Hourly',
    group2: 'NeAlias',
  });

  // Control the state of the date picker
  const [selectedDateRange, setSelectedDateRange] = useState({ startDate: null, endDate: null });

  // Control the drawer selected item
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleRadioChange = (value, group) => {
    setSelectedValue((prevSelected) => ({
      ...prevSelected,
      [group]: value,
    }));
  };

  const filterTableDataByDate = (startDate, endDate) => {
    setSelectedDateRange({ startDate, endDate });
  };

  const handleListItemClick = (text) => {
    setSelectedItem(text);
  };
 

  return (
    <div>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
        </DrawerHeader>
        <Divider />
        <List>
          {['Dashboard'].map((text, index) => (
            <StyledListItem key={text} disablePadding selected={selectedItem === text} button onClick={() => handleListItemClick(text)}>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <DashboardIcon /> : <SupervisorAccountIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </StyledListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <ContentContainer>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" open={open}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Baby NI
              </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Options />
            </div>
          </Toolbar>
        </AppBar>
        </ThemeProvider>
      </ContentContainer>
      <BodyContainer open={open}>
        <FilterContainer>
          <DateFilter filterTableData={filterTableDataByDate} />
          <RadioContainer>
          <RowRadioButtonsGroup
            selectedValue={selectedValue.group1}
            onRadioChange={(value) => handleRadioChange(value, 'group1')}
            options={['Hourly', 'Daily']}
            labels={['Hourly', 'Daily']}
            title={'Interval Aggregation'}
          />
          <RowRadioButtonsGroup
            selectedValue={selectedValue.group2}
            onRadioChange={(value) => handleRadioChange(value, 'group2')}
            options={['NeAlias', 'NeType']}
            labels={['NeAlias', 'NeType']}
            title={'Grouping'}
          />
        </RadioContainer>
        </FilterContainer>
        
        {(!selectedDateRange.startDate || !selectedDateRange.endDate) ? (
          
          <div style={styleMessagePreview.container}>
            <div style={styleMessagePreview.innerContainer}>
              <h2 style={styleMessagePreview.title}>No Data Preview</h2>
              <p style={styleMessagePreview.message}>
              <DocumentScannerOutlinedIcon/> Unfortunately, there is no data available for the selected date range.
              </p>
            </div>
          </div>
        ) : (
          <React.Fragment>
            {selectedValue.group1 === 'Hourly' && selectedValue.group2 === 'NeAlias' && props.data && props.data.hourlyNeAliasdata && (
              <React.Fragment>
                <ChartContainer container>
                  {props.data.hourlyNeAliasdata.length > 0 ? (
                    <DataRenderer 
                      data={props.data.hourlyNeAliasdata.filter(item => {
                          const date = Date.parse(item.dateTime_Key);
                          return (
                            (!selectedDateRange.startDate || date >= Date.parse(selectedDateRange.startDate)) &&
                            (!selectedDateRange.endDate || date <= Date.parse(selectedDateRange.endDate))
                          );
                        })}
                      state={"hourly"}
                      Group={selectedValue.group2} />
                  ) : (
                    <div>Loading data...</div>
                  )}
                </ChartContainer>
                
                <GridContainer container>
                  <NestedGridColumns
                    data={props.data.hourlyNeAliasdata.filter(item => {
                      const date = Date.parse(item.dateTime_Key);
                      return (
                        (!selectedDateRange.startDate || date >= Date.parse(selectedDateRange.startDate)) &&
                        (!selectedDateRange.endDate || date <= Date.parse(selectedDateRange.endDate))
                      );
                    })}
                    state={'hourly'}
                    Group={selectedValue.group2}
                  />
                </GridContainer>
              </React.Fragment>
            )}

            {selectedValue.group1 === 'Daily' && selectedValue.group2 === 'NeAlias' && props.data && props.data.dailyNeAliasdata && (
              <React.Fragment>
                <ChartContainer container>
                  {props.data.dailyNeAliasdata.length > 0 ? (
                    <DataRenderer 
                    data={props.data.dailyNeAliasdata.filter(item => {
                      const date = Date.parse(item.dateTime_Key);
                      return (
                        (!selectedDateRange.startDate || date >= Date.parse(selectedDateRange.startDate)) &&
                        (!selectedDateRange.endDate || date <= Date.parse(selectedDateRange.endDate))
                      );
                    })} 
                      state={"daily"} 
                      Group={selectedValue.group2} />
                  ) : (
                    <div>Loading data...</div>
                  )}
                </ChartContainer>
                
                <GridContainer container>
                  <NestedGridColumns
                    data={props.data.dailyNeAliasdata.filter(item => {
                      const date = Date.parse(item.dateTime_Key);
                      return (
                        (!selectedDateRange.startDate || date >= Date.parse(selectedDateRange.startDate)) &&
                        (!selectedDateRange.endDate || date <= Date.parse(selectedDateRange.endDate))
                      );
                    })}
                    state={'daily'}
                    Group={selectedValue.group2}
                />
                </GridContainer>
              </React.Fragment>
            )}

            {selectedValue.group1 === 'Hourly' && selectedValue.group2 === 'NeType' && props.data && props.data.hourlyNeTypedata && (
              <React.Fragment>
                <ChartContainer container>
                  {props.data.hourlyNeTypedata.length > 0 ? (
                    <DataRenderer 
                      data={props.data.hourlyNeTypedata.filter(item => {
                        const date = Date.parse(item.dateTime_Key);
                        return (
                          (!selectedDateRange.startDate || date >= Date.parse(selectedDateRange.startDate)) &&
                          (!selectedDateRange.endDate || date <= Date.parse(selectedDateRange.endDate))
                        );
                      })} 
                      state={"hourly"} 
                      Group={selectedValue.group2} />
                  ) : (
                    <div>Loading data...</div>
                  )}
                </ChartContainer>
                
                <GridContainer container>
                  <NestedGridColumns
                    data={props.data.hourlyNeTypedata.filter(item => {
                      const date = Date.parse(item.dateTime_Key);
                      return (
                        (!selectedDateRange.startDate || date >= Date.parse(selectedDateRange.startDate)) &&
                        (!selectedDateRange.endDate || date <= Date.parse(selectedDateRange.endDate))
                      );
                    })}
                    state={'hourly'}
                    Group={selectedValue.group2}
                />
                </GridContainer>
              </React.Fragment>
            )}


            {selectedValue.group1 === 'Daily' && selectedValue.group2 === 'NeType' && props.data && props.data.dailyNeTypedata && (
              <React.Fragment>
                <ChartContainer container>
                  {props.data.dailyNeTypedata.length > 0 ? (
                    <DataRenderer 
                      data={props.data.dailyNeTypedata.filter(item => {
                        const date = Date.parse(item.dateTime_Key);
                        return (
                          (!selectedDateRange.startDate || date >= Date.parse(selectedDateRange.startDate)) &&
                          (!selectedDateRange.endDate || date <= Date.parse(selectedDateRange.endDate))
                        );
                      })} 
                      state={"daily"} 
                      Group={selectedValue.group2} />
                  ) : (
                    <div>Loading data...</div>
                  )}
                </ChartContainer>
                
                <GridContainer container>
                  <NestedGridColumns
                    data={props.data.dailyNeTypedata.filter(item => {
                      const date = Date.parse(item.dateTime_Key);
                      return (
                        (!selectedDateRange.startDate || date >= Date.parse(selectedDateRange.startDate)) &&
                        (!selectedDateRange.endDate || date <= Date.parse(selectedDateRange.endDate))
                      );
                    })}
                    state={'daily'}
                    Group={selectedValue.group2}
                />
                </GridContainer>
              </React.Fragment>
            )}
          </React.Fragment>
        )}

      </BodyContainer>
    </div>
  );
}

