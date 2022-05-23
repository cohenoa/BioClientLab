import React, { useState, useEffect } from "react";
import { Card, Col, Row, Checkbox , Button, Popover } from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons'
import './input.css';
import Chip from '@mui/material/Chip';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import {setFeaturesListFromServer, submitToServer, setCheckedSelectAll, getFeatureDescription, getTitleFeatureDescription} from '../store/actions/Input/featuresSelection'
import { setCurrentPage } from "../store/actions/pagesRoutes";



function FeaturesSelection (props) {
  const dispatch= useDispatch()
  const featureList = useSelector((state) => state.featuresSelection.featuresList)
  const featureChosenByUser = useSelector((state) => state.featuresSelection.featuresChosenByUser);
  const ifTabDataSelected = useSelector((state) => state.featureOutput.featuresList);
  const checkedCard = useSelector((state) => state.featuresSelection.checkedSelectAll);
  const descriptions = useSelector((state) => state.featuresSelection.featuresDescription);
  const featureDescriptionsTitle = useSelector((state) => state.featuresSelection.featuresTitleDescription);
  const doneUploadFile = useSelector((state) => state.featuresSelection.doneUploadFile);

  const [featuresChooseByUser,setFeaturesChooseByUser]=useState([])
  const [featureListToDisplay,setFeatureListToDisplay]=useState({})
  
  useEffect(() => {
    dispatch(getFeatureDescription())
    dispatch(getTitleFeatureDescription())
    dispatch(setFeaturesListFromServer())
    if(Object.keys(ifTabDataSelected).length >= 1 )
       props.setDisableTabsHeader({...props.disableTabsHeader , 3: true, 1:true})
    
  }, [])

 


  
  useEffect(() => {
    if(featureList)
    {
      let checkboxFeature={};
      Object.keys(featureList).map(type=>{
        checkboxFeature[type] = []
        featureList[type].map(nameFeature=>{
          checkboxFeature[type].push({name:nameFeature, checked:  featureChosenByUser.includes(nameFeature) ? true:false })
          // checkboxFeature[type].push({name:nameFeature, checked:  featureChosenByUser.includes(nameFeature) ? true: type !== 'Genome_Features'? false: true })
        })
      })
      setFeatureListToDisplay(checkboxFeature)
      if(featureChosenByUser.length !== 0)
      {
        setFeaturesChooseByUser([...featureChosenByUser])
        // if(featureChosenByUser.includes(featureList['Genome_Features'][0],featureList['Genome_Features'][1]))
        //     setFeaturesChooseByUser([...featureChosenByUser])
        // else
        //   setFeaturesChooseByUser([...featureList['Genome_Features'],...featureChosenByUser])
      }
    //  else        
    //     setFeaturesChooseByUser(featureList['Genome_Features'])
      }

  }, [featureList])


  const submit=()=>{
    dispatch(setCurrentPage(['3']))
    props.setDisableTabsHeader({...props.disableTabsHeader , 3: false, 1:true})
    props.increaseOrDecreaseNumOfPage(3)
    props.setDisplayInput(false)
    props.setDisplayOutput(true)
    dispatch(submitToServer(props.fileMetaData, props.accessionNumber,featuresChooseByUser ))
  }

   const onChangeCheckbox=(e, nameType)=>{
     let featureListToDisplayTemp = featureListToDisplay
      if(e.target.checked)
        {  
          let flag = featureListToDisplayTemp[nameType].map(feature=>{
            if(feature.checked)
              return true
            return false
          }).filter(feature=> feature === false).length
          if(flag === 1)
          {
            let checkedCardTemp = checkedCard
            checkedCard[nameType]=true
             dispatch(setCheckedSelectAll(checkedCardTemp))
          }
          featureListToDisplayTemp[nameType].map(feature=>{
            if(feature.name === e.target.name)
              feature.checked = true
          })
          let tempArray = [...featuresChooseByUser, e.target.name]
            setFeaturesChooseByUser(tempArray)}
      else{
          featureListToDisplayTemp[nameType].map(feature=>{
            if(feature.name === e.target.name)
            feature.checked = false
          })            
          let tempArray = [...featuresChooseByUser]
            const index = tempArray.indexOf(e.target.name);
            if (index > -1) 
                tempArray.splice(index, 1);
            setFeaturesChooseByUser(tempArray)
            let checkedCardTemp = checkedCard
            checkedCard[nameType]=false
            dispatch(setCheckedSelectAll(checkedCardTemp))
        }
        setFeatureListToDisplay(featureListToDisplayTemp)
        
   }

   const onChangeCheckboxSelectAll=(e, cardName)=>{
     const featureListToDisplayTemp = featureListToDisplay
     featureListToDisplayTemp[cardName].map(feature=>{
      feature.checked = e.target.checked
     })
     let nameFeature = Object.keys(featureListToDisplay[cardName]).map(feature => {return featureListToDisplay[cardName][feature].name })
     let tempArray
     if(e.target.checked){
        nameFeature = nameFeature.filter(feature => !featuresChooseByUser.includes(feature))
        tempArray = [...featuresChooseByUser,...nameFeature]
     }
     else{
      tempArray = [...featuresChooseByUser]
      nameFeature.map(name=>{
            const index = tempArray.indexOf(name);
            if (index > -1) 
                tempArray.splice(index, 1);
      })
     }
     setFeaturesChooseByUser(tempArray)
     setFeatureListToDisplay(featureListToDisplayTemp)
     let checkedCardTemp = checkedCard
     checkedCard[cardName]= e.target.checked
     dispatch(setCheckedSelectAll(checkedCardTemp))
   }

   const featuresCards=()=>{
    let fixedFeatureListToDisplay = []
          // ADDED for the chagned noa requested
          let fixedfeatureListResultFromServer=[];
          Object.keys(featureListToDisplay).forEach(function(key) {
            if (!key.includes("Genome_Features")){
              fixedFeatureListToDisplay[key] = featureListToDisplay[key];
            }
        });
    return Object.keys(fixedFeatureListToDisplay).map((key, index)=> {
      return (
      <Col span={8}  key={key} className="col-features-checkbox">
      <Card key={key} title={<div>{key.replace('_',' ')}<Popover key={key} placement="rightTop" title={key.replace('_',' ')}  content={featureDescriptionsTitle[key]} trigger="click">
          <InfoCircleOutlined />
      </Popover></div> } bordered={true}  className='card' extra={<Checkbox checked={checkedCard[key]} onChange={(e)=>{onChangeCheckboxSelectAll(e,key)}}>Select All</Checkbox>}>
      {fixedFeatureListToDisplay[key].map(oneFeature=>{
        return  <Row key={oneFeature.name}> 
          <Col >
          <Checkbox  checked={oneFeature.checked} key={oneFeature.name} className='features-checkbox' name={oneFeature.name} onChange={(e)=>{onChangeCheckbox(e,key)}}>
          {oneFeature.name}</Checkbox>
          </Col>
          <Col >
          <Popover key={oneFeature} placement="rightTop" title={oneFeature.name}  content={descriptions[oneFeature.name]} trigger="click">
          <InfoCircleOutlined />
      </Popover>
      </Col></Row>})} 
      </Card>
      </Col>
      )
      
    });
   }

   const handleDelete = (chipToDelete) => () => {
    let featureListToDisplayTemp =featureListToDisplay
    Object.keys(featureListToDisplayTemp).map(nameType=>{
      featureListToDisplayTemp[nameType].map(feature=>{
        if(feature.name === chipToDelete)
        feature.checked = false
      })  
    })
    
    setFeaturesChooseByUser((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

   const buildChipsOnFeaturesSelected=()=>{
    return featuresChooseByUser.map((oneFeature, index)=>{
      return (
        <div key={index} className = "chip-feature">
          <Chip
            key={index}
            label={oneFeature}
            onDelete={handleDelete(oneFeature)}
            color="primary"
            variant="outlined"
          />
          </div>
    );}
    )

   }

   const onBack = ()=>{
    dispatch(setCurrentPage(['1']))
    props.increaseOrDecreaseNumOfPage(1)
    props.setDisableTabsHeader({...props.disableTabsHeader , 1: false, 3:true})

   }

  return (
    !doneUploadFile ?   <div className="loading"><Spin  tip="Loading" indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} /></div> :
    <div className='center-page'>
   <div className='cards'> 
   <div className="title">Step 2: Feature Selection</div>
    {featuresChooseByUser && buildChipsOnFeaturesSelected()}
    <Row gutter={16} type='flex'>
    {featuresCards()}
    </Row>
   </div>
   <div className='buttons'>
    <div className='submit-button'>  
          <Button onClick={()=>{submit()}}>Submit</Button>
       </div>
      <div className='back-button'>
        <Button disabled={props.disableTabsHeader[1] && props.disableTabsHeader[3]} onClick={()=>{onBack()}}>Back</Button>
      </div>
</div>
   </div>
  );
}

export default FeaturesSelection;
