import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Statistic, Row, Col,Card, Button, Layout } from 'antd';
import Histogram from 'react-chart-histogram';
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import Plot from 'react-plotly.js';
import {setDataHist } from '../store/actions/output/featuresOutput'



function Genome (props) {
  const dispatch= useDispatch()
  const dataHist = useSelector((state) => state.featureOutput.dataHist);
  const genomeObj = useSelector((state) => state.featureOutput.featuresList);
  const [pieObject,setPieObject]=useState({})



 
  useEffect(() => {
    let nameTypes = Object.keys(genomeObj[props.fileTabClickByTheUser].Genome).filter(key => key.includes("Number of"))
    let nameTypesObject ={}
    nameTypes = nameTypes.map(key=> {
      let tempKey = key
      return nameTypesObject[ key.split(' ')[2]]= genomeObj[props.fileTabClickByTheUser].Genome[tempKey]} )
      setPieObject(nameTypesObject);
  }, [props.fileTabClickByTheUser])
  

    const cardByFeatures=()=>{
      // ADDED for the chagned noa requested
        let fixedfeatureListResultFromServer=[];
        Object.keys(props.featureListResultFromServer).forEach(function(key) {
          if (!key.includes("Number of ") && !key.includes("GC_CONTENT") ){
              fixedfeatureListResultFromServer[key] = props.featureListResultFromServer[key];
          }
      });
      // end of changed down changed from props.featureListResultFromServer[feature] --> fixedfeatureListResultFromServer[feature]
        return Object.keys(fixedfeatureListResultFromServer).map(feature=>{
            return <Col span={6} key={feature}>
                <Card >
            <Statistic title={feature} value={fixedfeatureListResultFromServer[feature]} /> 
            </Card>
          </Col>
        })
    }
const dynamicFeatureHist=()=>{
  return Object.keys(dataHist[props.fileTabClickByTheUser]).map(featureName=>{
    return (    <Plot key={featureName} className='plot'
        data={[
          {
            x: dataHist[props.fileTabClickByTheUser][featureName],
            type: 'histogram',
            mode: 'none',
          },
        ] }
        layout={  { width: 500, height: 400,title: featureName +' Histogram' }} 
      />)
    
    
    
  })
}



  let tempLabels = [] ;
  Object.keys(pieObject).forEach(function(key) {
    tempLabels.push(key+" (" +pieObject[key]+")")
})
  console.log(tempLabels)
  
  return (
<div>
    <Row className="genome-row" gutter={[16, 24]}>
         {cardByFeatures()}
    </Row>
    <Row className="genome-row" >
    <Col >
      <div className='plots-div'>
      <Plot key={'pie'} className='plot'
        data={[
          {
            values: Object.values(pieObject),
            labels: tempLabels, 
            //labels: Object.keys(pieObject),
            type: 'pie',
          },
        ] }
        layout={  { width: 500, height: 400,title: 'Types Of Genome' }} 
      
      />
   { dynamicFeatureHist()}
   </div>
        </Col>
    </Row>

  </div>
  );
}

export default Genome;


