const express = require("express");
const router = express.Router();
const {
  addVisitor,
  getVisitors,
  exitVisitor,
} = require("../controllers/visitorController");

router.post("/add", addVisitor);       // Add visitor
router.get("/", getVisitors);          // View visitor List
router.put("/exit/:id", exitVisitor);  //  Exit

module.exports = router;