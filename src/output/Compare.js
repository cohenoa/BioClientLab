import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Radio } from 'antd';
import HistogramCompare from "./HistogramCompare";


function Compare (props) {
    const { TabPane } = Tabs;
    const [tabsName,setTabsName]=useState(['Histogram comparison'])
    


    const componentByTab=(tabName)=>{
      switch (tabName) {
          case 'Histogram comparison':
              return <HistogramCompare></HistogramCompare>
          default:
              break;
      }
  }

    const displayFeatureChosenByUserTabs=()=>{ 
      // console.log(props.featureListResultFromServer,props.fileTabClickByTheUser);       
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
       <Tabs defaultActiveKey="Histogram comparison" type="card" size="large">
       {displayFeatureChosenByUserTabs()}
       </Tabs>

  </div>
  );
}

export default Compare;
