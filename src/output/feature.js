import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Radio } from 'antd';
import Genome from "./genome";
import Gene from "./gene";
import Protein from "./protein";
import General from "./general";


function Feature (props) {
    const { TabPane } = Tabs;
    const featureListResult = useSelector((state) => state.featureOutput.featuresList);
    
   

    const componentByTab=(tabName)=>{
        switch (tabName) {
            case 'Genome':
                return  <Genome fileTabClickByTheUser={props.fileTabClickByTheUser} featureListResultFromServer={props.featureListResultFromServer[props.fileTabClickByTheUser][tabName]}></Genome>        
            case 'Gene':
                return <Gene featureChosenByUser={props.featureChosenByUser} featureListResultFromServer={props.featureListResultFromServer[props.fileTabClickByTheUser][tabName]}></Gene>
            case "Protein":
                return <Protein featureChosenByUser={props.featureChosenByUser} featureListResultFromServer={props.featureListResultFromServer[props.fileTabClickByTheUser][tabName]}></Protein>
            case "General":
                return <General featureChosenByUser={props.featureChosenByUser} featureListResultFromServer={props.featureListResultFromServer[props.fileTabClickByTheUser][tabName]}></General>
            default:
                break;
        }
    }
    const displayFeatureChosenByUserTabs=()=>{ 
        // console.log(props.featureListResultFromServer[props.fileTabClickByTheUser]);       
        return Object.keys(props.featureListResultFromServer[props.fileTabClickByTheUser]).map(tabName=>{
            return <TabPane tab={tabName} key={tabName} >
                   {componentByTab(tabName)}
            </TabPane>
        })
    }
  
    
  return (
    <div>
        {
        props.fileTabClickByTheUser && props.featureListResultFromServer&&
    <Tabs defaultActiveKey="Genome" type="card" size="large">
      {displayFeatureChosenByUserTabs()}
    </Tabs>
}
  </div>
  );
}

export default Feature;