import { message, Table } from 'antd';
// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteExamById, getAllExams } from '../../apiCalls/userCall';
import { HiddenSpinner, ShowSpinner } from '../Redux/spinnerSlice';
import './Exams.css';

function Exams() {
    const navigate = useNavigate();
    const [exam, setExam] = useState([]);
    const dispatch = useDispatch();



    const getExamData = async () => {

        try {

            dispatch(ShowSpinner());
            // let { response } = await axios.post(
            //     // {} put those braces as payload and headers will appear
            //     "http://localhost:4000/api/exam/get-all-exams"
            // );

            // call the api in apicalls file and its fine
            const response = await getAllExams();
            dispatch(HiddenSpinner());
            if (response.success) {
                setExam(response.data);
            }
            else {
                message.error(response.message)
            }
        } catch (error) {
            dispatch(HiddenSpinner());
            message.error(error.message);
        }
    }

    const deleteExam = async (examId) => {
        try {
            dispatch(ShowSpinner());
            const response = await deleteExamById({ examId });
            dispatch(HiddenSpinner());
            if (response.success) {
                message.success(response.message);
                getExamData();
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HiddenSpinner());
            message.error(error.message);
        }
    }

    const columns = [
        {
            title: 'Exam Name',
            dataIndex: "name",
        },
        {
            title: 'Duration',
            dataIndex: "duration",
        },
        {
            title: 'Category',
            dataIndex: "category",
        },
        {
            title: 'Total Marks',
            dataIndex: "totalMarks",
        },
        {
            title: 'Pass Marks',
            dataIndex: "passingMarks",
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) =>
                <div className='flex'>
                    <i class="ri-pencil-line"
                        onClick={() => navigate(`/admin/exams/edit/${record._id}`)}
                    ></i>
                    <i class="ri-delete-bin-6-line"
                        onClick={() => deleteExam(record._id)}
                    ></i>
                </div>

        }
    ]

    useEffect(() => {
        getExamData();
    }, []);

    return (
        <div className='first'>
            <div className='heading'>
                <h1>Exams</h1>
                <button className='second' onClick={() => navigate("/admin/exams/add")}>
                    <i class="ri-add-line"></i>
                    <h3 className='h3'>Add Exam</h3>
                </button>
            </div>
            <hr></hr>
            <Table columns={columns} dataSource={exam} />
        </div>
    )
}

export default Exams;