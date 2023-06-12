const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.route");
const { noteRouter } = require("./routes/note.route");
const cors =require("cors")

const app = express();

app.use(cors())
app.use(express.json());
app.use("/user", userRouter);
app.use("/note", noteRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
    console.log(`Server is running at port ${process.env.port}`);
  } catch (err) {
    console.log(err);
    console.log("Some thing Went Wrong");
  }
});
