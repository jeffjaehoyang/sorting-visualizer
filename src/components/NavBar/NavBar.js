import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: 'auto'
  },
  farRight: {
    marginLeft: 'auto',
    paddingRight: 0,
    alignItems: 'center',
    display: 'flex'
  },
  appBar: {
    backgroundColor: "#001b32",
    display: 'flex',
  },
}));

const NavBar = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <AppBar className={styles.appBar} position="static" elevation={0}>
        <Toolbar variant="dense">
          <Typography variant="h6" className={styles.title}>
            Sorting Algorithm Visualizer
          </Typography>
          <IconButton className={styles.farRight} color="inherit" aria-label="link-to-github" disableRipple>
            <a href="https://github.com/jeffjaehoyang/sorting-visualizer" style={{ color: 'inherit' }}><GitHubIcon /></a>
          </IconButton>
        </Toolbar> 
      </AppBar>
    </div>
  );
}

export default NavBar;