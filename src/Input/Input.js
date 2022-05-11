import React, { useState, useEffect } from "react";
import './input.css';
// import {
//   Button
// } from 'antd';

import OrganizamSelector from './OrganizamSelector'
import FeaturesSelection from './FeaturesSelection'



function Input (props) {
 
  // const [numOfPage,setNumOfPage]=useState(1)

  const saveFileMetaData=(filesList)=>{
    props.setFileMetaData(filesList)
  }
  // const increaseOrDecreaseNumOfPage=(value)=>{
  //   setNumOfPage(value)
  // }
  return (

      <div className='input'>
       {props.numOfPage === 1 && <div className='organizam-page'><OrganizamSelector listOfCombinedFiles={props.listOfCombinedFiles}  setListOfCombinedFiles={props.setListOfCombinedFiles} disableTabsHeader={props.disableTabsHeader} setDisableTabsHeader={props.setDisableTabsHeader} accessionNumber={props.accessionNumber} fileMetaData={props.fileMetaData} saveAccessionNumber={props.saveAccessionNumber}  increaseOrDecreaseNumOfPage={props.increaseOrDecreaseNumOfPage} saveFileMetaData={saveFileMetaData} fileFromServer = {props.fileFromServer} saveFileFromServer ={props.saveFileFromServer}></OrganizamSelector></div>}
       {props.numOfPage === 2 && 
              <div  className='features-selection'>

        <div className='organizam-page'><FeaturesSelection disableTabsHeader={props.disableTabsHeader} setDisableTabsHeader={props.setDisableTabsHeader} accessionNumber={props.accessionNumber} increaseOrDecreaseNumOfPage={props.increaseOrDecreaseNumOfPage} fileMetaData={props.fileMetaData} setDisplayInput={props.setDisplayInput} setDisplayOutput={props.setDisplayOutput}></FeaturesSelection>  </div></div>}
       
      </div>

       );
}

export default Input;
