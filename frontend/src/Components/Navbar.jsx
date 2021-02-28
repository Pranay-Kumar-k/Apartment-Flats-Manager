import React,{useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import PersonIcon from "@material-ui/icons/Person";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";
import { useSelector } from "react-redux";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(0)
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(5, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  }
}));

export default function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const isAuth = useSelector(state => state.login.isAuth);
  const name = useSelector(state => state.login.name);


  const handleRouteChange = (to) => {
    history.push(to);
  };


  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
          {[
            {
              text: "Home",
              to: "/dashboard"
            },
            {
              text: "Sign up",
              to: "/register"
            },
            {
              text: "Login",
              to: "/"
            }
          ].map((item) => (
            <Typography
              variant="h6"
              color="inherit"
              className={classes.title}
              key={item.text}
              onClick={() => handleRouteChange(item.to)}
            >
              {item.text}
            </Typography>
          ))}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <Avatar>KP</Avatar>
          <Typography variant="h6"> {isAuth ? name : ""} </Typography>
        </div>
       {isAuth && ( <List>
          {[
            {
              text: "Profile",
              icon: <PersonIcon />,
              to: "/profile"
            },
            {
              text: "Others",
              icon: <AllInclusiveIcon />,
              to: "/others"
            },
            {
              text: "Logout",
              icon: <ExitToAppIcon />,
              to: "/"
            }
          ].map((item) => (
            <ListItem
              onClick={() => handleRouteChange(item.to)}
              button
              key={item.text}
            >
              <ListItemIcon> {item.icon} </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>)}
      </Drawer>
    </div>
  );
}
