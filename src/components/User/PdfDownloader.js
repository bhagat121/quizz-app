// import { message } from 'antd';
// import Modal from 'antd/es/modal/Modal'
// import React, { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux';
// import { getAllResult, getAllResultByUser } from '../../apiCalls/resultCalls';
// import { HiddenSpinner, ShowSpinner } from '../Redux/spinnerSlice';

// function PdfDownloader({
//   setPdfModal,
//   pdfModal,
//   reportData
// }) {

//   const dispatch = useDispatch();


//   // const getAdminReports = async () => {
//   //   try {
//   //     dispatch(ShowSpinner());
//   //     const response = await getAllResultByUser();
//   //     if (response.success) {
//   //       setReportData(response.data);
//   //     } else {
//   //       message.error(response.message);
//   //     }
//   //     dispatch(HiddenSpinner());
//   //   } catch (error) {
//   //     dispatch(HiddenSpinner());
//   //     message.error(error.message);
//   //   }
//   // }

//   // cannot read properties means put '?' in front
//   // console.log(reportData[0].user.name);

//   // useEffect(() => {
//   //   getAdminReports();
//   // }, []);


//   const columns = [
//     {
//       render: (text, record) => <>{record.exam[0].name}<></>;
//     }
//   ]

//   return (
//     <Modal open={pdfModal}
//       footer={false}
//       onCancel={() => {
//         setPdfModal(false);
//       }}>

//         {reportData}

//       {/* {reportData.map((item, index) =>
//         item.user.name
//       )} */}
//       {/* {reportData[0]?.user.name}
//         {reportData[0]?.exam[0].name}
//         {reportData[0]?.result.remark} */}

//     </Modal>
//   )
// }

// export default PdfDownloader