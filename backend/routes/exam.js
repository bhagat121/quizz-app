const express = require('express');
const { addExam, getAllExams, getExamById, editExamById, deleteExamById } = require('../controllers/examController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', authMiddleware, addExam);

router.post('/get-all-exams', authMiddleware, getAllExams);

router.post('/get-exam-by-id', authMiddleware, getExamById);

router.post('/edit-exam-by-id', authMiddleware, editExamById);

router.post('/delete-exam-by-id', authMiddleware, deleteExamById);

module.exports = router;