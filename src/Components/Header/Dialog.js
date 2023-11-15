import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


export default function ScrollDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /* const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]); */

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    const { current: descriptionElement } = descriptionElementRef;
    if (descriptionElement !== null) {
      descriptionElement.focus();
    }
  }, []);

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" style={{ display: 'flex', alignItems: 'center' }}>
          <InfoOutlinedIcon style={{ marginRight: '8px' }} />
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            About
          </Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
              Baby-NI visualiser shows the data according to certain filters applied on the data to show them on charts and grids.
          </DialogContentText>
        </DialogContent>
        <Typography variant="h6" style={{ fontWeight: 'bold', marginLeft: '25px', fontSize: '13px', marginTop: '10px'}}>
            Product Version: 2.0.0.1
          </Typography>
        <DialogActions>
          <Button onClick={props.onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}