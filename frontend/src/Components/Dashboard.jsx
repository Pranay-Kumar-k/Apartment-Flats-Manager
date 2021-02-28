import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';
import { Pagination } from "@material-ui/lab";
import ItemPage from './ItemPage';
import { getItemsData } from '../Redux/dataRedux/actionCreator';
import { useEffect } from 'react';


const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    search:{
      width:"50%",
      margin:theme.spacing(2)
    },
    pagination: {
      "& > * + *": {
        marginTop: theme.spacing(2)
      },
      alignItems: "center",
      marginLeft: "40%"
    },
    gridItems: {
      display: "grid",
      gridTemplateColumns: "auto auto"
    },
    select: {
      margin: theme.spacing(1),
      minWidth: 120
    },
  }));

function Dashboard() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const Data = useSelector(state => state.items.items)
    const {isLoading,isError} = useSelector(state => state.items)
  
    const [page,setPage] = useState(1)
    const [query,setQuery] = useState("")
    const [sort,setSort] = useState("")
    const [filter,setFilter] = useState("")
    const limit = 10

    // console.log(Data.current)
    const handleSearch = (e) => {
      e.preventDefault()
      dispatch(getItemsData({query}))
    }

    useEffect(() => {
      dispatch(getItemsData({sort,filter,query,page,limit}))
    }, [sort,filter,query])
 
    return (
        <div className={classes.root}>
              <TextField id="outlined-basic" 
              label="Search by block name" 
              variant="outlined" fullWidth 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              className={classes.search}
              />
              <Button variant="contained" color="secondary" onClick={handleSearch}>
                        Search
              </Button>
              {isLoading && (
            <div>
              {" "}
              <CircularProgress />{" "}
            </div>
          )}
          {isError && <Typography>{`No results found`}</Typography>}
          <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className={classes.select}
            >
              <MenuItem value={""}>--</MenuItem>
              <MenuItem value={"asc"}>asc</MenuItem>
              <MenuItem value={"desc"}>desc</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={classes.select}
            >
              <MenuItem value={""}>--</MenuItem>
              <MenuItem value={"owner"}>owner</MenuItem>
              <MenuItem value={"tenant"}>tenant</MenuItem>
            </Select>
          </FormControl>
          </div>
             <Grid xs={12} className={classes.gridItems} container>
              {Data ?.filter(
                        (_, index) =>  index >= (page - 1) * limit && index < (page * limit)
                    )
                    .map((item) => {
                  return (
                <div><ItemPage item={item} /></div>
                  );
                    })}
              </Grid>
              {page && (
                <div className={classes.pagination}>
                  <Pagination
                    count={Math.floor(Data.length/limit)}
                    page={page}
                    onChange={(e) => setPage(Number(page) + 1)}
                  />
                </div>
                )}
        </div>
    )
}

export default Dashboard

