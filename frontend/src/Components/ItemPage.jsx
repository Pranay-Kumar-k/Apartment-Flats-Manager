import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Card } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root1: {
      width:"100%",
    display: "grid",
    margin: "2ch"
  },

  root: {
    display: "flex",
    width:"600px",
    height:"500px",
    flexDirection: "column",
    margin:"1%",
    textAlign:"start",
    cursor:"pointer"
  },
  media: {
    width: "100%",
    height:"300px"
  },
  title:{
      textAlign:"center",
      fontWeight:"bold",
  }
}));



function ItemPage(item) {
  const classes = useStyles();
  const history = useHistory()
console.log(item)
  const gotoProduct = (id) => {
    const location = {
      pathName: `/view-product/${id}`
    }
    history.push(location.pathName)
    console.log(location)
  }



  return (
    <Grid container className={classes.root1} md={6} lg={4} xs={12}>
      <Grid item  >
        <Grid container justify="center" >
          <Card className={classes.root} onClick={() => gotoProduct(item.item.id)}>
            <CardHeader title={item.item.flat_name} className={classes.title}/>
            <CardMedia
              className={classes.media}
              image="https://media-cdn.tripadvisor.com/media/vr-splice-j/02/1b/fc/24.jpg"
            />
            <CardContent>
              {/* <Typography variant="h5" color="initial" component="h3">
                {item.item.flat_name}
              </Typography> */}
              <Typography variant="h5" color="initial" component="h1">
                Type : {item.item.flat_type}
              </Typography>
              <Typography variant="div" color="initial" component="h3">
                Total Residents : {item.item.residents.A.length+item.item.residents.B.length+item.item.residents.C.length}
              </Typography>
              
            </CardContent>
            
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ItemPage;
