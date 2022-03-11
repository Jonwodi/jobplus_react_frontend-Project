import { AppBar, Badge, Box, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemText, Tab, Tabs, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';

import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';



const useStyles = makeStyles((theme) => ({
  container: {
    //migrate to theme.js
    ...theme.container
    // border: '1px yellow dotted'
  },
  iconsWrap: {
    marginLeft: 'auto',
   // border: '1px red dotted',
    '& .MuiButtonBase-root': {
      marginLeft: '13px',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '27px'
    }
  },
  tabs: {
    '& .MuiTab-root': {
      minWidth: 10,
      marginLeft: '10px'
    }
  },
  hamburger: {
    fontSize: '35px',
    marginRight: '10px',
  },
  logo: { ...theme.fonts.bold, 
  },
  badge: {
    backgroundColor: theme.palette.error.main,
    border: "1px white solid",
  },
  indicator: {
    backgroundColor: theme.palette.common.light,
  },
  drawerHeader: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }
}))

export default function Navbar() {
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  const [tabIndex, setTabIndex] = useState(false);

  const handleTabIndexChange = (event, index) => {
    setTabIndex(index)
  }

  const routes = [
  {name: 'Home', Link: '/', index: 0}, 
  {name: 'Job Listings', Link: '/job-listings', index: 1}, 
  {name: 'Job Applications', Link: '/job-applications', index: 2},
];

useEffect(() => {
  routes.forEach(route => {
    switch (window.location.pathname) {
      case `${route.Link}`:
        setTabIndex(route.index);
        break;
      default:
        return false;
    }
  });
}, [window.location.pathname]);
  
  return (
<Box>
  <AppBar position="static">
    <Drawer variant="persistent" anchor="left" open={openDrawer}>
    <div className={classes.drawerHeader}>
      <IconButton onClick={handleDrawerClose}>
        <ChevronLeftIcon />
      </IconButton>
     </div>
     <Divider />
     <List>
       {routes.map((route, index) => (
       <ListItem key={`${route}${index}`} component={Link} to={route.Link} selected={window.location.pathname === route.Link} onClick={handleDrawerClose} button>
         <ListItemText primary={route.name} />
       </ListItem>))}


     </List>
    </Drawer>
    <Toolbar className={classes.container}>
      <Hidden mdUp>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
          <MenuIcon className={classes.hamburger}/>
        </IconButton>
      </Hidden>
      <Typography component="h6" className={classes.logo}>JOBPLUS</Typography>
      <Hidden smDown>
      <Tabs value={tabIndex} className={classes.tabs} classes={{indicator: classes.indicator}} onChange={handleTabIndexChange}>
        {routes.map((route, index) => (
          <Tab key={`${route}${index}`} label={route.name} component={Link} to={route.Link} />
        ))}
      </Tabs>
      </Hidden>

      <Box className={classes.iconsWrap}>
        <IconButton size="small" component={Link} to={'/search'} color='inherit' edge='start'>
         <SearchIcon />
        </IconButton>

        <IconButton size="small" component={Link} to={'/notifications'} color='inherit' edge='start'>
          <Badge color="error" overlap="circular" variant="dot">
         <NotificationsNoneIcon />
         </Badge>
        </IconButton>

        <IconButton size="small" component={Link} to={'/saved-jobs'} color='inherit' edge='start'>
          <Badge badgeContent={2} classes={{badge: classes.badge}}>
         <StarBorderIcon />
         </Badge>
        </IconButton>

        <IconButton size="small" component={Link} to={'/profile'} color='inherit' edge='start'>
         <PersonOutlineIcon />
        </IconButton>
        
        <IconButton size="small" component={Link} to={'/login'} color='inherit' edge='start'>
         <ExitToAppIcon />
        </IconButton>

      </Box>
    </Toolbar>
  </AppBar>
</Box>
  )
}
