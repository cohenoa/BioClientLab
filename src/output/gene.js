import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Table } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Button} from "antd";
import { CSVLink } from "react-csv";
import getColumnSearchProps from './search'


function Gene (props) {
    const [columns,setColumns]=useState([])
    const [data,setData]=useState([])
    const featureListGene = useSelector((state) => state.featuresSelection.featuresList.Gene_Features);
    const featureOutputGene = useSelector((state) => state.featureOutput.featuresList);
    
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState(0);


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
        // props.saveDataToCsv(props.featureListResultFromServer)
      }, [props.featureListResultFromServer])

      const saveSetSearchText=(value)=>{
        setSearchText(value)
      }
      const saveSetSearchedColumn=(value)=>{
        setSearchedColumn(value)
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
   <Table  tableLayout='column.ellipsis' columns={columns}  dataSource={data} scroll={{ X: 240 }}/>
  </div>
  );
}

export default Gene;
