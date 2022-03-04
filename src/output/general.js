import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table,  Space  } from 'antd';
import { CSVLink } from "react-csv";
import { DownloadOutlined } from '@ant-design/icons';



function General (props) {
    const [columns,setColumns]=useState([])
    const [data,setData]=useState([])
    const featureListGene = useSelector((state) => state.featuresSelection.featuresList.General_Features);


    useEffect(() => {
        // const columns =[{title:'Gene ID', key:'Gene ID'}]
        const columns =[{title:'GENE NAME',key:'GENE NAME',dataIndex:'GENE NAME'}]
        let array=[]
        for (const feature of props.featureChosenByUser)
        {
            if(feature != 'GENE NAME')
                if(featureListGene.includes(feature))
                    array.push(feature)
        }

        array.map(feature=>{
            columns.push({title:feature, key:feature, dataIndex:feature})})
        setColumns(columns)
        setData(props.featureListResultFromServer)
       
      }, [props.featureListResultFromServer])

    
   
  return (
    <div>
        <div  className="download-bottom">
         <CSVLink
              filename={"General data.csv"}
              data={data}
            >
              Download to csv
              <DownloadOutlined />
            </CSVLink>
            </div>
   <Table columns={columns}  dataSource={data} scroll={{ X: 240 }} />
  </div>
  );
}

export default General;
