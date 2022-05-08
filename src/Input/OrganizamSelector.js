import React, { useState, useEffect } from "react";
import { Input, Button, Upload, Select } from "antd";
import "./input.css";
import { UploadOutlined } from "@ant-design/icons";
//import { Card, Col, Row } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { setExistingFilesListFromServer,downloadAccessionNumber, setDoneUploadFile } from "../store/actions/Input/OrganizamSelector";
import { setCurrentPage } from "../store/actions/pagesRoutes";

import AWS from "aws-sdk";
import * as URL from '../store/actions/url'
import axios from 'axios'

function OrganizamSelector(props) {
  const dispatch = useDispatch();
  const { Option } = Select;
  const existingFileListFromServer = useSelector((state) => state.organizamSelector.existingFilesList);

  const [existingFileList, setExistingFileList] = useState([]);
  const [ifOrganizamSelected, setIfOrganizamSelected] = useState(false);
  const [disableNext, setDisableNext] = useState(true);



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
  const optionExistingFiles = () => {
    return existingFileListFromServer.map((file) => {
      return (
        <Option key={file} value={file}>
          {file}
        </Option>
      );
    });
  };

  const onClickNext= () =>{
    props.setDisableTabsHeader({...props.disableTabsHeader ,1:false, 2: false })
    dispatch(setCurrentPage(['2']))
    props.increaseOrDecreaseNumOfPage(2);
    if(props.accessionNumber !== '')
      dispatch(downloadAccessionNumber(props.accessionNumber))

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
          <Option value="Select file">Select file</Option>
          {optionExistingFiles()}
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
          onClick={onClickNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
export default OrganizamSelector;
