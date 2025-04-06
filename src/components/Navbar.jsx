import { AppBar, Toolbar, Typography, Button, Switch, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <AppBar position="static" sx={{backgroundColor: darkMode ? "#33333" : "	#02474d"}} >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2}}>
          <Typography variant="h6">JobFinder</Typography>
          <Button color="" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/saved">Saved Jobs</Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography>Dark Mode</Typography>
          <Switch checked={darkMode} onChange={() => dispatch(toggleTheme())} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
