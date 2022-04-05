import React, { useState, useEffect } from "react";
import {  useSelector } from "react-redux";
import Input from './Input/Input'
import Output from './output/output'
import './App.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

function App () {
  const doneUploadFile = useSelector((state) => state.featuresSelection.doneUploadFile)
  const currentPage = useSelector((state) => state.pagesRoutes.currentPage)

  const [numOfPage,setNumOfPage]=useState(1)

  const [displayInput,setDisplayInput]=useState(true)
  const [displayOutput,setDisplayOutput]=useState(false)
  const[fileMetaData, setFileMetaData] = useState([]);
  const[isLoading, setIsLoading] = useState(false);
  const[accessionNumber, setAccessionNumber] = useState('');
  const[fileFromServer, setFileFromServer] = useState('');
  const[tabsHeader, setTabsHeader] = useState(['Organism Selection', 'Feature Selection', 'Data']);
  const[disableTabsHeader, setDisableTabsHeader] = useState({1:false,2:true,3:true});



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

  // const increaseOrDecreaseNumOfPage=(value)=>{
  //   setNumOfPage(value)
  // }

// style={{ backgroundImage: "url(/organism3.jpg)",backgroundPosition: 'center', 
// backgroundSize: 'cover',
// backgroundRepeat: 'no-repeat', }}

  return (

    <Layout className="layout">
     <div className="app" >
     <Header className="header">
      <div className="logo" ></div>
      <Menu theme="dark" className="menuApp" selectedKeys={currentPage} mode="horizontal" defaultSelectedKeys={['1']}>
        {tabsHeader.map((tab, index) => {
          const key = index + 1;
          return <Menu.Item key={key} disabled={disableTabsHeader[key]} onClick={()=>clickOnTab(key)}>{tab}</Menu.Item>;
        })}
      </Menu>
    </Header>
    <Content >

      <Input numOfPage={numOfPage} increaseOrDecreaseNumOfPage={increaseOrDecreaseNumOfPage} setDisableTabsHeader={saveDisableTabsHeader} disableTabsHeader={disableTabsHeader} fileMetaData={fileMetaData} accessionNumber ={accessionNumber} saveAccessionNumber = {saveAccessionNumber} setFileMetaData={setFileMetaData} fileFromServer = {fileFromServer} saveFileFromServer ={saveFileFromServer} displayInput={displayInput} setDisplayInput={setDisplayInput} setDisplayOutput={setDisplayOutput}></Input>
      {isLoading && <Spin tip="Loading" indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} /> }
      {!isLoading && numOfPage === 3 && <Output accessionNumber ={accessionNumber} setIsLoading={setIsLoading} setDisableTabsHeader={saveDisableTabsHeader} disableTabsHeader={disableTabsHeader} filesMetaData={fileMetaData} fileFromServer = {fileFromServer} saveFileFromServer ={saveFileFromServer} displayOutput={displayOutput}></Output>}
      </Content>
      <Footer className= "footer" style={{ textAlign: 'center' }}>Bioinformatics Web ©2022 Created by Adi Leibovich & Dor Iuran</Footer>

    </div>
    </Layout>
  );
}

export default App;
