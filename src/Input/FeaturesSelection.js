import React, { useState, useEffect } from "react";
import { Card, Col, Row, Checkbox , Button, Popover } from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons'
import './input.css';
import Chip from '@mui/material/Chip';
import { useDispatch, useSelector } from "react-redux";
import {setFeaturesListFromServer, submitToServer, setCheckedSelectAll, getFeatureDescription} from '../store/actions/Input/featuresSelection'
import { setCurrentPage } from "../store/actions/pagesRoutes";



function FeaturesSelection (props) {
  const dispatch= useDispatch()
  const featureList = useSelector((state) => state.featuresSelection.featuresList)
  const featureChosenByUser = useSelector((state) => state.featuresSelection.featuresChosenByUser);
  const ifTabDataSelected = useSelector((state) => state.featureOutput.featuresList);
  const checkedCard = useSelector((state) => state.featuresSelection.checkedSelectAll);
  const descriptions = useSelector((state) => state.featuresSelection.featuresDescription);

  const [featuresChooseByUser,setFeaturesChooseByUser]=useState([])
  const [featureListToDisplay,setFeatureListToDisplay]=useState({})
  // const [checkedCard,setCheckedCard]=useState({})
  
  useEffect(() => {
    dispatch(getFeatureDescription())
    dispatch(setFeaturesListFromServer())
    if(Object.keys(ifTabDataSelected).length >= 1 )
       props.setDisableTabsHeader({...props.disableTabsHeader , 3: true, 1:true})
    
  }, [])

 


  
  useEffect(() => {
    if(featureList)
    {
      let checkboxFeature={};
      // let checkCardSelectAll ={}
      Object.keys(featureList).map(type=>{
        // heckCardSelectAll[type] = type !== 'Genome_Features'? false: true
        checkboxFeature[type] = []
        featureList[type].map(nameFeature=>{
          checkboxFeature[type].push({name:nameFeature, checked:  featureChosenByUser.includes(nameFeature) ? true: type !== 'Genome_Features'? false: true })
        })
      })
      // dispatch(setCheckedSelectAll(checkCardSelectAll))
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
     checkedCard[cardName]=e.target.checked
     dispatch(setCheckedSelectAll(checkedCardTemp))
   }

   const featuresCards=()=>{
    return Object.keys(featureListToDisplay).map((key, index)=> {
      return (
      <Col span={8}  key={key} className="col-features-checkbox">
      <Card title={key.replace('_',' ') } bordered={true}  className='card' extra={<Checkbox checked={checkedCard[key]} onChange={(e)=>{onChangeCheckboxSelectAll(e,key)}}>Select All</Checkbox>}>
      {featureListToDisplay[key].map(oneFeature=>{
        return  <Row> 
          <Col >
          <Checkbox  checked={oneFeature.checked} key={oneFeature.name} className='features-checkbox' name={oneFeature.name} onChange={(e)=>{onChangeCheckbox(e,key)}}>
          {oneFeature.name}</Checkbox>
          </Col>
          <Col >
          <Popover placement="rightTop" title={oneFeature.name}  content={descriptions[oneFeature.name]} trigger="click">
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
