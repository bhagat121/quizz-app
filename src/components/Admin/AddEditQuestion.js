import { Form, message, Modal } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux';
import { addQuestion, editQuestionById } from '../../apiCalls/userCall';
import { HiddenSpinner, ShowSpinner } from '../Redux/spinnerSlice';
import './AddEditQuestion.css';

function AddEditQuestion({
    showAddEditQuestionModel,
    setShowAddEditQuestionModel,
    refreshData,
    examId,
    selectedQuestion,
    setSelectedQuestion
}) {

    const dispatch = useDispatch();

    const onFinish = async (values) => {
        console.log(values);
        try {
            dispatch(ShowSpinner());
            const requiredPayload = {
                name: values.name,
                answer: values.answer,
                options: {
                    A: values.A,
                    B: values.B,
                    C: values.C,
                    D: values.D,
                },
                exam: examId
            };
            let response ;

            if(selectedQuestion){
                response = await editQuestionById({
                    ...requiredPayload,
                    questionId: selectedQuestion._id
                })
            }
            else{
               response = await addQuestion(requiredPayload);
            }
            if (response.success) {
                message.success(response.message);
                refreshData();
                setShowAddEditQuestionModel(false);
            } else {
                message.error(response.message);
            }
            setSelectedQuestion(null);
            dispatch(HiddenSpinner());
        } catch (error) {
            dispatch(HiddenSpinner());
            message.error(error.message);
        }
    }



    return (
        <Modal
            title={selectedQuestion ? "Edit Question" : "Add Question"}
            open={showAddEditQuestionModel}
            footer={false}
            onCancel={() => {
                setShowAddEditQuestionModel(false)
                setSelectedQuestion(null)
            }}
        >
            <Form layout='vertical' onFinish={onFinish} initialValues={{
                name: selectedQuestion?.name,
                A: selectedQuestion?.options?.A,
                B: selectedQuestion?.options?.B,
                C: selectedQuestion?.options?.C,
                D: selectedQuestion?.options?.D,
                answer: selectedQuestion?.answer,
            }}>
                <Form.Item name='name' label='Question'>
                    <input type='text' className='input1'></input>
                </Form.Item>
                <Form.Item name='answer' label='Answer'>
                    <input type='text' className='input1'></input>
                </Form.Item>
                <div className='flex'>
                    <Form.Item name='A' label='Option A'>
                        <input type='text' className='input1'></input>
                    </Form.Item>
                    <Form.Item name='B' label='Option B'>
                        <input type='text' className='input1'></input>
                    </Form.Item>
                </div>
                <div className='flex'>
                    <Form.Item name='C' label='Option C'>
                        <input type='text' className='input1'></input>
                    </Form.Item>
                    <Form.Item name='D' label='Option D'>
                        <input type='text' className='input1'></input>
                    </Form.Item>
                </div>
                <div className='bt'>
                    <button className='cancel'>Cancel</button>
                    <button className='but'>Save</button>

                </div>
            </Form>
        </Modal>
    )
}

export default AddEditQuestion