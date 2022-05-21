import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Statistic, Row, Col,Card, Popover, Table} from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons'
import Plot from 'react-plotly.js';




function Genome (props) {
  const dispatch= useDispatch()
  const dataHist = useSelector((state) => state.featureOutput.dataHist);
  const dataStatisticHist = useSelector((state) => state.featureOutput.statisticHist);
  const genomeObj = useSelector((state) => state.featureOutput.featuresList);
  const title_X_Y = useSelector((state) => state.featureOutput.numericFeatureTitleXY);

  const [pieObject,setPieObject]=useState({})
  const [columnsStatistic,setColumnsStatistic]=useState([{title:'Feature Name',key:'name',dataIndex:'name'},{title:'Mean',key:'mean',dataIndex:'mean'},{title:'Standard deviation',key:'std',dataIndex:'std'}])
  const [data,setData]=useState([])


  useEffect(() => {
   if(!!dataStatisticHist){
    setData(dataStatisticHist[props.fileTabClickByTheUser])
   }
  }, [dataStatisticHist])

  useEffect(() => {
    let nameTypes = Object.keys(genomeObj[props.fileTabClickByTheUser].Genome).filter(key => key.includes("Number of"))
    let nameTypesObject ={}
    nameTypes = nameTypes.map(key=> {
      let tempKey = key
      return nameTypesObject[ key.split(' ')[2]]= genomeObj[props.fileTabClickByTheUser].Genome[tempKey]} )
      setPieObject(nameTypesObject);
  }, [props.fileTabClickByTheUser])
  

    const cardByFeatures=()=>{
        let fixedfeatureListResultFromServer=[];
        Object.keys(props.featureListResultFromServer).forEach(function(key) {
          if (!key.includes("Number of ") && !key.includes("GC_CONTENT") ){
              fixedfeatureListResultFromServer[key] = props.featureListResultFromServer[key];
          }
      });
        return Object.keys(fixedfeatureListResultFromServer).map(feature=>{
            return <Col span={6} key={feature}>
                <Card >
            <Statistic title={<div>{feature}<Popover key={feature} placement="rightTop" title={feature + " Description"}  content={""} trigger="click">
          <InfoCircleOutlined />
      </Popover></div> } value={fixedfeatureListResultFromServer[feature]} /> 
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
        //before dor changed layout={  { width: 500, height: 400,title: featureName +' Histogram', xaxis: {
        layout={  { width: 500, height: 400,title: featureName +' Histogram',margin:{b:30} , xaxis: {
          title: {
            text: title_X_Y[featureName]["x"],
            font: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#7f7f7f'
            }
          },
        },
        yaxis: {
          title: {
            text:  title_X_Y[featureName]["y"],
            font: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#7f7f7f'
            }
          }
        }}} 
      />)
    
    
    
  })
}



  let tempLabels = [] ;
  Object.keys(pieObject).forEach(function(key) {
    tempLabels.push(key+" (" +pieObject[key]+")")
})  
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
            type: 'pie',
          },
        ] }
        layout={  { width: 500, height: 400,title: 'Types of gene' ,margin:{b:9} }} 
        //before dor changed layout={  { width: 500, height: 400,title: 'Types of gene' }} 

      />
   { dynamicFeatureHist()}
   </div>
        </Col>
    </Row>
    <Table   tableLayout='column.ellipsis' columns={columnsStatistic}  dataSource={data} scroll={{ X: 240 }} />

  </div>
  );
}

export default Genome;


