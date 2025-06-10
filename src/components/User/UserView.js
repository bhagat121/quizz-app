import { message, Table, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { HiddenSpinner, ShowSpinner } from '../Redux/spinnerSlice';
import { getAllResultByUser, getProof } from '../../apiCalls/resultCalls';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const UserView = ({
    setPdfModal,
    pdfModal,
    newData
}) => {

    const handleDownloadPDF = () => {
        const input = document.getElementById('pdf-content'); 
        // Specify the id of the element you want to convert to PDF
        html2canvas(input).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'PNG', 0, 0);
          pdf.save('downloaded-file.pdf'); 
          // Specify the name of the downloaded PDF file
        });
      };


    return (
        <div>
        {newData && 
        <Modal open={pdfModal}
        onCancel={()=> {
            setPdfModal(false);
        }}
        >
        <div id='pdf-content'>
            {/* {console.log(newData)} */}
            <p>{newData.user?.name}</p>
            <p>{newData.result?.remark}</p>
            {console.log(newData.exam[0]?.name)}
            <p>{newData.exam[0]?.name}</p>
            {/* {newData.result.remark} */}
        </div>
        <button onClick={handleDownloadPDF}>Download PDF</button>
        </Modal>}
    </div>
      );
};

export default UserView;