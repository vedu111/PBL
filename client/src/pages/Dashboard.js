import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function Dashboard() {
  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: "relative",
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 700,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    timer: {
      marginTop: theme.spacing(1),
      fontSize: "1.2rem",
    },
    completed: {
      color: "green",
      fontWeight: "bold",
      marginTop: theme.spacing(1),
    },
  }));

  const [exercises, setExercises] = useState([]);
  const [timers, setTimers] = useState({});

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/exercises")
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteExercise = (id) => {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((response) => {
        console.log(response.data);
      });
    const del = exercises.filter((el) => el._id !== id);
    setExercises(del);
  };

  const startTimer = (id, duration) => {
    const totalDuration = duration * 60;
    let remainingTime = totalDuration;

    // Start the timer
    const interval = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(interval);
        setTimers((prevTimers) => ({
          ...prevTimers,
          [id]: { time: "00:00", active: false, completed: true },
        }));
      } else {
        remainingTime--;
        const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
        const seconds = String(remainingTime % 60).padStart(2, "0");
        setTimers((prevTimers) => ({
          ...prevTimers,
          [id]: { time: `${minutes}:${seconds}`, active: true, completed: false },
        }));
      }
    }, 1000);
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Dashboard
          </Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Users</StyledTableCell>
                  <StyledTableCell align="right">Activity</StyledTableCell>
                  <StyledTableCell align="right">Duration</StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                  <StyledTableCell align="right">Start</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exercises.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {row.username}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.description}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.duration} min
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.date.substring(0, 10)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        color="secondary"
                        onClick={() => deleteExercise(row._id)}
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        color="primary"
                        onClick={() => startTimer(row._id, row.duration)}
                      >
                        Start
                      </Button>
                      {timers[row._id] && timers[row._id].active && (
                        <div className={classes.timer}>
                          {timers[row._id].time}
                        </div>
                      )}
                      {timers[row._id] && timers[row._id].completed && (
                        <div className={classes.completed}>Completed</div>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default Dashboard;