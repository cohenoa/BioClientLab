import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './output.css';
import {setFeaturesOutput } from '../store/actions/output/featuresOutput'
import MenuFiles from './menu'
import Feature from './feature'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


function Output (props) {
  const dispatch= useDispatch()
  const featureListResult = useSelector((state) => state.featureOutput.featuresList);
  const featureChosenByUser = useSelector((state) => state.featuresSelection.featuresChosenByUser);
  
  const [featureListResultFromServer,setFeatureListResultFromServer]=useState()
  const [fileTabClickByTheUser,setFileTabClickByTheUser]=useState()
  const [featureChosenByUserToChild,setFeatureChosenByUserToChild]=useState([])
  const[isLoading, setIsLoading] = useState(false);
  const [accessionNumberList, setAccessionNumberList] = useState([]);
  const [unionAllFiles,setUnionAllFiles]=useState([])


  useEffect(() => {
    props.setDisableTabsHeader({...props.disableTabsHeader , 1: true})

   let accNumberAfterSplit = props.accessionNumber.split(',');
   accNumberAfterSplit = accNumberAfterSplit.map(name => name +".gb").filter(name=> name !== '.gb');
   setAccessionNumberList (accNumberAfterSplit);
   let extractNameFromFileMetaData = props.filesMetaData.map(file =>  file.name)
   let unionFiles = [...extractNameFromFileMetaData, ...accNumberAfterSplit, ...[props.fileFromServer]].filter(element => element !== '' )
   setUnionAllFiles(unionFiles)
  }, [])

  useEffect(() => {
    if(Object.keys(featureListResult).length)
        setIsLoading(true)
    else
       setIsLoading(false)
    
  }, [featureListResult])

  useEffect(() => {
    if (featureChosenByUser.length !==0 && unionAllFiles.length !==0 ){
      setFeatureChosenByUserToChild(featureChosenByUser)
      dispatch(setFeaturesOutput(featureChosenByUser, unionAllFiles))
    }
    
  }, [featureChosenByUser, unionAllFiles])


  useEffect(() => {
    setFeatureListResultFromServer(featureListResult)
    // setFileTabClickByTheUser(Object.keys(featureListResult)[0])
    props.setIsLoading(false)

    
  }, [featureListResult])

  const setFileTabClickByTheUserFunction=(file)=>{
    setFileTabClickByTheUser(file)
  }


  return (
    <div className="outputScreen">
      {!isLoading ? 
      <div className="loading"><Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} /></div> :
      <div>
      <div className="menu">
      <MenuFiles unionAllFiles={unionAllFiles} setFileTabClickByTheUser={setFileTabClickByTheUserFunction}></MenuFiles>
      </div>  
     <div className="featureComponent">
     <Feature featureChosenByUser={featureChosenByUser} featureListResultFromServer={featureListResultFromServer} fileTabClickByTheUser={fileTabClickByTheUser} ></Feature>
     </div></div>}
    </div>
  );
}

export default Output;
