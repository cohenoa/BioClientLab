import React, { useState, useEffect } from "react";
import { Card, Col, Row, Checkbox , Button} from 'antd';
import axios from  'axios';
import './input.css';
import Chip from '@mui/material/Chip';
import { useDispatch, useSelector } from "react-redux";
import {setFeaturesListFromServer, submitToServer} from '../store/actions/Input/featuresSelection'
import { setCurrentPage } from "../store/actions/pagesRoutes";



function FeaturesSelection (props) {
  const dispatch= useDispatch()
  const featureList = useSelector((state) => state.featuresSelection.featuresList)
  const featureChosenByUser = useSelector((state) => state.featuresSelection.featuresChosenByUser);
  const ifTabDataSelected = useSelector((state) => state.featureOutput.featuresList);

  const [featuresChooseByUser,setFeaturesChooseByUser]=useState([])
  const [featureListToDisplay,setFeatureListToDisplay]=useState({})
  
  useEffect(() => {
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
          checkboxFeature[type].push({name:nameFeature, checked:  featureChosenByUser.includes(nameFeature) ? true: type !== 'Genome_Features'? false: true })
        })
      })
      setFeatureListToDisplay(checkboxFeature)
      if(featureChosenByUser.length !== 0)
        setFeaturesChooseByUser([...featureList['Genome_Features'],...featureChosenByUser])
    else        
    setFeaturesChooseByUser(featureList['Genome_Features'])

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
     let featureListToDisplayTemp =featureListToDisplay

       if(e.target.checked)
        {  
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
        }
        setFeatureListToDisplay(featureListToDisplayTemp)
   }

   const featuresCards=()=>{
    return Object.keys(featureListToDisplay).map((key, index)=> {
      return (
      <Col span={8}  key={key} className="col-features-checkbox">
      <Card title={key.replace('_',' ')} bordered={true}  className='card'>
      <Row gutter={[8, 8]}>
      <Col span={10}>
      {featureListToDisplay[key].map(oneFeature=>{
        return  <Checkbox  checked={oneFeature.checked} key={oneFeature.name} className='features-checkbox' name={oneFeature.name} onChange={(e)=>{onChangeCheckbox(e,key)}}>{oneFeature.name}</Checkbox>})} 
       </Col>
      </Row>
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

   const buildChipsOnfeaturesDelected=()=>{
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
    <div className='center-page'>
   <div className='cards'> 
   <div className="title">Features Selection</div>
    {featuresChooseByUser && buildChipsOnfeaturesDelected()}
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
