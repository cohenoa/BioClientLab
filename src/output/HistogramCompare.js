import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Radio, Table } from 'antd';
import { Row, Col } from 'antd';
import Plot from 'react-plotly.js';



function HistogramCompare (props) {
    const { TabPane } = Tabs;
    const dataHist = useSelector((state) => state.featureOutput.dataHist);
    const title_X_Y = useSelector((state) => state.featureOutput.numericFeatureTitleXY);
    const dataStatisticHist = useSelector((state) => state.featureOutput.statisticHist);

    const [columnsStatistic,setColumnsStatistic]=useState([{title:'Feature Name',key:'name',dataIndex:'name'},{title:'Mean',key:'mean',dataIndex:'mean'},{title:'Std',key:'std',dataIndex:'std'}])
    const [data,setData]=useState({})

  useEffect(() => {
    if(!!dataStatisticHist){
     setData(dataStatisticHist)
    }
   }, [dataStatisticHist])

    const buildData = (fileList, featureName)=>{
        let dynamicDataByFeature = []
        for(const file of fileList)
        {
            let objDataByFile={
                x: dataHist[file][featureName],
                type: 'histogram',
                mode: 'none',
                name: file,
            }
            dynamicDataByFeature.push(objDataByFile)
        }
        return dynamicDataByFeature

    }

    const dynamicFeatureHist=()=>{
        return Object.keys(dataHist[Object.keys(dataHist)[0]]).map(featureName=>{
          return (    <Plot key={featureName} className='plot'
              data={buildData(Object.keys(dataHist), featureName)}
              layout={  { width: 550, height: 500,title: featureName +' Histogram', xaxis: {
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
              } }} 
            
            />)
        
          
        })
      }

  return (
    <div>
    
    <Row className="genome-row" >
    <Col >
      <div className='plots-div'>
   { dynamicFeatureHist()}
   </div>
        </Col>
    </Row>
    {
      !!dataStatisticHist && Object.keys(dataStatisticHist).map(fileName=>{return  <div>  <h1>{fileName}</h1> 
         <Table  key={fileName} tableLayout='column.ellipsis' columns={columnsStatistic}  dataSource={data[fileName]} scroll={{ X: 240 }} />

         </div>
    })

    }

  </div>
  );
}

export default HistogramCompare;
