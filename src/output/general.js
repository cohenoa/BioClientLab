import React, { useState, useEffect } from "react";
import {useSelector} from "react-redux";
import { Table, Button} from 'antd';
import { CSVLink } from "react-csv";
import { DownloadOutlined } from '@ant-design/icons';
import getColumnSearchProps from './search'



function General (props) {
    const featureListGene = useSelector((state) => state.featuresSelection.featuresList.General_Features);
    const featureOutputGeneral = useSelector((state) => state.featureOutput.featuresList);
    const missingNamesByType = useSelector((state) => state.featureOutput.missingNamesByType);

    const [columns,setColumns]=useState([])
    const [data,setData]=useState([])
    const [filterObj, setFilterObj]=useState([{text:'CDS',value:'CDS'},
                                                {text:'tRNA',value:'tRNA'},
                                                {text:'mRNA',value:'mRNA'},
                                                {text:'rRNA',value:'rRNA'},
                                                {text:'regulatory',value:'regulatory'}])
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState(0);
    



    useEffect(() => {
        const columns =[{title:'GENE NAME',key:'GENE NAME',dataIndex:'GENE NAME', ...getColumnSearchProps('GENE NAME',searchText,searchedColumn,saveSetSearchText, saveSetSearchedColumn)}]
        let array=[]
        for (const feature of props.featureChosenByUser)
        {
            if(feature !== 'GENE NAME')
                if(featureListGene.includes(feature))
                    array.push(feature)
        }

        array.map(feature=>{
          if(typeof(featureOutputGeneral[props.fileTabClickByTheUser]["General"][0][feature]) === "number"){
            columns.push({title:feature, key:feature, dataIndex:feature,sorter: (a, b) => a[feature] - b[feature]})
          }
          else if (feature === "PRODUCT TYPE"){
            columns.push({title:feature, key:feature, dataIndex:feature,filters:filterObj, onFilter: (value, record) => record[feature].indexOf(value) === 0,
            })
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
        return Object.keys(missingNamesByType[props.fileTabClickByTheUser]).map(type=>{return<h1 key={type}>{type}: {missingNamesByType[props.fileTabClickByTheUser][type]}</h1>}) 
      }
    

  return (
    <div>
        <div  className="csv-bottom">
         <CSVLink 
              filename={"General data.csv"}
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
   <Table tableLayout='column.ellipsis' columns={columns}  dataSource={data} scroll={{ X: 240 }} />
  </div>
  );
}

export default General;
