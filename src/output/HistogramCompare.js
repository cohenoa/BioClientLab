import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Radio } from 'antd';
import { Row, Col } from 'antd';
import Plot from 'react-plotly.js';



function HistogramCompare (props) {
    const { TabPane } = Tabs;
    const dataHist = useSelector((state) => state.featureOutput.dataHist);

    
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
              layout={  { width: 550, height: 500,title: featureName +' Histogram' }} 
            
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

  </div>
  );
}

export default HistogramCompare;
