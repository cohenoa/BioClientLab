import React, { useState, useEffect } from "react";
import {  useSelector } from "react-redux";
import Input from './Input/Input'
import Output from './output/output'
import './App.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// import {
//   XYPlot,
//   XAxis,
//   YAxis,
//   HorizontalGridLines,
//   VerticalGridLines,
//   LineSeries,
// } from "react-vis";

function App () {
  // const dispatch= useDispatch()
  const doneUploadFile = useSelector((state) => state.featuresSelection.doneUploadFile)

  const [numOfPage,setNumOfPage]=useState(1)
  const [displayInput,setDisplayInput]=useState(true)
  const [displayOutput,setDisplayOutput]=useState(false)
  const[fileMetaData, setFileMetaData] = useState([]);
  const[isLoading, setIsLoading] = useState(false);
  const[accessionNumber, setAccessionNumber] = useState('');


  const saveAccessionNumber=(accessionID)=>{
    setAccessionNumber(accessionID)
  }

  const increaseOrDecreaseNumOfPage=(value)=>{
    setNumOfPage(value)
  }
  useEffect(() => {
    // console.log(fileMetaData);
  }, [fileMetaData])

  // useEffect(() => {
  //   if(!displayOutput)
  //     setIsLoading(true)
  //   else
  //   {
  //     console.log("here");
  //     setIsLoading(false)
  //   }
  // }, [doneUploadFile])
  // const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    // <div className="app">
     <div className="app" style={{ backgroundImage: "url(/organism3.jpg)",backgroundPosition: 'center', 
      backgroundSize: 'cover',
   backgroundRepeat: 'no-repeat', }}>
      <Input fileMetaData={fileMetaData}accessionNumber ={accessionNumber} saveAccessionNumber = {saveAccessionNumber} setFileMetaData={setFileMetaData} displayInput={displayInput} setDisplayInput={setDisplayInput} setDisplayOutput={setDisplayOutput}></Input>
      {isLoading && <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} /> }
      {!isLoading && displayOutput && <Output accessionNumber ={accessionNumber} setIsLoading={setIsLoading} filesMetaData={fileMetaData} displayOutput={displayOutput}></Output>}
    </div>
  );
}

export default App;
