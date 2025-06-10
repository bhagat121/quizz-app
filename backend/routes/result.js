const express = require("express");
const { addResult, getAllResult, getAllResultByUser, getProof } = require("../controllers/resultController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add-result", authMiddleware, addResult);
router.post('/get-all-result', authMiddleware, getAllResult);
router.post('/get-result-by-id', authMiddleware, getAllResultByUser);
router.post('/get-proof-by-id', authMiddleware, getProof);


module.exports = router;