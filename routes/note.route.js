const express = require("express");
const { NoteModel } = require("../model/note.model");
const { auth } = require("../middleware/auth.middleware");

const noteRouter = express.Router();

noteRouter.use(auth);

noteRouter.post("/create", (req, res) => {
  try {
    const note = new NoteModel(req.body);
    note.save();
    res.json({ msg: "New note has been updated", note: req.body });
  } catch (err) {
    res.json({ err: err.message });
  }
});

noteRouter.get("/", async (req, res) => {
  try {
    console.log(req.body);
    const notes = await NoteModel.find({ userID: req.body.userID });
    res.send(notes);
  } catch (err) {
    res.json({ err: err.message });
  }
});

noteRouter.patch("/update/:noteID", async(req, res) => {
  const userIDinUserDoc = req.body.userID;
  const { noteID } = req.params;
  try {
    const note = await NoteModel.findOne({ _id: noteID });
    const userIDinNoteDoc = note.userID;
    if (userIDinUserDoc === userIDinNoteDoc) {
      await NoteModel.findByIdAndUpdate(noteID,req.body)
      res.json({msg:`${note.title} has been updated`})
    } else {
      res.json({ msg: "Not Authorized!!" });
    }
  } catch (err) {
    res.json({ err: err.message });
  }
});
noteRouter.delete("/delete/:noteID", async (req, res) => {
  // userID in the userDoc === userID in the note Doc
  const userIDinUserDoc = req.body.userID;
  const { noteID } = req.params;
  try {
    const note = await NoteModel.findOne({ _id: noteID });
    const userIDinNoteDoc = note.userID;
    if (userIDinUserDoc === userIDinNoteDoc) {
      // console.log(userIDinNoteDoc,"==",userIDinUserDoc);
      await NoteModel.findByIdAndDelete(noteID)
      res.json({msg:`${note.title} has been deleted`})
    } else {
      // console.log(userIDinNoteDoc,"==",userIDinUserDoc);
      res.json({ msg: "Not Authorized!!" });
    }
  } catch (err) {
    res.json({ err: err.message });
  }
});

module.exports = {
  noteRouter,
};
