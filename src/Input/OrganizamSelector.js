import React, { useState, useEffect } from "react";
import { Input, Button, Upload, Select, Modal, InputNumber, Card, Popconfirm} from "antd";
import "./input.css";
import { UploadOutlined, SendOutlined ,CheckCircleOutlined} from "@ant-design/icons";
//import { Card, Col, Row } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { setExistingFilesListFromServer,downloadAccessionNumber, setDoneUploadFile } from "../store/actions/Input/OrganizamSelector";
import { setCurrentPage } from "../store/actions/pagesRoutes";

import AWS from "aws-sdk";
import * as URL from '../store/actions/url'
import axios from 'axios'
import index from "react-highlight-words";

function OrganizamSelector(props) {
  const dispatch = useDispatch();
  const { Option } = Select;
  const existingFileListFromServer = useSelector((state) => state.organizamSelector.existingFilesList);

  const [existingFileList, setExistingFileList] = useState([]);
  const [ifOrganizamSelected, setIfOrganizamSelected] = useState(false);
  const [disableNext, setDisableNext] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [numberOfComperingOrganism, setNumberOfComperingOrganism] = useState(1);
  const [disableNumberOfComperingOrganism, setDisableNumberOfComperingOrganism] = useState(false);
  const [displayDropDown, setDisplayDropDown] = useState(false);
  // const [listOfCombinedFiles, setListOfCombinedFiles] = useState([]);
  const [disableDropDown, setDisableDropDown] = useState({});
  const [filesNameObj, setFilesNameObj] = useState({});
  const [temp, setTemp] = useState(0);

  // const [cssButtonApprove, setCssButtonApprove] = useState('buttonInModalApprove');




  useEffect(() => {
    dispatch(setExistingFilesListFromServer());
  }, []);

  useEffect(() => {
    if (existingFileListFromServer)
      setExistingFileList({ ...existingFileListFromServer });
  }, [existingFileListFromServer]);

  const removeUploadFileSelected = () => {
    props.saveFileMetaData({});
    setIfOrganizamSelected(false);
  };
  const uploadFileSelected = (e) => {
    if (e.fileList.length) {
      props.saveFileMetaData(e.fileList);
      setIfOrganizamSelected(true);
      dispatch(setDoneUploadFile(true))
    }
  };

  const showModal = () => {
    setTemp(unionFilesForDisplayDropDown().length)
    setIsModalVisible(true);
  };



  const handleCancel = () => {
    // setCssButtonApprove('buttonInModalApprove')
    setNumberOfComperingOrganism(1)
    setDisableNumberOfComperingOrganism(false)
    setDisplayDropDown(false)
    setDisableDropDown({})
    setFilesNameObj({})
    setIsModalVisible(false);
  };

// bucket for upload files
const awsBucket = {
  customRequest({
    action,
    data,
    file,
    filename,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials
  }) {
    AWS.config.update({
      accessKeyId: "AKIARDVFNR2ZY5JRSV7Z",
      secretAccessKey: "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",
      sessionToken: ""
    });
    const S3 = new AWS.S3();
    const objParams = {
      Bucket: "bio-upload-files",
      Key:file.name,
      Body: file,
      ContentType: file.type // TODO: You should set content-type because AWS SDK will not automatically set file MIME
    };

    S3.putObject(objParams)
      .on("httpUploadProgress", function({ loaded, total }) {
        onProgress(
          {
            percent: Math.round((loaded / total) * 100)
          },
          file
        );
      })
      .send(function(err, data) {
        if (err) {
          onError();
          alert("Error Uploading file ,please try again")
          console.log("Something went wrong");
          console.log(err.code);
          console.log(err.message);
        } else {
          onSuccess(data.response, file);
          console.log("SEND FINISHED");
          console.log(data);
          axios.post(URL.POST_UPLOAD_BUCKET_FILE,{
            fileName:file.name
          })
          .then(res => {
           if(res.status  === 200)
           setDisableNext(false)
          }
          )
          .catch(res =>{
            alert("Something went wrong Please try again")
            window.location.reload();// TODO:Change it to like enter first web

          })
        }
      });
  }
};
//POST_UPLOAD_BUCKET_FILE
// END bucket for upload files

  const accessionNumberSelected = (e) => {
    props.saveAccessionNumber(e.target.value);
    if (!e.target.value) setIfOrganizamSelected(false);
    else setIfOrganizamSelected(true);
  };

  const selectOrganizamFromList = (value) => {
    if (value === "Select organizam") setIfOrganizamSelected(false);
    else{
      setIfOrganizamSelected(true);
      props.saveFileFromServer(value)
      setDisableNext(false);
     }

    
  };
  const optionExistingFiles = (list) => {
    return list.map((file) => {
      return (
        <Option key={file} value={file}>
          {file}
        </Option>
      );
    });
  };
  const onClickButtonApproved=(index)=>{
    if(filesNameObj[index].length > 1)
    {
      let name =filesNameObj[index].map(name=>name.split('.gb')[0]).join('_combined_')+'.gb'
      props.setListOfCombinedFiles([...props.listOfCombinedFiles, name])
    }
      else
      {
        console.log("props.listOfCombinedFiles",props.listOfCombinedFiles);
        console.log("filesNameObj[index]][0]",filesNameObj[index][0]);
      props.setListOfCombinedFiles([...props.listOfCombinedFiles,filesNameObj[index][0]])
      }
      setDisableDropDown({...disableDropDown, [index]:true})
      
      
  }

  const numberOfCompering =(value)=>{
    setNumberOfComperingOrganism(value)

  }

  const insertNumberOfDropDown=()=>{
    setDisableNumberOfComperingOrganism(true)
    setDisplayDropDown(true)
  }

  const unionFilesForDisplayDropDown =()=>{
    let accNumberAfterSplit = props.accessionNumber.split(',');
   
   accNumberAfterSplit = accNumberAfterSplit.map(name => name +".gb").filter(name=> name !== '.gb');
   let extractNameFromFileMetaData = props.fileMetaData.map(file =>  file.name)
   let unionFiles = [...extractNameFromFileMetaData, ...accNumberAfterSplit, ...props.fileFromServer].filter(element => element !== '' )
    return unionFiles
  }


  const dynamicDropDown=()=>{
    const arrayFilesToDropDown = unionFilesForDisplayDropDown()
    const arrayNumber =Array.apply(null, {length: numberOfComperingOrganism})
    return arrayNumber.map((number, index)=>{
      return  <Card className="cardDropDown card" title={"Organism " + (index+1)} key={"card"+index+1}><Select 
      key={"select"+index+1}
      disabled={disableDropDown[index+1]}
      mode="multiple"
      className="select-field element"
      onChange={(e) => {
        setFilesNameObj({...filesNameObj, [index+1]:e})
      }}
      placeholder="Select a file"
      >
        {optionExistingFiles(arrayFilesToDropDown)}
      </Select>
      <Button key={index+1}  className="buttonInModalApprove" onClick={()=>onClickButtonApproved(index+1)}>
        Approved <CheckCircleOutlined /></Button>

      </Card>
    })


    
  }

  const onClickNext= (listOfName=null) =>{
    setIsModalVisible(false);
    props.setDisableTabsHeader({...props.disableTabsHeader ,1:false, 2: false })
    dispatch(setCurrentPage(['2']))
    props.increaseOrDecreaseNumOfPage(2);
    if(props.accessionNumber !== '')
      dispatch(downloadAccessionNumber(props.accessionNumber))
    if(!!listOfName)
    {
      console.log("here", listOfName);
      props.setListOfCombinedFiles([listOfName[0]])
    }
  }

  return (
    <div className="center-page">
      <div className="title">Organism Selection</div>
      <h2>Choose one option:</h2>
      <h3>Note: in order to perform comparison between two species, please upload two files</h3>
      <div className="upload-file">
      <h3  className="element" >Upload a file:</h3>
        <Upload {...awsBucket}כ
          accept=".gb"
        //action={URL.POST_UPLOAD_FILE}
          onRemove={() => {
            removeUploadFileSelected();
          }}
          onChange={(e) => uploadFileSelected(e)}>
            <Button className="element" icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </div>
      <div className="input-text">
        <h3 className="element">Enter GenBank accession number (complete genome):</h3>
        <Input 
          className="input-field element-button"
          placeholder="Enter accession number"
          onChange={(e) => {
            accessionNumberSelected(e);
            if(e === '')
               setDisableNext(true)
            else
              setDisableNext(false)
            
          }}
        />
      </div>
      <div className="select-from-list">
        <h3 className="element">Select file from the list</h3>
        <Select 
              mode="multiple"
        className="select-field element"
          onChange={(e) => {
            selectOrganizamFromList(e);
            setDisableNext(false)
            dispatch(setDoneUploadFile(true))
          }}
          placeholder="Select a file"
        >
          {optionExistingFiles(existingFileListFromServer)}
        </Select>
      </div>
      {/* <div className="checkbox-override">
        <Checkbox className="override-spices">
          Override species existing{" "}
        </Checkbox>
        <Checkbox className="override-features">
          Override features existing
        </Checkbox>
      </div> */}
      <div >
        <Button className="next-button"
          disabled={disableNext || !ifOrganizamSelected }
          // onClick={onClickNext}
          onClick={()=>{let listOfName = unionFilesForDisplayDropDown()
           listOfName.length === 1 ?  onClickNext(listOfName): showModal()}}
        >
          Next
        </Button>
      </div>

      <Modal key="modal" width={"90%"} title="Choose your compere files" visible={isModalVisible}  onCancel={handleCancel}
      footer={[<Popconfirm key="pop" title="Are you sure？The chosen will be reset"  okText="No" cancelText="Yes" onCancel={handleCancel}><Button key="cancel" className="buttonInModalCancel" type="ghost">Cancel</Button></Popconfirm>,
      
      <Button key="ok" className="buttonInModalOK"  disabled={Object.keys(disableDropDown).length !== numberOfComperingOrganism} type="ghost" onClick={()=>onClickNext(null)}>OK</Button>
]}>
  
      <p>How many organisms you want to compere? </p>
      <InputNumber key="inputNumber" className="inputNumber" disabled={disableNumberOfComperingOrganism}  value={numberOfComperingOrganism} min={1} max={temp} defaultValue={numberOfComperingOrganism} onChange={numberOfCompering}/>
      <Button key="buttonInsert" className="buttonInModalInsert" onClick={insertNumberOfDropDown}>Insert<SendOutlined /></Button>
      <div key={"div"} className="divOfDynamicDropDown">
      {displayDropDown && dynamicDropDown()}
      </div>
      
      </Modal>
    </div>
  );
}
export default OrganizamSelector;
