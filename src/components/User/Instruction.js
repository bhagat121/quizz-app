import React from 'react';
import './Instruction.css';

function Instruction({ examData , setView, startTimer}) {

  // Number to time converting thing done
  const time = examData.duration;
  // moment(time.toString(),"LT");

  const timeSet = (time) => {
    var hours = Math.floor(time / 60);  
    var minutes = time % 60;
    return hours + ":" + minutes; 
  }
  const newTime = timeSet(time);

  // console.log(newTime);

  return (
    <div className='inst'>
      <h1 className='inst-h1'>Instructions</h1>
      <ul className='inst-ul'>
        <li className='inst-li'>Exam must be complete in {newTime} seconds.</li>
        <li className='inst-li'>Exam will be submitted automatically after the given time.</li>
        <li className='inst-li'>You cannot change your answer after the submission.</li>
        <li className='inst-li'>Do not refresh the page.</li>
        <li className='inst-li'>Total marks for the exam is {examData.totalMarks}.</li>
        <li className='inst-li'>Passing marks for the exam is also {examData.passingMarks}.</li>
        <li className='inst-li'>You can only attend exam Once. </li>
      </ul>
      <button className='inst-but' type='button'
      onClick={() => {
        startTimer();
        setView("questions");
      }}
      >Start Exam</button>
    </div>
  )
}

export default Instruction