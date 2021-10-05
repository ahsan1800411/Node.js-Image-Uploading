const express = require("express");
const path = require("path");
const app = express();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
app.set("view engine", "ejs");

app.get("/multiples", (req, res) => {
  res.render("upload");
});

//=> for single file upload

// app.post("/upload", upload.single("image"), (req, res) => {
//   res.send("Image Uploaded");
// });

//   for multiples files upload ===>>>
app.post("/multiples", upload.array("images"), (req, res) => {
  res.send("Multiples Files are uploaded");
});

app.listen(3000, () => console.log(`Server is up and Running...`));
