const Exam = require('../models/examModel');
const asyncHandler = require('express-async-handler');
const Question = require('../models/questionsModel');


const addExam = asyncHandler(async (req, res) => {
    try {
        const examExists = await Exam.findOne({ name: req.body.name });
        if (examExists) {
            return res.status(200).send({
                message: 'Exam already exists',
                success: false
            });
        }
        req.body.questions = [];
        const newExam = new Exam(req.body);
        await newExam.save();
        res.send({
            message: 'Exam added successfully',
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false
        });
    }
})

const getAllExams = async (req, res) => {
    try {
        const exams = await Exam.find();
        if (exams) {
            return res.status(200).send({
                message: 'Exam fetched successfully',
                data: exams,
                success: true
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
}

const getExamById = async (req, res) => {
    try {
        const exam = await Exam.findById(req.body.examId).populate("questions");
        // mongodb relationship
        
        res.send({
            message: 'Exam fetched successfully',
            data: exam,
            success: true,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        })
    }
}

const editExamById = async (req, res) => {
    try {
        await Exam.findByIdAndUpdate(req.body.examId, req.body);
        res.send({
            message: 'Exam Edited successfully',
            success: true,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        })
    }
}

const deleteExamById = async (req, res) => {
    try {
        await Exam.findByIdAndDelete(req.body.examId);
        res.send({
            message: 'Exam Deleted successfully',
            success: true,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        })
    }
}

module.exports = { addExam, getAllExams, getExamById, editExamById, deleteExamById };