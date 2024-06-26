import React, { useState} from "react";
import { useSelector } from "react-redux";
import { Tabs } from 'antd';
import Genome from "./genome";
import Gene from "./gene";
import Protein from "./protein";
import General from "./general";


function Feature (props) {
    const { TabPane } = Tabs;
    const featureListResult = useSelector((state) => state.featureOutput.featuresList);
    const [tabMapName,setTabMapName]=useState({
        'Genome':'Analysis and Visualization',
        'Gene':'Gene Features Table',
        'Protein':'Protein Features Table',
        //TODO: 'GENE MOTIF' and 'Protein motif'
        // removed by union the gene and general
        //'General':'General Features Table'
    })

    

    const componentByTab=(tabName)=>{
        switch (tabName) {
            case 'Genome':
                return  <Genome  featureChosenByUser={props.featureChosenByUser} fileTabClickByTheUser={props.fileTabClickByTheUser} featureListResultFromServer={props.featureListResultFromServer[props.fileTabClickByTheUser][tabName]}></Genome>        
            case 'Gene':
                return <Gene saveDataToCsv={props.saveDataToCsv} fileTabClickByTheUser={props.fileTabClickByTheUser} featureChosenByUser={props.featureChosenByUser} featureListResultFromServer={props.featureListResultFromServer[props.fileTabClickByTheUser][tabName]}></Gene>
            case "Protein":
                return <Protein featureChosenByUser={props.featureChosenByUser} fileTabClickByTheUser={props.fileTabClickByTheUser} featureListResultFromServer={props.featureListResultFromServer[props.fileTabClickByTheUser][tabName]}></Protein>
            // case "General":
            //     return <General featureChosenByUser={props.featureChosenByUser}filterObj ={props.filterObj} fileTabClickByTheUser={props.fileTabClickByTheUser} featureListResultFromServer={props.featureListResultFromServer[props.fileTabClickByTheUser][tabName]}></General>
            default:
                break;
        }
    }
    const displayFeatureChosenByUserTabs=()=>{ 
        return Object.keys(props.featureListResultFromServer[props.fileTabClickByTheUser]).map(tabName=>{
            return <TabPane tab={tabMapName[tabName]} key={tabName} >
                           <div className='tabs'>
                   {componentByTab(tabName)}
                   </div>
            </TabPane>
        })
    }
  
    
  return (
    <div >
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
