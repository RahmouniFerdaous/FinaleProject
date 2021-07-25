import {React,useState} from 'react'
import  {useSelector,useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {  getProfile,logout } from '../redux/actions/authActions';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }))

const NavBar = () => {

    const classes = useStyles();
   // selector state 
   const auth = useSelector(state => state.auth)
   // dispatch actions
   const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
          {!auth.isAuth && (
              <>

<Typography variant="h6" style={{fontSize:'30px'}} >CarShar</Typography>
            <Typography variant="h6" className={classes.title}>
            <Link  href="/"  style={{color:'white'}}>Home</Link>
            </Typography>
            
            <Typography variant="h6" className={classes.title}>
            <Link href="/login" style={{color:'white'}}>Login</Link>
            </Typography>
          
            <Typography variant="h6" className={classes.title}>
            <Link href="/register" style={{color:'white'}}>Register</Link>
            </Typography>
            </>
            )}
            {auth.isAuth && (
              <>
              <Typography variant="h6" style={{fontSize:'30px'}} >CarShar</Typography>

            <Typography variant="h6" className={classes.title}>
            <Link  href="/"  style={{color:'white'}}>Home</Link>
            </Typography>
            <Typography variant="h6" className={classes.title}>
            <Link  href="/searchRide"  style={{color:'white'}}>Find a Ride</Link>
            </Typography>
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <Link  href="/profile"><MenuItem onClick={()=>dispatch(getProfile())}>Profile</MenuItem></Link>
                  <Link  href="/login"><MenuItem onClick={()=>dispatch(logout())}>Logout</MenuItem></Link>
                </Menu>
              </div>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
}

export default NavBar
