const express = require('express');
const { addQuestions, deleteQuestion, editQuestion } = require('../controllers/questionController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add-questions-to-exam', authMiddleware, addQuestions);

router.post('/edit-question-in-exam', authMiddleware, editQuestion);

router.post('/delete-question-in-exam', authMiddleware, deleteQuestion);

module.exports = router;