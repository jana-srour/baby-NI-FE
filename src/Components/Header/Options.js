import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import ScrollDialog from './Dialog';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function Options() {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    const optionId = event.currentTarget.id;

    if (optionId === 'about-option') {
      setDialogOpen(true);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  
  const handleClose = () => {
    setAnchorEl(null);
    setDialogOpen(false);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={anchorEl  ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl  ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleClose} disableRipple>
          <LogoutIcon />
          Logout
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <ManageAccountsOutlinedIcon />
          User Settings
        </MenuItem> 
        <Divider sx={{ my: 0.5 }} />*/}
        <MenuItem onClick={handleClick} disableRipple id="about-option">
          <InfoOutlinedIcon />
          About
        </MenuItem>
      </StyledMenu>

      <ScrollDialog open={dialogOpen} onClose={handleClose} />

    </div>
  );
}