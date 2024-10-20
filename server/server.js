const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello to Fitness Tracker API");
});

mongoose.connect(
  'mongodb://localhost:27017/fitnessTracker', 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }
)
.then(() => console.log("Database connected"))
.catch((err) => console.log("Database connection error: ", err));


const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
