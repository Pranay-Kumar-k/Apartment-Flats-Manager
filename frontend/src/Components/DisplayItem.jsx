import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function DisplayItem() {
  const classes = useStyles();

  const [data, setData] = useState([])
    const allData = useSelector( (state) => state.items.items )

    const params = useParams()
    const {id} = params
    var rows

    useEffect(() => {
        const findData = allData?.find( (item) => (item.id).toString() === id.toString() )    
        setData([...findData.residents.A])  
        console.log(data)
    }, [])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Resident Name</TableCell>
            <TableCell align="right">Flat Number</TableCell>
            <TableCell align="right">gender</TableCell>
            <TableCell align="right">Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="right">{row.flat_number}</TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}
