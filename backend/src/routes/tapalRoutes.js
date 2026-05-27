const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  getTapals,
  addTapal,
  assignTapal,
  transferTapal,
  completeTapal,
  markHardCopyReceived,
} = require("../controllers/tapalController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "src/uploads/bills",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/", getTapals);
router.post("/", upload.single("bill"), addTapal);
router.put("/:id/assign", assignTapal);
router.put("/:id/transfer", transferTapal);
router.put("/:id/complete", completeTapal);
router.put("/:tapalNo/hard-copy-received", markHardCopyReceived);

module.exports = router;