import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Statistic, Row, Col,Card, Button, Layout } from 'antd';
import Histogram from 'react-chart-histogram';
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import Plot from 'react-plotly.js';
import {setDataGcContent } from '../store/actions/output/featuresOutput'



function Genome (props) {
  const dispatch= useDispatch()
  const gcContent = useSelector((state) => state.featureOutput.dataGcContent);
  const [data,setData]=useState([])
  const [labels,setLabels]=useState([])
  const [dataToHistogram,setDataToHistogram]=useState()



  useEffect(() => {
    setData(gcContent)
    let arrayLabels=[]
    let index =0
    while(index <= gcContent.length)
    {
      arrayLabels.push(index)
      index += 100
    }
    setLabels(arrayLabels)
  }, [gcContent])

  useEffect(() => {
    dispatch(setDataGcContent(props.fileTabClickByTheUser))
  }, [props.fileTabClickByTheUser])
    
  useEffect(() => {
    console.log(data);
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
  return (
<div>
    <Row className="genome-row" gutter={[16, 24]}>
         {cardByFeatures()}
    </Row>
    <Row className="genome-row" gutter={[16, 24]}>
    <Col span={12} >
          <Plot
        data={[
          {
            x: data,
            type: 'histogram',
            mode: 'none',
          },
          {type: 'histogram', x: data, name: 'gc', visible:false},
          
        ] }
        layout={  {title: 'GC CONTENT Histogram'}} 
      
      />
    {/* <Histogram
          xLabels={data}
          yValues={labels}
          width='400'
          height='200'
      /> */}
        {/* {data.length && <Bar
          data={dataToHistogram}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />} */}
        {/* </Card> */}
        </Col>
    </Row>

  </div>
  );
}

export default Genome;


