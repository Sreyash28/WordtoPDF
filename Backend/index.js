const express = require("express");
const multer = require("multer");
const docxConverter = require("docx-pdf");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// setting up the file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/docToPdf", upload.single("file"), (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "file is not uploaded." });
    }
    //  defining the output file path
    let outputPath = path.join(
      __dirname,
      "Files",
      `${req.file.originalname}.pdf`
    );
    docxConverter(req.file.path, outputPath, (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Error converting Doc file to PDF" });
      }
      res.download(outputPath, () => {
        console.log("File downloaded successfully.");
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!!!" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
