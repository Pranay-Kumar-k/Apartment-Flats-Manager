import React,{useState} from 'react'
import { Button, Checkbox, Divider, FormControlLabel, Grid, Link, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux"
import { useHistory } from 'react-router-dom';
import {registrationUser} from "../Redux/RegistrationRedux/actionCreator"

const useStyles = makeStyles((theme) => ({
    button: {
      '& > *': {
        margin: theme.spacing(1),
        width:"90%",
        borderRadius:"20px",
        height:"40px"
      },
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      borderRadius:"20px",
      width:"50%"
    },
    text:{
        borderRadius:"30px",
        margin:"15px",
        textAlign:'center',
        width:"50%",
        height:"50px"
    },
    form:{
      marginTop:"100px",

    }
  
  }));
function Registration () {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const isRegister = useSelector(state => state.register.isRegister)

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [name,setName] = useState("")

  const handleRegister = (e) => {
    e.preventDefault()
    const payload = {
      name: name,
      email: email,
      password: password,
    }
    dispatch(registrationUser(payload))
  }
    if(isRegister) {
      history.push("/")
    }
    return (
        <div>
            <form className={classes.form}>
            <TextField
                        className={classes.text}
                        required
                        // fullWidth
                        label="NAME"
                        name="name"
                        type="text"
                        autoFocus
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                    
                    <TextField
                        className={classes.text}
                        required
                        fullWidth
                        label="EMAIL"
                        name="Email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        className={classes.text}
                        required
                        fullWidth
                        label="PASSWORD"
                        name="password"
                        type="password"
                        autoFocus
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={handleRegister}
            >
                SIGN UP
            </Button>
            </form>
        </div>
    )
}

export default Registration
