import { message, Table, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { HiddenSpinner, ShowSpinner } from '../Redux/spinnerSlice';
import { getAllResultByUser, getProof, getUserById } from '../../apiCalls/resultCalls';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import PdfDownloader from './PdfDownloader';
import UserView from './UserView';
import { getExamById } from '../../apiCalls/userCall';

function UserReports() {

    const [reportData, setReportData] = useState([]);
    const params =   useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pdfModal, setPdfModal] = useState(false);
    const [proof, setProof] = useState(null);
    const [newData, setNewData] = useState()

    const Reports = async (examId) => {
        try {
            dispatch(ShowSpinner());
            const response = await getProof({ examId });
            console.log('res', response);
            if (response.success) {
                setNewData(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HiddenSpinner());
        } catch (error) {
            dispatch(HiddenSpinner());
            message.error(error.message);
        }
    }


    const columns = [
        {
            title: "Exam Name",
            dataIndex: "name",
            render: (text, record) => <>{record.exam[0].name}</>
        },
        {
            title: "Date",
            dataIndex: "date",
            render: (text, record) => <>{
                moment(record.createdAt).format("DD-MM-YY hh:mm:ss")
            }</>
        },
        {
            title: "Total Questions",
            dataIndex: "totalMarks",
            render: (text, record) => <>{record.exam[0].totalMarks}</>
        },
        {
            title: "Correct Answers",
            dataIndex: "correctAnswers",
            render: (text, record) => <>{record.result.correctAnswers.length}</>
        },
        {
            title: "Remark",
            dataIndex: "remark",
            render: (text, record) => <>{record.result.remark}</>
        },
        {
            title: "Proof",
            dataIndex: "",
            render: (text, record) => <div>
                <i
                    onClick={() => {
                        // setProof(record._id);
                        Reports(record._id);
                        setPdfModal(true);
                    }}
                    class="ri-download-line"></i>
            </div>
        }

    ]

    const getUserReports = async () => {
        try {
            dispatch(ShowSpinner());
            const response = await getAllResultByUser();
            if (response.success) {
                setReportData(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HiddenSpinner());
        } catch (error) {
            dispatch(HiddenSpinner());
            message.error(error.message);
        }
    }

    useEffect(() => {
        getUserReports();
    }, []);

    

    return (
        <div>
            <h1>User Reports</h1>
            <hr></hr>
            <Table columns={columns} dataSource={reportData} />
            {pdfModal && <UserView newData={newData} 
            pdfModal={pdfModal}
            setPdfModal={setPdfModal}
            />}
            {/* {pdfModal && <PdfDownloader
                reportData={reportData}
                setPdfModal={setPdfModal}
                pdfModal={pdfModal}
            />} */}
        </div>
    )
}

export default UserReports