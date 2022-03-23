import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table,  Space, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { CSVLink } from "react-csv";



function Protein (props) {
    const [columns,setColumns]=useState([])
    const [data,setData]=useState([])
    const featureListProtein = useSelector((state) => state.featuresSelection.featuresList.Protein_Features);


    useEffect(() => {
        // const columns =[{title:'Gene ID', key:'Gene ID'}]
        const columns =[{title:'GENE NAME',key:'GENE NAME',dataIndex:'GENE NAME'}]
        let array=[]
        for (const feature of props.featureChosenByUser)
        {
            if(featureListProtein.includes(feature))
                array.push(feature)
        }

        array.map(feature=>{
            columns.push({title:feature, key:feature, dataIndex:feature})})
        setColumns(columns)
        setData(props.featureListResultFromServer)
        console.log(props.featureListResultFromServer);
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
