import React, { useState, useEffect } from "react";
import { Input, Button, Upload, Select, Checkbox } from "antd";
import "./input.css";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setExistingFilesListFromServer } from "../store/actions/Input/OrganizamSelector";

import * as URL from '../store/actions/url'

function OrganizamSelector(props) {
  const dispatch = useDispatch();
  const { Option } = Select;
  const [existingFileList, setExistingFileList] = useState([]);
  const [ifOrganizamSelected, setIfOrganizamSelected] = useState(false);
  const existingFileListFromServer = useSelector((state) => state.organizamSelector.existingFilesList);

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
    // console.log(e);
    if (e.fileList.length) {
      props.saveFileMetaData(e.fileList);
      setIfOrganizamSelected(true);
    }
  };

  const accessionNumberSelected = (e) => {
    props.saveAccessionNumber(e.target.value);
    if (!e.target.value) setIfOrganizamSelected(false);
    else setIfOrganizamSelected(true);
  };

  const selectOrganizamFromList = (value) => {
    if (value === "Select organizam") setIfOrganizamSelected(false);
    else setIfOrganizamSelected(true);
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

  return (
    <div className="center-page">
      <h1>Organism Selection</h1>
      <h2>Choose one option:</h2>
      <div className="upload-file">
        <Upload
        action={URL.POST_UPLOAD_FILE}
          onRemove={() => {
            removeUploadFileSelected();
          }}
          onChange={(e) => uploadFileSelected(e)}
        >
          <h3>
            Upload a file:
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </h3>
        </Upload>
      </div>
      <div className="input-text">
        <h3>Enter accession number:</h3>
        <Input
          placeholder="Enter accession number"
          onChange={(e) => {
            accessionNumberSelected(e);
          }}
        />
      </div>
      <div className="select-from-list">
        <h3>Select file from the list</h3>
        <Select
          onChange={(e) => {
            selectOrganizamFromList(e);
          }}
          placeholder="Select a file"
        >
          <Option value="Select file">Select file</Option>
          {optionExistingFiles()}
        </Select>
      </div>
      <div className="checkbox-override">
        <Checkbox className="override-spices">
          Override species existing{" "}
        </Checkbox>
        <Checkbox className="override-features">
          Override features existing
        </Checkbox>
      </div>
      <div className="next-button">
        <Button
          disabled={!ifOrganizamSelected}
          onClick={() => {
            props.increaseOrDecreaseNumOfPage(2);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default OrganizamSelector;
