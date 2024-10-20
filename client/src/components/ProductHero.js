import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "./Button";
import Typography from "./Typography";
import ProductHeroLayout from "./ProductHeroLayout";

const backgroundImage =
  "https://images.unsplash.com/photo-1551672746-89991811c186?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80";

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#7fc7d9", 
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100vh", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    color: theme.palette.common.white,
    textAlign: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  button: {
    minWidth: 200,
    borderRadius: "25px",
    padding: theme.spacing(1.5, 4), 
    fontSize: "1rem",
    transition: "background-color 0.3s, transform 0.3s",
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
      transform: "scale(1.05)",
    },
  },
  h2: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
    fontSize: "3rem",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    fontWeight: 500,
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
  more: {
    marginTop: theme.spacing(2),
    fontSize: "1.1rem",
    fontWeight: 600,
    textDecoration: "underline",
  },
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <div className={classes.background}>
      <div className={classes.overlay} />
      <ProductHeroLayout>
        <img
          style={{ display: "none" }}
          src={backgroundImage}
          alt="increase priority"
        />
        <Typography color="inherit" align="center" variant="h2" marked="center" className={classes.h2}>
          Stay Fit With Us
        </Typography>
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          className={classes.h5}
        >
          Record your fitness activities and stay consistent in your journey.
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          className={classes.button}
          component="a"
          href="/exercise"
        >
          Record Activity
        </Button>
        <Typography variant="body2" color="inherit" className={classes.more}>
          Start Now
        </Typography>
      </ProductHeroLayout>
    </div>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
