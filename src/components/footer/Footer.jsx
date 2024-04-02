import React from 'react';
import { Typography, Container, Grid, Link, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: '#00171f',
    marginTop:'10%',
    color: '#fff',
    padding: theme.spacing(4),
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  divider: {
    backgroundColor: '#fff',
    margin: theme.spacing(2, 0),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg" className={classes.footerContainer}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">About Us</Typography>
            <Typography variant="body2">
              We provide authentic halal information for travelers around the world.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Contact Us</Typography>
            <Typography variant="body2">
              Email: <Link href="mailto:world.halal123@gmail.com" className={classes.link}>world.halal123@gmail.com</Link><br />
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Typography variant="body2" align="center">
          <Link href="/" className={classes.link}>Home</Link>{' | '}
          <Link href="/numbers" className={classes.link}>E-NumberCheck</Link>{' | '}
          <Link href="/about" className={classes.link}>About Us</Link>{' | '}
          <Link href="/contact" className={classes.link}>Contact Us</Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
