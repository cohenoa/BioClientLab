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
  const [data,setData]=useState([])
  const [labels,setLabels]=useState([])
  const [dataToHistogram,setDataToHistogram]=useState()



  useEffect(() => {
    setData(dataHist)
    let arrayLabels=[]
    let index =0
    while(index <= dataHist.length)
    {
      arrayLabels.push(index)
      index += 100
    }
    setLabels(arrayLabels)
  }, [dataHist])

  useEffect(() => {
    dispatch(setDataHist(props.fileTabClickByTheUser,props.featureChosenByUser))
  }, [props.fileTabClickByTheUser])
    
  useEffect(() => {
    // console.log(data);
    if(data)
    {
        const dataToDisplay = {
          labels: ['0','10%','20%','30%','40%','50%','60%','70%','80%','90%','100%'],
          datasets: [
            {
              label: 'Rainfall',
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: data
            }
          ]
        }
        setDataToHistogram(dataToDisplay)
      }
  }, [data])

    const cardByFeatures=()=>{
        return Object.keys(props.featureListResultFromServer).map(feature=>{
            return <Col span={6} key={feature}>
                <Card >
            <Statistic title={feature} value={props.featureListResultFromServer[feature]} />
            </Card>
          </Col>
        })
    }
const dynamicFeatureHist=()=>{
  return Object.keys(dataHist).map(featureName=>{
    return (    <Plot key={featureName} className='plot'
        data={[
          {
            x: dataHist[featureName],
            type: 'histogram',
            mode: 'none',
          },
        ] }
        layout={  { width: 500, height: 400,title: featureName +' Histogram'}} 
      
      />)
    
    
    
  })
}




  return (
<div>
    <Row className="genome-row" gutter={[16, 24]}>
         {cardByFeatures()}
    </Row>
    <Row className="genome-row" >
    <Col >
      <div className='plots-div'>
   { dynamicFeatureHist()}
   </div>
        </Col>
    </Row>

  </div>
  );
}

export default Genome;


