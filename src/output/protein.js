import React, { useState, useEffect } from "react";
import {useSelector } from "react-redux";
import { Table,Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { CSVLink } from "react-csv";
import getColumnSearchProps from './search'


function Protein (props) {
    const featureListProtein = useSelector((state) => state.featuresSelection.featuresList.Protein_Features);
    const featureOutputProtein = useSelector((state) => state.featureOutput.featuresList);
    const missingNamesByType = useSelector((state) => state.featureOutput.missingNamesByType);

    const [columns,setColumns]=useState([])
    const [data,setData]=useState([])
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState(0);
    
    useEffect(() => {
        const columns =[{title:'GENE NAME',key:'GENE NAME',dataIndex:'GENE NAME', ...getColumnSearchProps('GENE NAME',searchText,searchedColumn,saveSetSearchText, saveSetSearchedColumn)}]
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

 
      const saveSetSearchText=(value)=>{
        setSearchText(value)
      }
      const saveSetSearchedColumn=(value)=>{
        setSearchedColumn(value)
      }
      const missingNamesByTypeFunction =()=>{
        return missingNamesByType && Object.keys(missingNamesByType[props.fileTabClickByTheUser]).map(type=>{return<h1 key={type}>{type}: {missingNamesByType[props.fileTabClickByTheUser][type]}</h1>}) 
      }
    
   
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
            <h1>Gene name that missing from the data:</h1>
          {missingNamesByTypeFunction()}   
   <Table tableLayout='column.ellipsis' columns={columns}  dataSource={data} scroll={{ x: 240 }} />
  </div>
  );
}

export default Protein;
