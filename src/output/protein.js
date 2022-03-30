import React, { useState, useEffect } from "react";
import {useSelector } from "react-redux";
import { Table,Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { CSVLink } from "react-csv";



function Protein (props) {
    const [columns,setColumns]=useState([])
    const [data,setData]=useState([])
    const featureListProtein = useSelector((state) => state.featuresSelection.featuresList.Protein_Features);
    const featureOutputProtein = useSelector((state) => state.featureOutput.featuresList);
    
    useEffect(() => {
        const columns =[{title:'GENE NAME',key:'GENE NAME',dataIndex:'GENE NAME'}]
        let array=[]
        for (const feature of props.featureChosenByUser)
        {
            if(featureListProtein.includes(feature))
                array.push(feature)
        }
        array.map(feature=>{
          if(typeof(featureOutputProtein[props.fileTabClickByTheUser]["Protein"][0][feature]) === "number"){
            columns.push({title:feature, key:feature, dataIndex:feature,sorter: (a, b) => a[feature] - b[feature]})
          }
          else{
            columns.push({title:feature, key:feature, dataIndex:feature})
          }
            })
        setColumns(columns)
        setData(props.featureListResultFromServer)
      }, [props.featureListResultFromServer])

 
    
   
  return (
    <div>
         <div  className="csv-bottom">
         <CSVLink
              filename={"Protein data.csv"}
              data={data}
            >
              <Button
                className='download-bottom'
            >
                Download to csv
                <DownloadOutlined />
            </Button>
            </CSVLink>
            </div>
   <Table tableLayout='column.ellipsis' columns={columns}  dataSource={data} scroll={{ x: 240 }} />
  </div>
  );
}

export default Protein;
