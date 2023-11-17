import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 17,
    padding: 12,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 15,
    width: '10%',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables(props) {

  // Controls the paging for the table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Format the Time for the table time column according to the choice hourly or daily
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.headers.map((item, index) => (
              <StyledTableCell key={index}  align="center">{item}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(props.Group === 'NeAlias' || props.Group === 'NeType')
            ? props.data
                .filter((item) => {
                  return (
                    item &&
                    ((props.Group === 'NeAlias' && item.neAlias) ||
                      (props.Group === 'NeType' && item.neType))
                  );
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row" align="center">
                      {formatTime(item.dateTime_Key)}
                    </StyledTableCell>
                    {props.Group === 'NeAlias' && <StyledTableCell align="center">{item.neAlias}</StyledTableCell>}
                    {props.Group === 'NeType' && <StyledTableCell align="center">{item.neType}</StyledTableCell>}
                    <StyledTableCell align="center">{item.rsL_Input_Power}</StyledTableCell>
                    <StyledTableCell align="center">{item.max_RX_Level}</StyledTableCell>
                    <StyledTableCell align="center">{item.rsL_Deviation}</StyledTableCell>
                  </StyledTableRow>
                ))
            : null}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}