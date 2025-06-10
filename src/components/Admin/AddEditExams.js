import { Col, Form, message, Row, Table, Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addExam, deleteQuestionById, deleteQuestionInExam, editExamById, getExamById } from '../../apiCalls/userCall';
import { HiddenSpinner, ShowSpinner } from '../Redux/spinnerSlice';
import './AddEditExams.css'
import AddEditQuestion from './AddEditQuestion';

function AddEditExams() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [examData, setExamData] = useState(null);
    const [showAddEditQuestionModel, setShowAddEditQuestionModel] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const onFinish = async (values) => {
        console.log(values);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
                // headers: {
                //     "Content-type": "application/json",
                // },
            };
            dispatch(ShowSpinner());
            let data;

            if (params.id) {
                data = await editExamById({
                    ...values,
                    examId: params.id
                })
            } else {
                // //convert const to let
                // data = await axios.post(
                //     "http://localhost:4000/api/exam/add",
                //     // change the brackets to provide the path values and to solve the 500 internal server error
                //     (values),
                //     config
                // );
                data = await addExam(values);
            }
            if (data.success) {
                message.success(data.message);
                navigate('/admin/exams');
            } else {
                message.error(data.error);
            }
            dispatch(HiddenSpinner());
        } catch (error) {
            dispatch(HiddenSpinner());
            message.error(error.message);
        }
    }

    const getExamData = async () => {
        try {
            dispatch(ShowSpinner());
            // const { response } = await axios.post("http://localhost:4000/api/exam/get-exam-by-id",
            //     { examId: params.id },
            //     config
            // );

            // whenever u see a reading success error just try to call the api in apicalls page and then call it by just the function name

            const response = await getExamById({ examId: params.id });
            dispatch(HiddenSpinner());
            if (response.success) {
                setExamData(response.data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HiddenSpinner());
            message.error(error.message);
        }
    }

    const deleteQuestions = async (questionId) => {
        try {
            dispatch(ShowSpinner());
            let response = await deleteQuestionInExam({
                questionId,
                examId: params._id
                // Cannot read properties of null (reading 'questions') coz exam id ko send nhi kr raha tha mai
                
            });
            if (response.success) {
                message.success(response.message);
                getExamData();
            } else {
                message.error(response.message)
            }
            dispatch(HiddenSpinner());
        } catch (error) {
            dispatch(HiddenSpinner());
            message.error(error.message);
        }
    }

    const questionColumn = [
        {
            title: "Question",
            dataIndex: "name",
        },
        {
            title: "Options",
            dataIndex: "options",
            render: (text, record) => {
                return Object.keys(record.options).map((key) => {
                    return <div>{key} : {record.options[key]}</div>
                })
            }
        },
        {
            title: "Correct Answer",
            dataIndex: "answer",
            render: (text, record) => {
                // options             in here letter
                return `${record.answer} : ${record.options[record.answer]}`;
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div className='flex'>
                    <i className="ri-pencil-line"
                        onClick={() => {
                            setSelectedQuestion(record);
                            setShowAddEditQuestionModel(true);
                        }}
                    ></i>
                    <i className="ri-delete-bin-6-line"
                        onClick={() => {
                            deleteQuestions(record._id);
                        }}
                    ></i>
                </div>
            )
        }
    ]


    useEffect(() => {
        if (params.id) {
            getExamData();
        }
    }, [])


    return (
        <div>
            <h1>{params.id ? "Edit Exam" : "Add Exam"}</h1>
            <hr></hr>

            {(examData || !params.id) && (
                <Form layout='vertical' onFinish={onFinish} initialValues={examData}>
                    <Tabs defaultActiveKey='1'>
                        <TabPane tab="Exam Details" key="1">
                            <Row gutter={[80, 30]}>
                                <Col span={8}>
                                    <Form.Item label='Exam Name' name='name' className='form-item'>
                                        <input className='input' type="text" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Exam Duration' name='duration'>
                                        <input className='input' type="number" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Category' name='category'>
                                        {/* <Select>
                                    <Select.Option value="react">React</Select.Option>
                                    <Select.Option value="mongo">MongoDb</Select.Option>
                                    <Select.Option value="java">Java</Select.Option>
                                    <Select.Option value="python">Python</Select.Option>
                                </Select> */}
                                        <select name='' id=''>
                                            <option value=''>Select category</option>
                                            <option value='react'>React</option>
                                            <option value='mongo'>MongoDb</option>
                                            <option value='python'>Python</option>
                                            <option value='java'>Java</option>
                                        </select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Total Marks' name='totalMarks'>
                                        <input className='input' type="number" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Passing Marks' name='passingMarks'>
                                        <input className='input' type="number" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div className='b'>
                                <button className='cancel' type='button'
                                    onClick={() => navigate('/admin/exams')}>
                                    Cancel
                                </button>
                                <button className='but' type='submit'>Save</button>
                            </div>
                        </TabPane>
                        {params.id && (
                            <TabPane tab="Questions" key="2">
                                <div className='b'>
                                    <button className='butt'
                                        onClick={() => setShowAddEditQuestionModel(true)} type='button'
                                    >Add Questions</button>
                                </div>

                                <Table columns={questionColumn} dataSource={examData?.questions || []} />

                            </TabPane>)}

                    </Tabs>
                </Form>
            )}

            {showAddEditQuestionModel && <AddEditQuestion setShowAddEditQuestionModel={setShowAddEditQuestionModel}
                showAddEditQuestionModel={showAddEditQuestionModel}
                examId={params.id}
                refreshData={getExamData}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
            />}

        </div>
    )
}

export default AddEditExams