import './Dashboard.css';
import { Col, message, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllExams } from '../../apiCalls/userCall';
import { HiddenSpinner, ShowSpinner } from '../Redux/spinnerSlice';
import { useNavigate } from 'react-router-dom';


function Dashboard(exam) {

  const [exams, setExams] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  

  const getExams = async () => {
    try {
      dispatch(ShowSpinner());
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
      }
      else {
        message.error(response.message);
      }
      dispatch(HiddenSpinner());
    } catch (error) {
      dispatch(HiddenSpinner());
      message.error(error.message);
    }
  }

  useEffect(() => {
    getExams();
  }, []);

  return (
    <div>
      <h1>Hi {user?.name}!, Welcome to the Quizz</h1>
      <hr></hr>
      <div>
        <Row gutter={[16, 16]} className="ant-row1">
          {exams.map((exam) => (
            <Col span={6}>
              <div className='card'>
                <h1 className='h1'>{exam.name}</h1>
                <h3>Category: {exam.category}</h3>
                <h3>totalMarks: {exam.totalMarks}</h3>
                <h3>passingMarks: {exam.passingMarks}</h3>
                <h3>Duration: {exam.duration}</h3>
                <button className='c-but'
                  onClick={() => navigate(`/user/write/exam/${exam._id}`)}>
                  Start Exam
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default Dashboard;