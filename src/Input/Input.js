import React, { useState, useEffect } from "react";
import './input.css';
import OrganizamSelector from './OrganizamSelector'
import FeaturesSelection from './FeaturesSelection'



function Input (props) {
 

  const saveFileMetaData=(filesList)=>{
    props.setFileMetaData(filesList)
  }

  return (

      <div className='input'>
       {props.numOfPage === 1 && <div className='organizam-page'><OrganizamSelector listOfCombinedFiles={props.listOfCombinedFiles}  setListOfCombinedFiles={props.setListOfCombinedFiles} disableTabsHeader={props.disableTabsHeader} setDisableTabsHeader={props.setDisableTabsHeader} accessionNumber={props.accessionNumber} fileMetaData={props.fileMetaData} saveAccessionNumber={props.saveAccessionNumber}  increaseOrDecreaseNumOfPage={props.increaseOrDecreaseNumOfPage} saveFileMetaData={saveFileMetaData} fileFromServer = {props.fileFromServer} saveFileFromServer ={props.saveFileFromServer}></OrganizamSelector></div>}
       {props.numOfPage === 2 && 
              <div  className='features-selection'>

        <div className='organizam-page'><FeaturesSelection  setExcludedProductDescription={props.setExcludedProductDescription} excludedProductDescription={props.excludedProductDescription} productDescription={props.productDescription} saveProductDescription={props.saveProductDescription} geneFilter={props.geneFilter} saveGeneFilter={props.saveGeneFilter} disableTabsHeader={props.disableTabsHeader} setDisableTabsHeader={props.setDisableTabsHeader} accessionNumber={props.accessionNumber} increaseOrDecreaseNumOfPage={props.increaseOrDecreaseNumOfPage} fileMetaData={props.fileMetaData} setDisplayInput={props.setDisplayInput} setDisplayOutput={props.setDisplayOutput}></FeaturesSelection>  </div></div>}
       
      </div>

       );
}

export default Input;
