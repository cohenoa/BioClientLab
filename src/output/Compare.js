import React, { useState} from "react";
//import { useDispatch, useSelector } from "react-redux";
import { Tabs } from 'antd';
import HistogramCompare from "./HistogramCompare";


function Compare (props) {
    const { TabPane } = Tabs;
    // const [tabsName,setTabsName]=useState(['Histogram comparison'])
    const [tabsName,setTabsName]=useState(['Comparison analysis results'])



    const componentByTab=(tabName)=>{
      switch (tabName) {
          //case 'Histogram comparison':
          case 'Comparison analysis results':
              return <HistogramCompare></HistogramCompare>
          default:
              break;
      }
  }

    const displayFeatureChosenByUserTabs=()=>{ 
      return tabsName.map(tabName=>{
          return <TabPane tab={tabName} key={tabName} >
                         <div className='tabs'>
                 {componentByTab(tabName)}
                 </div>
          </TabPane>
      })
  }

   
  return (
    <div>
       {/* <Tabs defaultActiveKey="Histogram comparison" type="card" size="large"> */}
       <Tabs defaultActiveKey=" Comparison analysis results" type="card" size="large">
       {displayFeatureChosenByUserTabs()}
       </Tabs>

  </div>
  );
}

export default Compare;
