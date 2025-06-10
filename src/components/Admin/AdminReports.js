import { message, Table } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getAllResult } from '../../apiCalls/resultCalls';
import { HiddenSpinner, ShowSpinner } from '../Redux/spinnerSlice';

function AdminReports() {

    const [reportData, setReportData] = useState([]);
    const dispatch = useDispatch();

    const columns = [
        {
            title: "Exam Name",
            dataIndex: "name",
            render: (text, record) => <>{record.exam[0].name}</>
        },
        {
            title: "User",
            dataIndex: "name",
            render: (text, record) => <>{record.user.name}</>
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
       

    ]

    const getAdminReports = async () => {
        try {
            dispatch(ShowSpinner());
            const response = await getAllResult();
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
        getAdminReports();
    }, []);

    return (
        <div>
            <h1>Admin Reports</h1>
            <hr></hr>
            <Table columns={columns} dataSource={reportData} />
        </div>
    )
}

export default AdminReports