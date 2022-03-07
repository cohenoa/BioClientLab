import React, { useState, useEffect } from "react";
import {  useSelector } from "react-redux";
import Input from './Input/Input'
import Output from './output/output'
import './App.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


function App () {
  const doneUploadFile = useSelector((state) => state.featuresSelection.doneUploadFile)

  const [numOfPage,setNumOfPage]=useState(1)
  const [displayInput,setDisplayInput]=useState(true)
  const [displayOutput,setDisplayOutput]=useState(false)
  const[fileMetaData, setFileMetaData] = useState([]);
  const[isLoading, setIsLoading] = useState(false);
  const[accessionNumber, setAccessionNumber] = useState('');
  const[fileFromServer, setFileFromServer] = useState('');

  const saveAccessionNumber=(accessionID)=>{
    setAccessionNumber(accessionID)
  }
  const saveFileFromServer=(fileFromServer)=>{
    setFileFromServer(fileFromServer)
  }

  const increaseOrDecreaseNumOfPage=(value)=>{
    setNumOfPage(value)
  }
  useEffect(() => {
  }, [fileMetaData])


  return (
     <div className="app" style={{ backgroundImage: "url(/organism3.jpg)",backgroundPosition: 'center', 
      backgroundSize: 'cover',
   backgroundRepeat: 'no-repeat', }}>
  
      <Input fileMetaData={fileMetaData} accessionNumber ={accessionNumber} saveAccessionNumber = {saveAccessionNumber} setFileMetaData={setFileMetaData} fileFromServer = {fileFromServer} saveFileFromServer ={saveFileFromServer} displayInput={displayInput} setDisplayInput={setDisplayInput} setDisplayOutput={setDisplayOutput}></Input>
      {isLoading && <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} /> }
      {!isLoading && displayOutput && <Output accessionNumber ={accessionNumber} setIsLoading={setIsLoading} filesMetaData={fileMetaData} fileFromServer = {fileFromServer} saveFileFromServer ={saveFileFromServer} displayOutput={displayOutput}></Output>}
    </div>
  );
}

export default App;
