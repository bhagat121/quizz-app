const Result = require("../models/resultModel");
const Exam = require("../models/examModel");
const User = require("../models/userModel");

const addResult = async (req, res) => {
    try {
        const newResult = new Result(req.body);
        await newResult.save();
        res.send({
            message: 'Attempt added successfully',
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

const getAllResult = async (req, res) => {
    try {
        const allResult = await Result.find().populate("user").populate("exam").sort({ createdAt: -1 });
        res.send({
            message: 'Attempt added successfully',
            data: allResult,
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

const getAllResultByUser = async (req, res) => {
    try {
        const reports = await Result.find({user: req.body.id}).populate("user").populate("exam").sort({ createdAt: -1 });
        res.send({
            message: 'Attempt fetched successfully',
            data: reports,
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

const getProof = async (req, res) => {
    try {
        const proof = await Result.findById(req.body.examId).populate("user").populate("exam");
        res.send({
            message: 'Attempt fetched successfully',
            data: proof,
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

module.exports = { addResult, getAllResult, getAllResultByUser, getProof };