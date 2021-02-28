import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import { loginUserData } from "../Redux/loginRedux/actionCreator";
import {  useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '50%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    input:{
        margin:theme.spacing(1)
    },
    p: {
        marginTop: "15px",
        fontSize: "14px"
    }
  }));


const Login = () => {
    const classes = useStyles()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.login.isAuth)
  const history = useHistory()

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUserData({email,password}))
  isAuth ? history.push("/dashboard") : history.push("/");

  };

  const register = () => {
    history.push("/register")
  }


  return (
    <div className={classes.root}>
      <form className={classes.form}>
        <TextField
        fullWidth
          id="outlined-basic"
          variant="outlined"
          label="Enter Email"
          value={email}
          className={classes.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
        fullWidth
          id="outlined-basic"
          variant="outlined"
          label="Enter Password"
          className={classes.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
             onClick={handleLogin}>
                 Login
        </Button>
      </form>
      <p> Dont have an account? Please Register.</p>
        <Button onClick={register} variant="contained" color="secondary">Register</Button>
    </div>
  );
};

export default Login;
