import React, { useState, useEffect } from "react";
import {useSelector} from "react-redux";
import { Table, Button, Card} from 'antd';
import { CSVLink } from "react-csv";
import { DownloadOutlined } from '@ant-design/icons';
import getColumnSearchProps from './search'



function General (props) {
    const featureListGene = useSelector((state) => state.featuresSelection.featuresList.Gene_Features);
    const featureOutputGeneral = useSelector((state) => state.featureOutput.featuresList);
    const missingNamesByType = useSelector((state) => state.featureOutput.missingNamesByType);
    //const namesByProductType = useSelector((state) => state.featureOutput.NamesByProductType);

    const [columns,setColumns]=useState([])
    const [data,setData]=useState([])
    // const [filterObj, setFilterObj]=useState([  {text:'CDS',value:'CDS'},
    //                                             {text:'tRNA',value:'tRNA'},
    //                                             {text:'mRNA',value:'mRNA'},
    //                                             {text:'rRNA',value:'rRNA'},
    //                                             {text:'misc_RNA',value:'misc_RNA'},
    //                                             {text:'regulatory',value:'regulatory'}
    //                                           ])


    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState(0);
    


                                                
    useEffect(() => {

        const columns =[{title:'GENE NAME', align: 'center', key:'GENE NAME',dataIndex:'GENE NAME', ...getColumnSearchProps('GENE NAME',searchText,searchedColumn,saveSetSearchText, saveSetSearchedColumn)},{title:'PRODUCT DESCRIPTION', align: 'center', key:'PRODUCT DESCRIPTION',dataIndex:'PRODUCT DESCRIPTION',...getColumnSearchProps('PRODUCT DESCRIPTION',searchText,searchedColumn,saveSetSearchText, saveSetSearchedColumn)}]
        let array=[]
        for (const feature of props.featureChosenByUser)
        {
            if(feature !== 'GENE NAME' && feature !== 'PRODUCT DESCRIPTION' ){
              if(featureListGene.includes(feature)){
                array.push(feature)
              }
            }
              
        }

        array.map(feature=>{
          if(typeof(featureOutputGeneral[props.fileTabClickByTheUser]["General"][0][feature]) === "number"){
            columns.push({title:feature,align: 'center', key:feature, dataIndex:feature,sorter: (a, b) => a[feature] - b[feature]})
          }
          // on this row there a err when fillter
          else if (feature === "PRODUCT TYPE"){
            columns.push({title:feature, key:feature,align: 'center', dataIndex:feature,filters:props.filterObj, onFilter: (value, record) => record[feature].indexOf(value) === 0,
            })
          }
          else{
            columns.push({title:feature,align: 'center', key:feature, dataIndex:feature})
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
        return Object.keys(missingNamesByType[props.fileTabClickByTheUser]).map(type=>{return<p key={type}>{type}: {missingNamesByType[props.fileTabClickByTheUser][type]}</p>}) 
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
            <Card className="card-missing-value" title="Note: For some entries, gene names are missing. More specifically, here are the number of missing gene names grouped by gene type.">
          {missingNamesByTypeFunction()}
          </Card> 
   <Table tableLayout='column.ellipsis' columns={columns}  dataSource={data} scroll={{ X: 240 }} />
  </div>
  );
}

export default General;
