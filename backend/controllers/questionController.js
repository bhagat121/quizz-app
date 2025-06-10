const Exam = require('../models/examModel');
const Question = require('../models/questionsModel');

const addQuestions = async (req, res) => {
    try {
        //add  question to questions collection
        const newQuestion = new Question(req.body);
        const question = await newQuestion.save();

        //add questions to exam
        const exam = await Exam.findById(req.body.exam);
        exam.questions.push(question._id);
        await exam.save();
        res.send({
            message: "Question Added Successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false
        });
    }
}

const editQuestion = async (req, res) => {
    try {
        // edit question in Questions collection
        await Question.findByIdAndUpdate(req.body.questionId, req.body);
        res.send({
            message: "Question Edited Successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false
        });
    }
}

const deleteQuestion = async (req, res) => {
    try {
        // delete question in Questions collection
        await Question.findByIdAndDelete(req.body.questionId);

        // delete question in exam
        const exam = await Exam.findById(req.body.examId);
        exam.questions = exam.questions.filter(
            (question) => question._id !== req.body.questionId
        );
        await exam.save();
        res.send({
            message: "Question Deleted Successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false
        });
    }
}

module.exports = { addQuestions, editQuestion, deleteQuestion }