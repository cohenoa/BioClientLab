import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Statistic, Row, Col,Card, Button } from 'antd';
import Histogram from 'react-chart-histogram';
import {setDataGcContent } from '../store/actions/output/featuresOutput'


function Genome (props) {
  const dispatch= useDispatch()
  const gcContent = useSelector((state) => state.featureOutput.dataGcContent);
  const [data,setData]=useState([])
  const [labels,setLabels]=useState([])



  useEffect(() => {
    setData(gcContent)
    let arrayLabels=[]
    let index =0
    while(index <= gcContent.length)
    {
      arrayLabels.push(index)
      index += 1000
    }
    setLabels(arrayLabels)
  }, [gcContent])

  useEffect(() => {
    dispatch(setDataGcContent(props.fileTabClickByTheUser))

    
  }, [props.fileTabClickByTheUser])
    
    const cardByFeatures=()=>{
        return Object.keys(props.featureListResultFromServer).map(feature=>{
            return <Col span={6} key={feature}>
                <Card >
            <Statistic title={feature} value={props.featureListResultFromServer[feature]} />
            </Card>
          </Col>
        })
    }
  return (
<div>
    <Row className="genome-row" gutter={[16, 24]}>
         {cardByFeatures()}
    </Row>
    <Row className="genome-row" gutter={[16, 24]}>
    <Col span={12} >
                <Card >
          <h5>GC CONTENT Histogram</h5>
    <Histogram
          xLabels={labels}
          yValues={data}
          width='400'
          height='200'
      />
        </Card>
        </Col>
    </Row>

  </div>
  );
}

export default Genome;
