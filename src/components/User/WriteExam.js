import { message } from 'antd';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addResult } from '../../apiCalls/resultCalls';
import { getExamById } from '../../apiCalls/userCall';
import { HiddenSpinner, ShowSpinner } from '../Redux/spinnerSlice';
import Instruction from './Instruction';
import './WriteExam.css';

function WriteExam() {

    const [examData, setExamData] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [view, setView] = useState("Instruction");
    const [questions, setQuestions] = useState([]);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState({});
    const [result, setResult] = useState({});
    const [countLeft, setCountLeft] = useState(0);
    const [timeUp, setTimeUp] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const { user } = useSelector(state => state.users);

    const getExamData = async () => {
        try {
            dispatch(ShowSpinner());
            // whenever u see a reading success error just try to call the api in apicalls page and then call it by just the function name

            const response = await getExamById({ examId: params.id });
            dispatch(HiddenSpinner());
            if (response.success) {
                setExamData(response.data);
                setQuestions(response.data.questions);
                setCountLeft(response.data.duration);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HiddenSpinner());
            message.error(error.message);
        }
    }

    // const totalSeconds = (examData.duration) => {
    //     const hours = Math.floor(examData.duration / 60);
    //     const minutes = examData.duration % 60;
    //     return `${hours}:${minutes}`;
    // }
    // console.log(totalSeconds);

    

    const startTimer = () => {
        let totalSeconds = examData.duration;
        const intervalId = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds = totalSeconds - 1;
                setCountLeft((prev) => prev - 1);
            }
            else {
                setTimeUp(true);
            }
        }, 1000)
        setIntervalId(intervalId);
    }

    useEffect(() => {
        if (timeUp) {
            clearInterval(intervalId);
            calculateResult();
        }
    }, [timeUp])

    const calculateResult = async () => {
        try {
            let correctAnswers = [];
            let wrongAnswers = [];

            questions.forEach((question, index) => {
                if (question.answer === selectedOption[index]) {
                    correctAnswers.push(question);
                } else {
                    wrongAnswers.push(question);
                }
            })

            let remark = "Pass";
            if (correctAnswers.length < examData.passingMarks) {
                remark = "Fail";
            }

            const tempResult = {
                correctAnswers,
                wrongAnswers,
                remark,
            }
            setResult(tempResult);
            dispatch(ShowSpinner());
            const response = await addResult({
                exam: params.id,
                result: tempResult,
                user: user._id,
            });
            dispatch(HiddenSpinner());
            if (response.success) {
                setView("result")
            } else {
                message.error(response.message)
            }
        } catch (error) {
            dispatch(HiddenSpinner());
            message.error(error.message);
        }
    };


    useEffect(() => {
        if (params.id) {
            getExamData();
        }
    }, [])

    return (
        examData && <div>
            <hr className='write-hr'></hr>
            <h1 className='write'>{examData?.name}</h1>
            <hr></hr>

            {view === "Instruction" && <Instruction examData={examData}
                view={view}
                setView={setView}
                startTimer={startTimer}
            />}

            {view === "questions" && <div>
                <div className='timer'>
                    <h1>
                        {selectedQuestionIndex + 1} : {questions[selectedQuestionIndex].name}
                    </h1>
                    <h1 className='timer-h1'>{countLeft}</h1>
                </div>
                <div>
                    {Object.keys(questions[selectedQuestionIndex].options).map((option, index) => {
                        return <div className={`${selectedOption[selectedQuestionIndex] === option
                            ? "selected-option" : "option"
                            }`}
                            key={index}
                            onClick={() => {
                                setSelectedOption({
                                    ...selectedOption,
                                    [selectedQuestionIndex]: option,
                                })
                            }}
                        >
                            <h2>
                                {option} : {questions[selectedQuestionIndex].options[option]}
                            </h2>
                        </div>
                    })}
                </div>
                <div className='write-two-button'>
                    {selectedQuestionIndex > 0 && <button
                        className='first-button'
                        onClick={() => {

                            setSelectedQuestionIndex(selectedQuestionIndex - 1);

                        }}
                    >
                        Previous</button>}
                    {selectedQuestionIndex < questions.length - 1 && <button
                        className='first-button'
                        onClick={() => {

                            setSelectedQuestionIndex(selectedQuestionIndex + 1);

                        }}
                    >
                        Next</button>}

                    {selectedQuestionIndex === questions.length - 1 &&
                        <button
                            className='first-button'
                            onClick={() => {
                                clearInterval(intervalId);
                                setTimeUp(true);
                                // calculateResult()
                                // setView("result")
                            }}>
                            Submit
                        </button>}
                </div>
            </div>}

            {view === 'result' &&
                <div className='result-1'>
                    <div className='result'>
                        <h1>Result</h1>
                        <div>
                            <h2 className='h2'>Total Marks : {examData?.totalMarks}</h2>
                            <h2 className='h2'>Obtained Marks : {result.correctAnswers.length}</h2>
                            <h2 className='h2'>Remarks : {result.remark}</h2>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default WriteExam