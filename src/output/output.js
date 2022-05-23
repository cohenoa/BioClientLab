import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './output.css';
import {setFeaturesOutput, setDataHist, getNumericFeatureTitleXY, setStatisticHist} from '../store/actions/output/featuresOutput'
import MenuFiles from './menu'
import Feature from './feature'
import Compare from './Compare'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function Output (props) {
  const dispatch= useDispatch()
  const featureListResult = useSelector((state) => state.featureOutput.featuresList);
  const featureChosenByUser = useSelector((state) => state.featuresSelection.featuresChosenByUser);
  const dataHist = useSelector((state) => state.featureOutput.dataHist);
  const namesByProductType = useSelector((state) => state.featureOutput.NamesByProductType);

  const [filterObj, setFilterObj]=useState([])
  const [featureListResultFromServer,setFeatureListResultFromServer]=useState()
  const [fileTabClickByTheUser,setFileTabClickByTheUser]=useState()
  const [featureChosenByUserToChild,setFeatureChosenByUserToChild]=useState([])
  const[isLoading, setIsLoading] = useState(false);
  const [unionAllFiles,setUnionAllFiles]=useState([])
  const [typeFileClicked,setTypeFileClicked]=useState('file')

  useEffect(() => {
    dispatch(getNumericFeatureTitleXY())
    props.setDisableTabsHeader({...props.disableTabsHeader , 1: true})
  setUnionAllFiles(props.listOfCombinedFiles)
  
  }, [])
  

  useEffect(() => {
    if(!!dataHist)
      dispatch(setStatisticHist(unionAllFiles,featureChosenByUser))
  }, [dataHist])

  useEffect(() => {
    if(!!unionAllFiles)
      setFileTabClickByTheUser(unionAllFiles[0])
  }, [unionAllFiles])

  useEffect(() => {
    if(Object.keys(featureListResult).length)
        setIsLoading(true)
    else
       setIsLoading(false)
    
  }, [featureListResult])

  useEffect(() => {
    if (unionAllFiles.length !== 0 ){
      setFeatureChosenByUserToChild(featureChosenByUser)
      dispatch(setFeaturesOutput(featureChosenByUser, unionAllFiles))
      dispatch(setDataHist(unionAllFiles,featureChosenByUser))
    }
    
  }, [featureChosenByUser, unionAllFiles])
  useEffect(() => {
    if(Object.keys(namesByProductType).length !== 0 && !!fileTabClickByTheUser &&Object.keys(namesByProductType).includes(fileTabClickByTheUser) ){
      NamesByProductTypeFunction()
    }
   }, [namesByProductType, fileTabClickByTheUser])

  useEffect(() => {
    setFeatureListResultFromServer(featureListResult)
    props.setIsLoading(false)

    
  }, [featureListResult])

  const setFileTabClickByTheUserFunction=(file, type)=>{
    setFileTabClickByTheUser(file)
    setTypeFileClicked(type)
  }

  const NamesByProductTypeFunction =()=>{
    let temp = []
    console.log("namesByProductType",namesByProductType);
    console.log("fileTabClickByTheUser",fileTabClickByTheUser);

    Object.keys(namesByProductType[fileTabClickByTheUser]).map(type=>
    temp.push({text:namesByProductType[fileTabClickByTheUser][type],value :namesByProductType[fileTabClickByTheUser][type]}));
    setFilterObj(temp);
  }
  

  return (
    <div className="outputScreen">
      {!isLoading ? 
      <div className="loading"><Spin tip="Loading" indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} /></div> :
      <div>
      <div className="menu">
      <MenuFiles unionAllFiles={unionAllFiles} setFileTabClickByTheUser={setFileTabClickByTheUserFunction}></MenuFiles>
      </div>  
      
     <div className="featureComponent">
     {typeFileClicked === 'file' ?<Feature  featureChosenByUser={featureChosenByUser} featureListResultFromServer={featureListResultFromServer} fileTabClickByTheUser={fileTabClickByTheUser} filterObj={filterObj}  ></Feature>
     :
     <Compare></Compare>}
     </div>
     </div>}
    </div>
  );
}

export default Output;
