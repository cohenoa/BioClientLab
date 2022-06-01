import React, { useState, useEffect } from "react";
import {  useSelector } from "react-redux";
import Input from './Input/Input'
import Output from './output/output'
import './App.css';
import { Spin } from 'antd';
import { LoadingOutlined, QuestionCircleOutlined,YoutubeOutlined, InfoCircleOutlined} from '@ant-design/icons';
import { Layout, Menu,Popover, Tag} from 'antd';

const { Header, Content, Footer } = Layout;

function App () {
  useEffect(() => {
    document.title = "Bioinformatics Web"
 }, []);
  const doneUploadFile = useSelector((state) => state.featuresSelection.doneUploadFile)
  const currentPage = useSelector((state) => state.pagesRoutes.currentPage)

  const [numOfPage,setNumOfPage]=useState(1)

  const [displayInput,setDisplayInput]=useState(true)
  const [displayOutput,setDisplayOutput]=useState(false)
  const[fileMetaData, setFileMetaData] = useState([]);
  const[isLoading, setIsLoading] = useState(false);
  const[accessionNumber, setAccessionNumber] = useState('');
  const[fileFromServer, setFileFromServer] = useState('');
  const[tabsHeader, setTabsHeader] = useState(['Organism Selection', 'Feature Selection', 'Analysis']);
  const[disableTabsHeader, setDisableTabsHeader] = useState({1:false,2:true,3:true});
  const [listOfCombinedFiles, setListOfCombinedFiles] = useState([]);


  const saveDisableTabsHeader=(value)=>{
    setDisableTabsHeader(value)
  }
  const increaseOrDecreaseNumOfPage=(value)=>{
    setNumOfPage(value)
  }
  const saveAccessionNumber=(accessionID)=>{
    setAccessionNumber(accessionID)
  }
  const saveFileFromServer=(fileFromServer)=>{
    setFileFromServer(fileFromServer)
  }
  const clickOnTab=(key)=>{
    increaseOrDecreaseNumOfPage(key)
  }
  return (

    <Layout className="layout">
     <div className="app" >
     <Header className="header">

     <Popover
      content={<div> <YoutubeOutlined className="you-tube" style={{fontSize: '50px'}}/><iframe width="420" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe></div>}
      title={<h1>Explanation About The Web</h1>}
      trigger="click"
      // visible={visible}
      // onVisibleChange={handleVisibleChange}
    >
     <QuestionCircleOutlined   className="help" style={{color: "white",  fontSize: '50px'}}/>
     </Popover>

     <Popover
      content={<div> temp</div>}
      title={<h1>About The Editors</h1>}
      trigger="click"
      // visible={visible}
      // onVisibleChange={handleVisibleChange}
    >
     <InfoCircleOutlined   className="about" style={{color: "white",  fontSize: '50px'}}/>
     </Popover>
     
    
      <div className="logo" onClick={() => window.location.reload()}></div>
      {/*<div className="logo" >Bioinformatics Web</div> */}
      <Menu theme="dark" className="menuApp" selectedKeys={currentPage} mode="horizontal" defaultSelectedKeys={['1']}>
        {tabsHeader.map((tab, index) => {
          const key = index + 1;
          return <Menu.Item key={key} disabled={disableTabsHeader[key]} onClick={()=>clickOnTab(key)}>{tab}</Menu.Item>;
        })}
      </Menu>
    </Header>
    <Content >

      <Input listOfCombinedFiles={listOfCombinedFiles}  setListOfCombinedFiles={setListOfCombinedFiles} numOfPage={numOfPage} increaseOrDecreaseNumOfPage={increaseOrDecreaseNumOfPage} setDisableTabsHeader={saveDisableTabsHeader} disableTabsHeader={disableTabsHeader} fileMetaData={fileMetaData} accessionNumber ={accessionNumber} saveAccessionNumber = {saveAccessionNumber} setFileMetaData={setFileMetaData} fileFromServer = {fileFromServer} saveFileFromServer ={saveFileFromServer} displayInput={displayInput} setDisplayInput={setDisplayInput} setDisplayOutput={setDisplayOutput}></Input>
      {isLoading && <Spin tip="Loading" indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} /> }
      {!isLoading && numOfPage === 3 && <Output listOfCombinedFiles={listOfCombinedFiles}  setListOfCombinedFiles={setListOfCombinedFiles} accessionNumber ={accessionNumber} setIsLoading={setIsLoading} setDisableTabsHeader={saveDisableTabsHeader} disableTabsHeader={disableTabsHeader} filesMetaData={fileMetaData} fileFromServer = {fileFromServer} saveFileFromServer ={saveFileFromServer} displayOutput={displayOutput}></Output>}
      </Content>
      <Footer className= "footer" style={{ textAlign: 'center' }}>Bioinformatics Web ©2022 Created by Adi Leibovich & Dor Iuran</Footer>

    </div>
    </Layout>
  );
}

export default App;
