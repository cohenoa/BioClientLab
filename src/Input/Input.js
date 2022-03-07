import React, { useState, useEffect } from "react";
import './input.css';
// import {
//   Button
// } from 'antd';

import OrganizamSelector from './OrganizamSelector'
import FeaturesSelection from './FeaturesSelection'



function Input (props) {
 
  const [numOfPage,setNumOfPage]=useState(1)
  // const[fileMetaData, setFileMetaData] = useState();
  // const[accessionNumber, setAccessionNumber] = useState('');


  // const saveAccessionNumber=(accessionID)=>{
  //   setAccessionNumber(accessionID)
  // }
  const saveFileMetaData=(filesList)=>{
    props.setFileMetaData(filesList)
  }
  const increaseOrDecreaseNumOfPage=(value)=>{
    setNumOfPage(value)
  }
  return (
    <div>
     {props.displayInput && <div className='input'>
       {numOfPage === 1 && <div className='organizam-page'><OrganizamSelector accessionNumber={props.accessionNumber} fileMetaData={props.fileMetaData} saveAccessionNumber={props.saveAccessionNumber}  increaseOrDecreaseNumOfPage={increaseOrDecreaseNumOfPage} saveFileMetaData={saveFileMetaData} fileFromServer = {props.fileFromServer} saveFileFromServer ={props.saveFileFromServer}></OrganizamSelector></div>}
       {numOfPage === 2 && 
              <div  className='features-selection'>

        <div className='organizam-page'><FeaturesSelection accessionNumber={props.accessionNumber} increaseOrDecreaseNumOfPage={increaseOrDecreaseNumOfPage} fileMetaData={props.fileMetaData} setDisplayInput={props.setDisplayInput} setDisplayOutput={props.setDisplayOutput}></FeaturesSelection>  </div></div>}
       
      </div>
       }</div>
       );
}

export default Input;
