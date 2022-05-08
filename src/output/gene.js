import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Table } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Button} from "antd";
import { CSVLink } from "react-csv";
import getColumnSearchProps from './search'


function Gene (props) {
    const featureListGene = useSelector((state) => state.featuresSelection.featuresList.Gene_Features);
    const featureOutputGene = useSelector((state) => state.featureOutput.featuresList);
    const missingNamesByType = useSelector((state) => state.featureOutput.missingNamesByType);

    
    const [columns,setColumns]=useState([])
    const [data,setData]=useState([])
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState(0);
    const [countChangeData,setCountChangeData]=useState(false)


    useEffect(() => {
        const columns =[{title:'GENE NAME',key:'GENE NAME',dataIndex:'GENE NAME',...getColumnSearchProps('GENE NAME',searchText,searchedColumn,saveSetSearchText, saveSetSearchedColumn),
      }]
        let array=[]
        for (const feature of props.featureChosenByUser)
        {
            if(featureListGene.includes(feature))
                array.push(feature)
        }
        array.map(feature=>{
          if(typeof(featureOutputGene[props.fileTabClickByTheUser]["Gene"][0][feature]) === "number"){
            columns.push({title:feature, key:feature, dataIndex:feature,sorter: (a, b) => a[feature] - b[feature]})
          }
          else if (feature ==="GENE NAME"){

          }
          else{
            columns.push({title:feature, key:feature, dataIndex:feature})
          }
            })
        setColumns(columns)
        setData(props.featureListResultFromServer)
      }, [props.featureListResultFromServer])


    useEffect(() => {
      if(data.length && !countChangeData)
      {
        let copyData = [...data]
        copyData.forEach(dict=>{dict['GC CONTENT'] = dict['GC CONTENT'].toFixed(2) + "%"})
        setData(copyData)
        setCountChangeData(true)
      }
    }, [data, countChangeData])

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
              filename={"Gene data.csv"}
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
<Table  tableLayout='column.ellipsis' columns={columns}  dataSource={data} scroll={{ X: 240 }}/>
  </div>
  );
}

export default Gene;
